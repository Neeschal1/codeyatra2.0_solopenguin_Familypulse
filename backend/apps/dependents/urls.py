from django.urls import path
from .views import DependentListCreateView, DependentRetrieveUpdateDestroyView

urlpatterns = [
    path("", DependentListCreateView.as_view(), name="dependents-list-create"),
    path("<uuid:pk>/", DependentRetrieveUpdateDestroyView.as_view(), name="dependent-detail"),
]