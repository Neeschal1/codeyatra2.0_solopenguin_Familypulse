from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsAdmin
from ..models import Visit
from ..serializers import VisitSerializer, NurseSerializer, AssignNurseSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema


User = get_user_model()

class AdminVisitListView(generics.ListAPIView):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class AdminAssignNurseView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    @extend_schema(
        request=AssignNurseSerializer,
        responses=VisitSerializer,
        description="Assign a nurse to a visit and update status to ASSIGNED"
    )

    def put(self, request, pk):
        visit = get_object_or_404(Visit, id=pk)
        serializer = AssignNurseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        nurse_id = serializer.validated_data["nurse_id"]
        nurse = get_object_or_404(User, id=nurse_id, role="NURSE")

        # assign nurse and update status
        visit.nurse = nurse
        visit.status = Visit.Status.ASSIGNED
        visit.save()

        response_serializer = VisitSerializer(visit)
        return Response(response_serializer.data, status=status.HTTP_200_OK)

class AdminNurseListView(generics.ListAPIView):
    serializer_class = NurseSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return User.objects.filter(role="NURSE")
