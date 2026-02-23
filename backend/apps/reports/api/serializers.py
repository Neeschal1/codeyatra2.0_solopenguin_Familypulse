from rest_framework import serializers
from ..models.entities import Report

class MedicalReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            "id",
            "visit",
            "body_weight",
            "haemoglobin",
            "platelets",
            "blood_pressure",
            "heartbeat",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]