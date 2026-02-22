from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PaymentSerializer
from ..models.entities import Payments
from ...visits.models import Visit
import stripe, os, uuid
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_spectacular.utils import extend_schema

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')



class PaymentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=PaymentSerializer,
        responses={
            200: {
                "type": "object",
                "properties": {
                    "payment_id": {"type": "string"},
                    "checkout_url": {"type": "string", "format": "uri"}
                }
            }
        },
        description="Create a payment for a visit and get Stripe checkout URL"
    )
    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        visit_id = serializer.validated_data["visit_id"]
        paid_to = serializer.validated_data["paid_to"]
        description = serializer.validated_data["description"]
        amount = serializer.validated_data["amount"]

        try:
            visit = Visit.objects.get(id=visit_id)
        except Visit.DoesNotExist:
            return Response({"error": "Visit not found"}, status=404)

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': int(amount * 100),
                        'product_data': {
                            'name': paid_to,
                            'description': description,
                        },
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url="https://example.com/success",
                cancel_url="https://example.com/cancel",
                metadata={'payment_id': str(uuid.uuid4())}
            )
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        # Create Payment record and mark visit as paid immediately
        payment = Payments.objects.create(
            user=request.user,
            visit=visit,
            paid_to=paid_to,
            description=description,
            amount=amount,
            status='succeeded',
        )

        Visit.objects.filter(id=visit.id).update(is_paid=True)

        visit.refresh_from_db()

        return Response({
            "payment_id": str(payment.id),
            "visit_id": str(visit.id),
            "is_paid": visit.is_paid,
            "checkout_url": checkout_session.url
        }, status=status.HTTP_201_CREATED)