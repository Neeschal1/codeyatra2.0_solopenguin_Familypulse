from django.urls import path
from .views import *

urlpatterns = [
    path('create/', PaymentCreateView.as_view(), name='payment-create'),
]
