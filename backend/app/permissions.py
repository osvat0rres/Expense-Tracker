from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        
        return object.user == request.user




class isReviewOwnerOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        # Anyone can view reviews.
        if request.method in SAFE_METHODS:
            return True

        # Only authenticated users can create, update, or delete.
        return bool(
            request.user and request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        # Anyone can view an individual review.
        if request.method in SAFE_METHODS:
            return True

        # Only the owner can edit or delete their review.
        return obj.user_id == request.user.id