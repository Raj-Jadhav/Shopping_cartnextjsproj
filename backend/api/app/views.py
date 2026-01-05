from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny


# services
from .services import ItemService, AuthService

# service instances
item_service = ItemService()
auth_service = AuthService()


# =======================
# ITEM
# =======================
class ItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            name = request.data.get("name")
            description = request.data.get("description")

            item = item_service.create_item(name, description)

            return Response(
                {
                    "message": "Item created successfully",
                    "item_id": item.id
                },
                status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# =======================
# AUTH
# =======================
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            auth_service.register_user(
                username=request.data.get("username"),
                password=request.data.get("password"),
                email=request.data.get("email"),
            )

            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )



class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            user = auth_service.authenticate_user(
                username=request.data.get("username"),
                password=request.data.get("password"),
            )

            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                }
            }, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )

