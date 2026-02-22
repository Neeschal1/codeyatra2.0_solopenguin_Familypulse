from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsNurse
from ..models import Visit
from ..serializers import VisitSerializer
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework import status


class NurseVisitListView(generics.ListAPIView):
    serializer_class = VisitSerializer
    permission_classes = [IsAuthenticated, IsNurse]

    def get_queryset(self):
        return Visit.objects.filter(nurse=self.request.user)


class NurseStartVisitView(generics.UpdateAPIView):
    serializer_class = VisitSerializer
    permission_classes = [IsAuthenticated, IsNurse]

    def get_queryset(self):
        # Only filter by nurse for now, ignore status and is_paid
        return Visit.objects.filter(nurse=self.request.user)  # , is_paid=True

    @extend_schema(
        request=None,
        responses=VisitSerializer,
        description="Nurse starts a visit (ignore is_paid/status for testing)"
    )
    def put(self, request, *args, **kwargs):
        visit = self.get_object()
        visit.status = Visit.Status.STARTED
        visit.save()
        serializer = VisitSerializer(visit)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NurseCompleteVisitView(generics.UpdateAPIView):
    serializer_class = VisitSerializer
    permission_classes = [IsAuthenticated, IsNurse]

    @extend_schema(
        request=None,
        responses=VisitSerializer,
        description="Nurse starts a visit (ignore is_paid/status for testing)"
    )
    def get_queryset(self):
        # For testing, ignore is_paid/status
        return Visit.objects.filter(nurse=self.request.user)

    @extend_schema(
        request=None,
        responses=VisitSerializer,
        description="Nurse completes a visit (ignore is_paid/status for testing)"
    )
    def put(self, request, *args, **kwargs):
        visit = self.get_object()
        visit.status = Visit.Status.COMPLETED
        from django.utils import timezone
        visit.completed_at = timezone.now()
        visit.save()
        serializer = VisitSerializer(visit)
        return Response(serializer.data, status=status.HTTP_200_OK)
