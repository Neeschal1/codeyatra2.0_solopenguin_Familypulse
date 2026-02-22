from rest_framework import permissions

class IsGuardian(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'USER'

class IsNurse(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'NURSE'

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN'