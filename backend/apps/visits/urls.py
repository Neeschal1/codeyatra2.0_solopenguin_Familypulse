# visits/urls.py
from django.urls import path

from .views.guardian import GuardianVisitListCreateView
from .views.nurse import NurseVisitListView, NurseStartVisitView, NurseCompleteVisitView
from .views.admin import AdminVisitListView, AdminAssignNurseView, AdminNurseListView

urlpatterns = [

    path(
        "visits/",
        GuardianVisitListCreateView.as_view(),
        name="guardian-visits"
    ),


    path(
        "nurse/visits/",
        NurseVisitListView.as_view(),
        name="nurse-visits"
    ),

    path(
        "nurse/visits/<uuid:pk>/start/",
        NurseStartVisitView.as_view(),
        name="nurse-start-visit"
    ),
    path(
        "nurse/visits/<uuid:pk>/complete/",
        NurseCompleteVisitView.as_view(),
        name="nurse-complete-visit"
    ),


    path(
        "admin/nurses/",
        AdminNurseListView.as_view(),
        name="admin-nurse-list"
    ),
    path(
        "admin/visits/",
        AdminVisitListView.as_view(),
        name="admin-visits"
    ),

    path(
        "admin/visits/<uuid:pk>/assign/",
        AdminAssignNurseView.as_view(),
        name="admin-assign-nurse"
    ),
]