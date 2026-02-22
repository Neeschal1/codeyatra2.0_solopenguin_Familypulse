from rest_framework import serializers
from ..models.entities import Payments

class PaymentSerializers(serializers.ModelSerializer):
    username = serializers.EmailField(write_only=True)
    class Meta:
        model = Payments
        fields = '__all__'
        extra_kwargs = {
            'pay_id': {'read_only': True}
        }