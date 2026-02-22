from .serializers import PaymentSerializers
from rest_framework.views import APIView
from env_config import Config
from rest_framework.permissions import IsAuthenticated, AllowAny
from ..models.entities import Payments
import uuid
from rest_framework.response import Response
import os
from ...users.models import User
import stripe

# stripe.api_key = Config.STRIPE_SECRET_KEY
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

class PaymentSerializersView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        paid = PaymentSerializers(data=request.data)
        paid.is_valid(raise_exception=True)

        email = paid.validated_data["username"]
        Name = paid.validated_data["paid_to"]
        Description = paid.validated_data["description"]
        Amount = paid.validated_data["amount"]
        
        try:
            lineitem = [
                {
                    "quantity": 1,
                    "price_data": {
                        "currency": "usd",
                        "unit_amount": int(Amount * 100),
                        "product_data": {
                            "name": Name,
                            "description": Description
                        },
                    },
                }
            ]
            checkout_session = stripe.checkout.Session.create(
                line_items=lineitem,
                mode='payment',
                success_url="https://www.pinterest.com/pin/316729786314156192/",
                cancel_url="https://www.pinterest.com/pin/1125968651884142/"
            )
        except Exception as e:
            return Response({"Message":"Exception Occured!", "Issue":str(e)})
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=400)

        
        Payments.objects.create(
            username=user,
            pay_id=str(uuid.uuid4()),
            paid_to=Name,
            description=Description,
            amount=Amount,
            status="Succeed"
        )

        return Response({"Message":"Payment Created.", "Buyer's Detail": {
            "Username": str(user.id),
            "Description": Description,
            "Amount": Amount,
            }, "URL":checkout_session.url})