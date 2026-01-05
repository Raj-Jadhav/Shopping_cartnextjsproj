from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .models import Item


class ItemService:
    def create_item(self, name: str, description: str):
        if not name or not description:
            raise ValidationError("Name and description are required")

        try:
            item = Item.objects.create(name=name, description=description)
            return item
        except Exception:
            raise ValidationError("Failed to create item")


class AuthService:
    def register_user(self, username: str, password: str, email: str = None):
        if not username or not password:
            raise ValidationError("Username and password are required")

        if User.objects.filter(username=username).exists():
            raise ValidationError("Username already exists")

        try:
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email
            )
            return user
        except Exception:
            raise ValidationError("User registration failed")

    def authenticate_user(self, username: str, password: str):
        user = authenticate(username=username, password=password)
        if not user:
            raise ValidationError("Invalid credentials")
        return user
