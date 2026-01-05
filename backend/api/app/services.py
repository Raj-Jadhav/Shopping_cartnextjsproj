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
    def register_user(self, username, password, email, avatar=None):
        if not username or not password:
            raise ValidationError("Username and password required")

        if User.objects.filter(username=username).exists():
            raise ValidationError("Username already exists")

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
        )

        if avatar:
            user.profile.avatar = avatar
            user.profile.save()

        return user
            

    def authenticate_user(self, username: str, password: str):
        user = authenticate(username=username, password=password)
        if not user:
            raise ValidationError("Invalid credentials")
        return user
