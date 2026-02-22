from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSignupSerializer

class SignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "id": str(user.id),
            "email": user.email,
            "role": user.role
        }, status=status.HTTP_201_CREATED)



