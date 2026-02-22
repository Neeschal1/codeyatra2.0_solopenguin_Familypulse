from rest_framework import serializers
from .models import Dependent

class DependentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dependent
        fields = [
            "id",
            "guardian",
            "first_name",
            "last_name",
            "date_of_birth",
            "email",
            "phone",
        ]
        read_only_fields = ["id", "guardian"]