from django.urls import path
from .views import *

urlpatterns = [
    path('create/', ReportSerializersView.as_view(), name='ReportSerializersView')
]
