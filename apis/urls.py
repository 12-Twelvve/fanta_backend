from django.urls import path
from . import views

urlpatterns = [
    path('',views.mainInventoryApi,name='main inventory api'),
    path('durbarmarg_stock',views.durbarmargInventoryApi,name='durbarmarg stock api'),
    path('kumaripati_stock',views.kumaripatiInventoryApi,name='Kumaripati stock api'),
    path('durbarmarg_order',views.durbarmargOrderApi,name='durbarmarg order api'),
    # path('create',views.invCreate,name='main create'),
    ]