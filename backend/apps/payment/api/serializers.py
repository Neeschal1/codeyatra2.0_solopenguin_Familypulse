from rest_framework import serializers
from ..models.entities import Payments

class PaymentSerializer(serializers.ModelSerializer):
    visit_id = serializers.UUIDField(write_only=True)  # send visit UUID

    class Meta:
        model = Payments
        fields = ['id', 'visit_id', 'paid_to', 'description', 'amount', 'status', 'user']
        read_only_fields = ['id', 'status', 'user']