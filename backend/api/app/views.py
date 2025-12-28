from django.shortcuts import render
from .services import ItemService
from rest_framework.views import APIView as apiView
from rest_framework.response import Response
# Create your views here.
item_service = ItemService()

class ItemView (apiView):
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