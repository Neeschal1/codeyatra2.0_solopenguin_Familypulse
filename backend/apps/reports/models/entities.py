import uuid
from django.db import models
from ...visits.models import Visit

class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    visit = models.OneToOneField(
        Visit,
        on_delete=models.CASCADE,
        related_name="report"
    )

    body_weight = models.DecimalField(max_digits=5, decimal_places=2)
    haemoglobin = models.DecimalField(max_digits=4, decimal_places=1)
    platelets = models.IntegerField()
    blood_pressure = models.CharField(max_length=7)  # e.g. "120/80"
    heartbeat = models.IntegerField()

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for : {self.visit.id}"