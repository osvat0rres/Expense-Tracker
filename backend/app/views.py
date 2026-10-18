from django.shortcuts import get_object_or_404 
from .serializers import ( ExpensesSerializer, 
                          ExpensesReturnSerializer,
                          RegisterSerializer, 
                          ReviewSerializer) 

from app.models import Expenses, Review 
from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from rest_framework import generics, status, viewsets 
from django.db import models 
from rest_framework.permissions import ( IsAdminUser,
                                        AllowAny, 
                                        IsAuthenticated) 
from django.contrib.auth import get_user_model 
from rest_framework.views import APIView 
from rest_framework.decorators import action 
from .permissions import isReviewOwnerOrReadOnly


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({
            "username" : request.user.username,
            "email" : request.user.email
        })


class ExpensesListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpensesSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_superuser:
            return Expenses.objects.select_related("user").all()
        return Expenses.objects.filter(user=user).select_related("user")
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    
      
       
    
    
class ExpensesDeatailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Superuser can access everyone's expenses
        if self.request.user.is_superuser:
            return Expenses.objects.all()

        # Regular users can only access their own expenses
        return Expenses.objects.filter(
            user=self.request.user
            )
    
    
    
class ExpensesTotalView(generics.ListAPIView):
    serializer_class = ExpensesReturnSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Superuser gets all expenses
        if self.request.user.is_superuser:
            return Expenses.objects.all()

        # Regular user gets only their expenses
        return Expenses.objects.filter(
            user=self.request.user
        )
    
    
    def get_total_expenses(self):
        total_expenses = self.get_queryset().aggregate(
            total=models.Sum("spend")
        )["total"]
        
        return total_expenses if total_expenses is not None else 0

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response({
            "total_expenses": self.get_total_expenses(),
            "expense": serializer.data
        })
        
        
class RegisterUserView(generics.CreateAPIView):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [isReviewOwnerOrReadOnly]
    queryset = Review.objects.select_related("user").all()

    def perform_create(self, serializer):
        # Automatically assign the authenticated user.
        rating = serializer.validated_data.get("rating")
        
        if rating is None:
            raise serializer.Validated_data.get({
                "rating" : "A rating is required."
            })
        serializer.save(user=self.request.user)

    @action(
        detail=False,
        methods=["get"],
        url_path="mine",
        permission_classes=[IsAuthenticated],
    )
    def mine(self, request):
        # Only return the review belonging to the logged-in user.
        review = Review.objects.filter(
            user=request.user
        ).first()

        if review is None:
            return Response(
                {"detail": "You have not submitted a review yet."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(review)
        return Response(serializer.data)