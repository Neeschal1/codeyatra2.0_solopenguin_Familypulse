from django.db import models
from django.conf import settings
from ..dependents.models import Dependent
import uuid

class Visit(models.Model):
    class Status(models.TextChoices):
        SCHEDULED = "SCHEDULED"
        ASSIGNED = "ASSIGNED"
        STARTED = "STARTED"
        COMPLETED = "COMPLETED"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dependent = models.ForeignKey(Dependent, on_delete=models.CASCADE, related_name="visits")
    scheduled_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="scheduled_visits")
    nurse = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_visits")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SCHEDULED)
    scheduled_at = models.DateTimeField()
    completed_at = models.DateTimeField(null=True, blank=True)
    report = models.TextField(blank=True, null=True)  #PDF??
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)