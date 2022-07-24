from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymongo
import json
from bson.json_util import dumps, loads, LEGACY_JSON_OPTIONS

# import all the module 
from .mainInventory import *

# mongoDB
client = pymongo.MongoClient("mongodb+srv://root:pass@cluster0.ximcdtp.mongodb.net/?retryWrites=true&w=majority")
db = client.sinkadb
dbtest = client.test

mainInventory = db.mainInventory
# coll = dbtest.mss
mData={
    "date":"2022/12/03",
    "data" :[
    {
        "particulars":'sauce',
        "plist":[
            {
                "pname":"momo achar",
                "morning_stock":10,#from tomorrow_order
                "new_in_stock":4,#manual
                "total_in_stock":14,#m+n^
                "kumaripati_order":1, #from kumaripati_inventory
                "kumaripati_out_stock":1, #order item_left manual
                "durbarmarg_order":2,
                "durbarmarg_out_stock":2,
                "baneshwor_order":1,
                "baneshwor_out_stock":1,
                "total_outlet_out_stock":3,#k_out + d_out +b_out 
                "central_out_stock":400,#------  outstock from kitchen 
                "central_return_stock":2, #manual return
                "total_out_stock":4, #kitchen central_outstock + total_outlet_outstock
                "actual_remaining_stock":10, #total_in_stock + central_return_stock - total_out_stock
                "available_remaining_stock":2,#??????
                "surplus":2,#available_remaining_stock - actual_remaining_stock
                "remaining_after_dispatch_order":4, #total_in_stock - all the order + central_return_stock
                "tomorrow_order":10,# remaining_after_dispatch_order
            },
            {
                "pname":"kima achar",
                "morning_stock":10,#from tomorrow_order
                "new_in_stock":4,#manual
                "total_in_stock":14,#m+n^
                "kumaripati_order":1, #from kumaripati_inventory
                "kumaripati_out_stock":1, #order item_left manual
                "durbarmarg_order":2,
                "durbarmarg_out_stock":2,
                "baneshwor_order":1,
                "baneshwor_out_stock":1,
                "total_outlet_out_stock":3,#k_out + d_out +b_out 
                "central_out_stock":400,#------  outstock from kitchen 
                "central_return_stock":2, #manual return
                "total_out_stock":4, #kitchen central_outstock + total_outlet_outstock
                "actual_remaining_stock":10, #total_in_stock + central_return_stock - total_out_stock
                "available_remaining_stock":2,#??????
                "surplus":2,#available_remaining_stock - actual_remaining_stock
                "remaining_after_dispatch_order":4, #total_in_stock - all the order + central_return_stock
                "tomorrow_order":10,# remaining_after_dispatch_order
            },
        ]
    },
    ]
    }

@api_view(['GET', 'POST'])
def mainInventoryApi(request):
    if request.method == 'GET':
        try:
            d = getAllData(mainInventory)
            json_data = dumps(list(d),json_options=LEGACY_JSON_OPTIONS) 
        except:
            return Response('error occured')
        return Response(json.loads(json_data))
    # update
    if request.method == 'POST':
        # print(request.data)
        updateData(mainInventory, data= request.data)
        # try:
        # except: 
            # return Response('error occured')
        return Response('successfully updated')
        
