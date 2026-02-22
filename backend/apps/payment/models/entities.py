from django.db import models
from ...users.models import User

class Payments(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    pay_id = models.CharField(max_length=100, primary_key=True)
    paid_to = models.CharField(max_length=255)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='paid')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.pay_id
    