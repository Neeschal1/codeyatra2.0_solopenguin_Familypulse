from rest_framework.response import Response
from ...reports.models.entities import Report
from .prompts import summarize_report_prompt

def ai_response(serializer, user):
    report_id = serializer.validated_data['report_id']

    try:
        report = Report.objects.select_related("visit__dependent", "visit__nurse").get(id=report_id)
    except Report.DoesNotExist:
        return Response({"message": "Report not found."}, status=404)

    # Check permission
    if (
        report.visit.dependent.guardian != user
        and report.visit.nurse != user
        and getattr(user, "role", None) != "ADMIN"
    ):
        return Response({"message": "Not allowed"}, status=403)

    # Build context from report fields
    report_context = f"""
        Bodyweight: {report.body_weight} kg
        Haemoglobin: {report.haemoglobin} gm%
        Platelets: {report.platelets}/cmm
        Blood Pressure: {report.blood_pressure} mm of Hg
        Heartbeat: {report.heartbeat} bpm
        Notes: {report.notes or "No notes"}
    """

    # Generate summary
    summary_text = summarize_report_prompt(report_context)
    
    return Response({"summary": summary_text}, status=200)