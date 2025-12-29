from django.shortcuts import render
from .services import ItemService
from rest_framework.views import APIView as apiView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# Create your views here.
item_service = ItemService()

class ItemView (apiView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        name = request.data.get('name')
        description = request.data.get('description')
        if not name or not description:
            print("Invalid data received:", request.data)
            return Response({'error': 'Name and description are required.'}, status=400)
        result = item_service.createItem(request)
        print("Service result:", result)

        if result['success']:
            return Response({'message': 'Item created successfully', 'item_id': result['item_id']}, status=201)
        else:
            print("Error creating item:", result['error'])
            return Response({'error': result['error']}, status=400)

class RegisterView(apiView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)

class LoginView(apiView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            })
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)