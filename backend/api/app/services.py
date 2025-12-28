from .models import Item
class ItemService:
    def createItem(self, request):
        name = request.data.get('name')
        description = request.data.get('description')

        try:
            item = Item.objects.create(name=name, description=description)
            item.save()
            return {'success': True, 'item_id': item.id}
        except Exception as e:
            return {'success': False, 'error': str(e)}