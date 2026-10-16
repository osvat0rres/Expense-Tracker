from rest_framework import serializers
from .models import Expenses, User, Review

class ExpensesSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Expenses
        fields = (
            'user',
            'title',
            'category',
            'spend',
            'description',
            'spend_date',
            'created_at'
        )

    def validate_spend(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Spend must be greater than 0."
            )
        return value

    
    
#This serializer is for the total view
class ExpensesReturnSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Expenses
        fields = ("user", "title", "category","spend", "spend_date", "description") 
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username','email',"password")
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        return user 
        

class ReviewSerializer(serializers.ModelSerializer):
    usename = serializers.CharField(
        source="user.username",
        read_only=True
    )
    
    class Meta:
        model =Review
        fields = [
            "id",
            "user",
            "username",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]
        
        read_only_fields =[
            "id",
            "user",
            "username",
            "created_at",
            "updated_at",
        ]
    
    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5"
            )
    
    def validate_comment(self,value):
        value = value.strip()
        
        if not value:
            raise serializers.ValidationError(
                "Please wirite a rivew before submitting."
            )
        
        if len(value) < 50:
            raise serializers.ValidationError(
                "Review most be grater then 50 characters"
            )
        return value.strip()