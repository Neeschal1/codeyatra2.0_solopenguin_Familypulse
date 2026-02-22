from django.db import models
from django.conf import settings
from ..dependents.models import Dependent
import uuid
from decimal import Decimal


class VisitService:
    VITALS_CHECK = "VITALS_CHECK"
    FULL_BODY_CHECK = "FULL_BODY_CHECK"
    FOLLOW_UP = "FOLLOW_UP"

    CHOICES = [
        (VITALS_CHECK, "Vitals Check"),
        (FULL_BODY_CHECK, "Full Body Check"),
        (FOLLOW_UP, "Follow-up Consultation"),
    ]

SERVICE_PRICING = {
    VisitService.VITALS_CHECK: Decimal("10.00"),
    VisitService.FULL_BODY_CHECK: Decimal("25.00"),
    VisitService.FOLLOW_UP: Decimal("15.00"),
}


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
    # pAyment
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    is_paid = models.BooleanField(default=False)
    # payment = models.OneToOneField('Payment', null=True, blank=True, on_delete=models.SET_NULL)
    service = models.CharField(
        max_length=30,
        choices=VisitService.CHOICES
    )

    def save(self, *args, **kwargs):
        if self.service:
            self.fee = SERVICE_PRICING.get(self.service, Decimal("0.00"))
        super().save(*args, **kwargs)
