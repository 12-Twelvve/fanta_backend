from django.urls import path
from . import views

urlpatterns = [
    path('',views.mainInventoryApi,name='main inventory api'),
    # path('create',views.invCreate,name='main create'),
    ]