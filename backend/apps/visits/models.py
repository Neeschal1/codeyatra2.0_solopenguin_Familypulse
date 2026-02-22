from django.db import models
from django.conf import settings
from ..dependents.models import Dependent
import uuid
from decimal import Decimal


class ServiceType(models.Model):
    name = models.CharField(max_length=100)
    fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} (${self.fee})"


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
    service = models.ForeignKey(ServiceType, on_delete=models.SET_NULL, null=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    report = models.TextField(blank=True, null=True)  #PDF??
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # pAyment
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    is_paid = models.BooleanField(default=False)
    # payment = models.OneToOneField('Payment', null=True, blank=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        # automatically assign fee from service type
        if self.service and not self.fee:
            self.fee = self.service.fee
        super().save(*args, **kwargs)