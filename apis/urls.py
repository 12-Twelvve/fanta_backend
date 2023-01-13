from django.urls import path
from . import views

urlpatterns = [
    path('',views.mainInventoryApi,name='main inventory api'),
    path('durbarmarg_stock',views.durbarmargInventoryApi,name='durbarmarg stock api'),
    path('kumaripati_stock',views.kumaripatiInventoryApi,name='Kumaripati stock api'),
    path('kumaripati_order',views.kumaripatiOrderApi,name='kumaripati order api'),
    path('durbarmarg_order',views.durbarmargOrderApi,name='durbarmarg order api'),
    path('kumaripati_sells',views.kumaripatiSellsApi,name='kumaripati sells api'),
    path('durbarmarg_sells',views.durbarmargSellsApi,name='durbarmarg sells api'),
    path('durbarmarg_unserved_kot',views.durbarmargKitchenApi,name='durbarmarg unserved kots'),
    path('kumaripati_unserved_kot',views.kumaripatiKitchenApi,name='kumaripati unserved kots'),
    path('durbarmarg_kot',views.durbarmargKotApi,name='durbarmarg specific date kots'),
    path('kumaripati_kot',views.kumaripatiKotApi,name='kumaripati specific date kots'),
    path('add_mainInventoryItem',views.addStoreInventory,name=' addd main store item particulars'),
    # path('create',views.invCreate,name='main create'),
    # menuitem -admin panel 
    path('menu_item_api', views.menuItemsApi, name='menu item admin panel api'),
    path('menu_item_api/<id>', views.menuItemsApi, name='menu item admin panel api'),
    path('item_recipe_api', views.itemsRecipeApi, name='item recipe admin panel api'),
    path('item_recipe_api/<id>', views.itemsRecipeApi, name='item recipe admin panel api'),
    path('main_kitchen_api', views.mainKitchenStockApi, name='stock admin panel api'),
    path('main_kitchen_api/<id>', views.mainKitchenStockApi, name='stock admin panel api'),
    ]