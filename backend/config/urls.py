from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)


urlpatterns = [
<<<<<<< HEAD
    path("admin/", admin.site.urls),
    path("api/users/", include("apps.users.urls")),
    path('payments/', include('apps.payment.api.urls')),
    
    
=======
    path('admin/', admin.site.urls),

    path('api/users/', include('apps.users.urls')),
    path("api/dependents/", include("apps.dependents.urls")),
    path("api/", include("apps.visits.urls")),

>>>>>>> dd670d0dbc3e69014d1ef223315182ab7145325a
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
