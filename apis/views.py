from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymongo
import json
from bson.json_util import dumps, loads, LEGACY_JSON_OPTIONS
from rest_framework import status

# import all the module 
from .mainInventory import *
from .inventoryResturantStock import *
from .branchOrder import *
from .foodrecipe import *
from .dailySells import getTodaySellsData, updateSellsData, getSpecificDateSellsData
from .kitchenKot import getKitchenUnservedKot, getSpecificDateKot, getTodayKot

# mongoDB
# mongodb+srv://root:pass@cluster0.ximcdtp.mongodb.net/?retryWrites=true&w=majority
client = pymongo.MongoClient("mongodb+srv://root:pass@cluster0.ximcdtp.mongodb.net/?retryWrites=true&w=majority")
db = client.sinkadb
dbtest = client.test

mainInventory = db.mainInventory
durbarmargInventory = db.durbarmargInventory
kumaripatiInventory = db.kumaripatiInventory
durbarmargOrder = db.durbarmargOrder
kumaripatiOrder = db.kumaripatiOrder
foodRecipe =  db.itemRecipe
kumaripatiSells = db.kumaripatiSells
durbarmargSells = db.durbarmargSells


# kumaripatiKitchenKot = db.kumaripatiKitchenKot
# durbarmargKitchenKot = db.durbarmargKitchenKot

# coll = dbtest.mss test data
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
        beforeUpdate = getTodayData(mainInventory)
        updateData(mainInventory, data= request.data)
        # --------------------------------------
        # check difference
        k_out, d_out =checkDifferenceStock(beforeUpdate, request.data)
        print(k_out, d_out)
        updateBranchStock(kumaripatiInventory, k_out)
        updateBranchStock(durbarmargInventory, d_out)
        return Response('successfully updated')

# order 
@api_view(['GET', 'POST'])
def durbarmargOrderApi(request):
    if request.method == 'GET':
        date = request.query_params.get('date')
        try:
            d = getSpecificDateOrder(durbarmargOrder, date)
            # print(dumps(d))
            return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        except:
            return Response('error occured')
    # update
    if request.method == 'POST':
        typ = request.query_params.get('type')
        # print(request.data)
        # try:
        if typ =='checkout':
            # update
            updateOrder(durbarmargOrder, data = request.data)
            stock = getTodayStock(durbarmargInventory)
            allrecipe = getFoodRecipe(foodRecipe)
            updatedStockdata = updateOrderInventory(stock, allrecipe, request.data)
            updateStock(durbarmargInventory, data= updatedStockdata)
            # ------
            updateStock(durbarmargInventory, data= updatedStockdata)
            stockUpdated = getTodayStock(durbarmargInventory)
            mainKitchenOrder = checkForMinimumValue(stockUpdated)
            # print(mainKitchenOrder)
            mainStockToday = getTodayData(mainInventory)
            updtStck = updateBranchDurbarmargOrder(mainStockToday, mainKitchenOrder)
            updtStck.pop('_id')
            updateData(mainInventory, updtStck)
        else :
            updateOrder(durbarmargOrder, data = request.data)
        return Response('successfully updated')
        # except: 
        #     return Response('error occured')
@api_view(['GET', 'POST'])
def kumaripatiOrderApi(request):
    if request.method == 'GET':
        date = request.query_params.get('date')
        try:
            d = getSpecificDateOrder(kumaripatiOrder , date)
            # print(dumps(d))
            return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        except:
            return Response('error occured')
    # update
    if request.method == 'POST':
        typ = request.query_params.get('type')
        if typ =='checkout':
            # update
            updateOrder(kumaripatiOrder , data = request.data)
            # update Inventory
            stock = getTodayStock(kumaripatiInventory)
            allrecipe = getFoodRecipe(foodRecipe)
            updatedStockdata = updateOrderInventory(stock, allrecipe, request.data)
            # print(updatedStockdata)
            updateStock(kumaripatiInventory, data= updatedStockdata)
            stockUpdated = getTodayStock(kumaripatiInventory)
            mainKitchenOrder = checkForMinimumValue(stockUpdated)
            # print(mainKitchenOrder)
            mainStockToday = getTodayData(mainInventory)
            updtStck = updateBranchKumaripatiOrder(mainStockToday, mainKitchenOrder)
            updtStck.pop('_id')
            updateData(mainInventory, updtStck)
        else :
            updateOrder(kumaripatiOrder, data = request.data)
        return Response('successfully updated')
        # except: 
        #     return Response('error occured')

