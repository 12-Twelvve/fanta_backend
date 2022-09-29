from datetime import date, timedelta

def getAllSellsData(collection):
    return collection.find()

# update data through out the day
def addSells(collection, data):
    return collection.insert_one(data)

def getSpecificDateSellsData(collection, dt):
    return collection.find_one({'date':dt})


def getTodaySellsData(collection):
    # createMainInventoryData()
    # find_one and return 
    return collection.find_one({'date':date.today().isoformat()})


# update data through out the day
def updateSellsData(collection, data):
    # yesterday = date.today() - timedelta(days=1)
    # can update today's data only
    return collection.update_one(
        { "date": date.today().isoformat()},
        {"$set": data},
        upsert=True
        )