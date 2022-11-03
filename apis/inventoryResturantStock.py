from datetime import date, timedelta

def getStock(collection):
    # callScheduler()
    return collection.find()

def getYesterdayData(collection):
    yesterday = date.today() - timedelta(days=1)
    return collection.find_one({'date':yesterday.isoformat()})

def getLastdayData(collection):
    return collection.find().sort("_id", -1).limit(1)

def createTodayStock(collection):
    # dt = getYesterdayData(collection)
    dat = getLastdayData(collection)
    for dt in dat:
        dt['date'] = date.today().isoformat()
        for pIndex , particulars in enumerate(dt['items']):
            for plIndex, pitem in enumerate(particulars['data']):
                dt['items'][pIndex]['data'][plIndex]['item'] = dt['items'][pIndex]['data'][plIndex]['item']
                dt['items'][pIndex]['data'][plIndex]['available_remaining_stock']= dt['items'][pIndex]['data'][plIndex]['actual_remaining_stock']
                dt['items'][pIndex]['data'][plIndex]['actual_remaining_stock']= 0
                dt['items'][pIndex]['data'][plIndex]['stockEntry']= 0
                # dt['items'][pIndex]['data'][plIndex]['requestQuantity']= 4
                dt['items'][pIndex]['data'][plIndex]['requestQuantity']= dt['items'][pIndex]['data'][plIndex]['requestQuantity'] 
                dt['items'][pIndex]['data'][plIndex]['surplus'] = 0 - int(dt['items'][pIndex]['data'][plIndex]['available_remaining_stock'])
        del dt['_id']
        return collection.insert_one(dt)

# get today stock
def getTodayStock(collection):
    # if there is todays stock return else create one
    ret = collection.find_one({'date':date.today().isoformat()})
    if ret:
        return ret
    else:
        createTodayStock(collection)
        return collection.find_one({'date':date.today().isoformat()})

# update data through out the day
def updateStock(collection, data):
    return collection.update_one(
        { "date": date.today().isoformat()},
        {"$set": data},
        upsert=False,
        )

# delete
def deleteData():pass
def updateOrderInventory(stock, allrecipe, order):
    # print(stock)
    # orders
    fooditems =[]
    for kot in order['kot']:
        for item in kot['items']:
            fooditems.append({'name':item['title'], 'quantity':item['quantity']})
    for items in fooditems:
        for recipe in allrecipe:
            if items['name'] == recipe['itemName']:
                # update stock
                for rcpitem in recipe['ingredient']:
                    for item in stock['items']:
                        for data in item['data']:
                            if data['item'] == rcpitem['item']:
                                data['available_remaining_stock'] =int(data['available_remaining_stock']) - int(rcpitem['quantity']) * int(items['quantity'])
    stock.pop('_id')
    return stock

def checkForMinimumValue(stock):
    storeRequest =[]
    for particulars in stock['items']:
        for it in particulars['data']:
            if it['actual_remaining_stock'] < it['minValue'] or it['available_remaining_stock'] < it['minValue']:
                reqItem ={}
                reqItem['name']= it['item']
                reqItem['quantity'] =it['requestQuantity']
                storeRequest.append(reqItem)
    return storeRequest

def updateBranchStock(collection, outstock):
    stock = getTodayStock(collection)
    # print(stock)
    for outst in outstock:
        brk_flag = False
        for dt in stock['items']:
            for l in dt['data']:
                if l['item']==outst['name']:
                    l['available_remaining_stock'] =int(l['available_remaining_stock'])+ int(outst['out'])
                    brk_flag = True
                    break
            if brk_flag:
                break
    stock.pop('_id')
    updateStock(collection, stock)