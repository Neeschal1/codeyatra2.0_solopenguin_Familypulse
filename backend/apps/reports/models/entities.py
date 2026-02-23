from django.db import models
from ...users.models import User
import uuid

class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bodyweight  = models.CharField(max_length=10, default="50", blank=False)
    haemoglobin = models.CharField(max_length=10, default='8.7', blank=False)
    platelets = models.CharField(max_length=10, default='96000', blank=False)
    blood_pressure = models.CharField(max_length=10, default='90', blank=False)
    heartbeat = models.CharField(max_length=10, default='90', blank=False)
    
    def __str__(self):
        return f"{self.user}"