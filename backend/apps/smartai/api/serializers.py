from rest_framework import serializers

class SmartAISerializers(serializers.Serializer):
    report_id = serializers.UUIDField(required=True,
        help_text="The UUID of the medical report to summarize")
    # question = serializers.CharField()