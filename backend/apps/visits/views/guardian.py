from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsGuardian
from ..models import Visit
from ..serializers import VisitSerializer

class GuardianVisitListCreateView(generics.ListCreateAPIView):
    serializer_class = VisitSerializer
    permission_classes = [IsAuthenticated, IsGuardian]

    def get_queryset(self):
        return Visit.objects.filter(scheduled_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(scheduled_by=self.request.user)