from rest_framework import generics, permissions
from .models import Dependent
from .serializers import DependentSerializer

class IsGuardianOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.guardian == request.user

class DependentListCreateView(generics.ListCreateAPIView):
    serializer_class = DependentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Dependent.objects.filter(guardian=self.request.user)

    def perform_create(self, serializer):
        serializer.save(guardian=self.request.user)

class DependentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DependentSerializer
    permission_classes = [permissions.IsAuthenticated, IsGuardianOwner]
    queryset = Dependent.objects.all()