# visits/serializers.py
from rest_framework import serializers
from .models import Visit, VisitService
from django.contrib.auth import get_user_model


User = get_user_model()


class VisitSerializer(serializers.ModelSerializer):

    service = serializers.ChoiceField(choices=VisitService.CHOICES)

    class Meta:
        model = Visit
        fields = [
            "id",
            "dependent",
            "service",
            "scheduled_at",
            "status",
            "fee",
            "is_paid",
            "nurse",
        ]
        read_only_fields = [
            "fee",
            "status",
            "is_paid",
            "nurse",
        ]

    def create(self, validated_data):
        validated_data["scheduled_by"] = self.context["request"].user
        return super().create(validated_data)


class NurseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "is_active",
        ]


class AssignNurseSerializer(serializers.Serializer):
    nurse_id = serializers.UUIDField()

    def validate_nurse_id(self, value):
        try:
            nurse = User.objects.get(id=value, role="NURSE")
        except User.DoesNotExist:
            raise serializers.ValidationError("Nurse not found")
        return value




# class PaymentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Payment
#         fields = ['id', 'amount', 'status', 'created_at']

