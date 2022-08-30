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
                dt['items'][pIndex]['data'][plIndex]['surplus'] = 0 - dt['items'][pIndex]['data'][plIndex]['available_remaining_stock']
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
        upsert=False
        )


# delete
def deleteData():pass