# -----??
@api_view(['GET', 'POST'])
def kumaripatiOrderApitest(request):
    if request.method == 'GET':
        date = request.query_params.get('date')
        try:
            d = getSpecificDateOrder(durbarmargOrder, date)
            # print(dumps(d))
            return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        except:
            return Response('error occured')
     # update
    if request.method == 'POST':
        typ = request.query_params.get('type')
        # print(request.data)
        try:
            if typ =='submit':  
                addOrder(kumaripatiOrder , data= request.data)
            else :
                updateOrder(kumaripatiOrder, data = request.data)
            return Response('successfully updated')
        except: 
            return Response('error occured')
    
# stock  api
@api_view(['GET', 'POST'])
def durbarmargInventoryApi(request):
    if request.method == 'GET':
        # try:
        d = getTodayStock(durbarmargInventory)
        # print(dumps(d))
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
        #     return Response('error occured')
    # update
    if request.method == 'POST':
        # print(request.data)
        try:
            updateStock(durbarmargInventory, data= request.data)
            return Response('successfully updated')
        except: 
            return Response('error occured')
@api_view(['GET', 'POST'])
def kumaripatiInventoryApi(request):
    if request.method == 'GET':
        # try:
        d = getTodayStock(kumaripatiInventory)
        # print(dumps(d))
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
            # return Response('error occured')
    # update
    if request.method == 'POST':
        # print(request.data)
        try:
            updateStock(kumaripatiInventory, data= request.data)
            return Response('successfully updated')
        except: 
            return Response('error occured')

# sells 
@api_view(['GET', 'POST'])
def kumaripatiSellsApi(request):
    if request.method == 'GET':
        dt = request.query_params.get('date')
        # try:
        if dt:
            d = getSpecificDateSellsData(kumaripatiSells, dt)
        else:
            d = getTodaySellsData(kumaripatiSells)
        # print(dumps(d))
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
            # return Response('error occured')
    # update
    if request.method == 'POST':
        # print(request.data)
        try:
            updateSellsData(kumaripatiSells, data= request.data)
            return Response('successfully updated')
        except: 
            return Response('error occured')
@api_view(['GET', 'POST'])
def durbarmargSellsApi(request):
    if request.method == 'GET':
        dt = request.query_params.get('date')
        # try:
        if dt:
            d = getSpecificDateSellsData(durbarmargSells, dt)
        else:
            d = getTodaySellsData(durbarmargSells)
        # print(dumps(d))
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
            # return Response('error occured')
    # update
    if request.method == 'POST':
        try:
            updateSellsData(durbarmargSells, data= request.data)
            return Response('successfully updated')
        except: 
            return Response('error occured')

# kot
@api_view(['GET'])
def durbarmargKotApi(request):
    if request.method == 'GET':
        dt = request.query_params.get('date')
        if dt:
            d = getSpecificDateKot(durbarmargOrder, dt)
        # try:
        else:
            d = getTodayKot(durbarmargOrder)
        # print(dumps(d))z  
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
            # return Response('error occured')  
@api_view(['GET'])
def kumaripatiKotApi(request):
    if request.method == 'GET':
        # try:
        dt = request.query_params.get('date')
        if dt:
            d = getSpecificDateKot(kumaripatiOrder, dt)
        else:
            d = getTodayKot(kumaripatiOrder)
        # print(dumps(d))
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
            # return Response('error occured')  

# for kitchen
@api_view(['GET'])
def durbarmargKitchenApi(request):
    if request.method == 'GET':
        # try:
        d = getKitchenUnservedKot(durbarmargOrder)
        # print(dumps(d))
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
            # return Response('error occured')  
@api_view(['GET'])
def kumaripatiKitchenApi(request):
    if request.method == 'GET':
        # try:
        d = getKitchenUnservedKot(kumaripatiOrder)
        # print(dumps(d))
        return Response(json.loads(dumps(d,json_options=LEGACY_JSON_OPTIONS)))
        # except:
            # return Response('error occured')  


