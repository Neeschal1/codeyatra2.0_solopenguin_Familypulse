from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from ..models.entities import Report
from .serializers import MedicalReportSerializer
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.exceptions import PermissionDenied


class IsAssignedNurseOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        # Only the nurse assigned to the visit can edit
        return obj.visit.nurse == request.user


class MedicalReportViewSet(ModelViewSet):
    serializer_class = MedicalReportSerializer
    permission_classes = [IsAuthenticated, IsAssignedNurseOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return Report.objects.none()

        if getattr(user, "role", None) == 'ADMIN':
            # Admins see all reports
            return Report.objects.all()

        # Nurses → reports for visits they are assigned to
        nurse_qs = Report.objects.filter(visit__nurse=user)

        # Guardians → reports for their dependents
        dependent_qs = Report.objects.filter(visit__dependent__guardian=user)

        # Combine both querysets and remove duplicates
        return (nurse_qs | dependent_qs).distinct()

    def perform_create(self, serializer):
        visit = serializer.validated_data["visit"]

        if visit.nurse != self.request.user:
            raise PermissionDenied("You are not assigned to this visit.")

        serializer.save()