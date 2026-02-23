from rest_framework import serializers

class SmartAISerializers(serializers.Serializer):
    report_id = serializers.UUIDField(
        required=True,
        help_text="The ID of the medical report to summarize"
    )






# from django.db import models
# from ...visits.models import Visit
# import uuid
#
# class SmartAI(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     visit = models.ForeignKey(Visit, on_delete=models.CASCADE)
#     ai_response = models.TextField()
#
#     def str(self):
#         return f"{self.visit}"