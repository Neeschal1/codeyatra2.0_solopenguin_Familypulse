from django.shortcuts import render
from rest_framework import generics
from ..models.entities import Report
from .serializers import *

class ReportSerializersView(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializers