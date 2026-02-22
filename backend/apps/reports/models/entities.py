from django.db import models
from ...users.models import User

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.CharField(max_length=10)
    date_time = models.DateTimeField(auto_now_add=True)