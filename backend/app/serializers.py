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
    username = serializers.CharField( source="user.username", read_only=True )
    
    class Meta: 
        model = Review 
        fields = [ 
                  "id",
                  "user", 
                  "username", 
                  "rating",
                  "comment",
                  "created_at", 
                  ]
        
        read_only_fields = [ 
                            "id", 
                            "user", 
                            "username", 
                            "created_at", ]
        
        def validate_rating(self, value): 
            if not 1 <= value <= 5: 
                raise serializers.ValidationError( 
                        "Rating must be between 1 and 5." 
                                    )
            return value
        
        def validate_comment(self, value): 
            value = value.strip() 
            if not value: 
                raise serializers.ValidationError( "Please write a review before submitting." )
            
            if len(value) < 10: 
                raise serializers.ValidationError( "Your review must contain at least 10 characters." ) 
            return value
            
            