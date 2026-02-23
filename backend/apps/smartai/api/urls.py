from django.urls import path
from .views import *

urlpatterns = [
    path('create/', SmartAISerializersView.as_view(), name='ai-create')
]