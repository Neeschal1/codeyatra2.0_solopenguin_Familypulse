from rest_framework.routers import DefaultRouter
from .views import MedicalReportViewSet

router = DefaultRouter()
router.register("reports", MedicalReportViewSet, basename="reports")

urlpatterns = router.urls