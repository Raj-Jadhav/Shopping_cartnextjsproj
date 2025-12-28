from django.urls import include, path
from django.contrib import admin
from app.views import ItemView
urlpatterns = [
    path('admin/', admin.site.urls),    
    path('add/items/', ItemView.as_view(), name='add_item'),

    ]
