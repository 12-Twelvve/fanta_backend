from django.urls import path
from . import views

urlpatterns = [
    path('',views.mainInventoryApi,name='main inventory api'),
    path('durbarmarg_stock',views.durbarmargInventoryApi,name='durbarmarg stock api'),
    path('kumaripati_stock',views.kumaripatiInventoryApi,name='Kumaripati stock api'),
    path('durbarmarg_order',views.durbarmargOrderApi,name='durbarmarg order api'),
    path('kumaripati_order',views.kumaripatiOrderApi,name='kumaripati order api'),
    path('kumaripati_sells',views.kumaripatiSellsApi,name='kumaripati sells api'),
    path('durbarmarg_sells',views.durbarmargSellsApi,name='durbarmarg sells api'),
    # path('create',views.invCreate,name='main create'),
    ]