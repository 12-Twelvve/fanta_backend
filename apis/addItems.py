from datetime import date, timedelta
from .mainInventory import getLastdayData
from bson.objectid import ObjectId
 
# ############# #############
def getall_Items(collection):
    return collection.find()
# add the new item in the menu 
def addNew_Item(collection, data):
    # dt = {"itemName":"new momo", "itemFamily":"momo", "itemPrice":123}
    return collection.insert_one(data)

def update_Item(collection, data, id):
    return collection.update_one(
        { "_id": ObjectId(id)},
        {"$set": data},
    )
def delete_Item(collection, id):
    return collection.delete_one({"_id":ObjectId(id)})

# /redundance----------->
# get all the menu items
def getallMenuItems(collection):
    return collection.find()
# add the new item in the menu 
def addNewMenuItem(collection, data):
    # dt = {"itemName":"new momo", "itemFamily":"momo", "itemPrice":123}
    return collection.insert_one(data)

def updateMenuItem(collection, data, id):
    return collection.update_one(
        { "_id": ObjectId(id)},
        {"$set": data},
    )
def deleteMenuItem(collection, id):
    return collection.delete_one({"_id":ObjectId(id)})

# ##### Recipe api #########
def getallItemRecipe(collection):
    return collection.find()
# add the new item in the menu 
def addNewItemRecipe(collection, data):
    return collection.insert_one(data)

def updateItemRecipe(collection, data, id):
    return collection.update_one(
        { "_id": ObjectId(id)},
        {"$set": data},
    )
def deleteItemRecipe(collection, id):
    return collection.delete_one({"_id":ObjectId(id)})

# ###### main kitchen stocks #######3333




# #####################################################
def getLastestData(collection):
    return collection.find().sort("_id", -1).limit(1)
# called every end of the day 

# branch data insert once
def addReceipe(collection, data):
    dt = []
    for it in data:
        tempIt = {}
        tempIt['itemName']=it['item']
        tempIt['ingredient']=[]
        for ing in it['ingredient']:
            tempIngitem = {}
            tempIngitem['item']=ing[0]
            tempIngitem['quantity']=ing[1]
            tempIt['ingredient'].append(tempIngitem)
        dt.append(tempIt)
    print(dt)
    # return dt
    return collection.insert_many(dt)

# branch data insert once
def addBranchStock(collection, data):
    dt = {}
    dt['date'] = date.today().isoformat()
    dt['items'] = []
    for items in data:
        tempItem = {}
        tempItem['title']= items['title']
        tempItem['data']= []
        for variable in items['plist']:
            tempVariable = {}
            tempVariable['item'] = variable
            tempVariable['available_remaining_stock']=0
            tempVariable['actual_remaining_stock']= 0
            tempVariable['stockEntry']= 0
            tempVariable['requestQuantity']= 20
            tempVariable['surplus'] = 0
            tempVariable['minValue'] = 10
            tempItem['data'] .append(tempVariable)
        dt['items'].append(tempItem)

    # print(dt)
    # return dt
    return collection.insert_one(dt)


def addStoreElement(collection, data):
    print(data)
    dt={}
    # dt = getLastdayData(collection)
    dt['date'] = date.today().isoformat()
    dt['data'] = []
    # for particulars in data:
    for parti in data:
        tempPart ={}
        tempPart['particulars'] = parti['particulars']
        tempPart['plist'] = []
        for  pitem in parti['plist']:
            tempItem = {}
            tempItem['pname'] =pitem
            tempItem['morning_stock'] = 0
            tempItem['new_in_stock'] = 0
            tempItem['total_in_stock'] = 0
            tempItem['kumaripati_order'] = 0
            tempItem['kumaripati_out_stock'] = 0
            tempItem['durbarmarg_order'] = 0
            tempItem['durbarmarg_out_stock'] = 0
            tempItem['baneshwor_order'] = 0
            tempItem['baneshwor_out_stock'] = 0
            tempItem['central_kitchen_order'] = 0
            tempItem['central_out_stock'] =0
            tempItem['central_return_stock']=0
            tempItem['total_outlet_out_stock'] = 0
            tempItem['total_out_stock']=0
            tempItem['actual_remaining_stock']= 0
            tempItem['available_remaining_stock']= 0
            tempItem['remaining_after_dispatch_order'] = 0
            tempItem['tomorrow_order'] =0
            tempPart['plist'] .append(tempItem)
        dt['data'].append(tempPart)
    # return dt
    return collection.insert_one(dt)

# update data through out the day
def updateStoreData(collection, data):
    # yesterday = date.today() - timedelta(days=1)
    # can update today's data only
    return collection.update_one(
        { "date": date.today().isoformat()},
        {"$set": data},
        upsert=True
        )