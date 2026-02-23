from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import SmartAISerializers
from ..services.response import ai_response

class SmartAISerializersView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=SmartAISerializers,
        responses={
            200: OpenApiResponse(description="AI-generated summary of the report"),
            403: OpenApiResponse(description="Not allowed to view this report"),
            404: OpenApiResponse(description="Report not found"),
            400: OpenApiResponse(description="Invalid input (missing or bad report_id)"),
        },
        description="Generates a patient-friendly summary for a medical report given its ID",
        tags=["AI"]
    )
    def post(self, request):
        serializer = SmartAISerializers(data=request.data)
        serializer.is_valid(raise_exception=True)

        return ai_response(serializer, request.user)