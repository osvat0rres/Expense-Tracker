
from django.urls import path
from . import views

urlpatterns = [
    path('expenses/', views.ExpensesListCreateView.as_view()),
    path('total/', views.ExpensesTotalView.as_view()),
    path('update/delete/<int:pk>/', views.ExpensesDeatailView.as_view()),
    path('register/',views.RegisterUserView.as_view()),
    path("user/", views.CurrentUserView.as_view()),
]
