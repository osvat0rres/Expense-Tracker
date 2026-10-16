
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

# Register the ReviewViewSet with the router
router.register("reviews", views.ReviewViewSet, basename="reviews")

urlpatterns = [
    path("expenses/", views.ExpensesListCreateView.as_view()),
    path("total/", views.ExpensesTotalView.as_view()),
    path("update/delete/<int:pk>/", views.ExpensesDeatailView.as_view()),
    path("register/", views.RegisterUserView.as_view()),
    path("user/", views.CurrentUserView.as_view()),
    path("review/", include(router.urls)),
]