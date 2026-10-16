from django.db import models   
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    pass


class Expenses(models.Model):
    category_choices =[
        ("bills", "Bills"),
        ("entertainment", "Entertainment"),
        ("gas", "Gas"),
        ("rent","Rent"),
        ("utilities", "Utilities"),
        ("credit card", "Credit Card"),
        ("other", "Other")
    ]
  
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length = 100)
    category = models.CharField(max_length=30, choices=category_choices)
    spend = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=500)
    spend_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add = True)
    

    
    def __str__(self):
        return f"Expense: {self.user}: {self.title} ${self.spend}"
    

class Review(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="expense_tracker_review"
    )
    
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering =["-created_at"]
    
    def __str__(self):
        return f"{self.user.username} - {self.rating}/5"

