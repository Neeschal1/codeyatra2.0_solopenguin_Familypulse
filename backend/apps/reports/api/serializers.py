from ..models.entities import Report
from rest_framework import serializers

class ReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'
        # extra_kwargs = 