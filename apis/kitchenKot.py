from datetime import date, timedelta

def getAllKot(collection):
    return collection.find()

# server unserved
def getSpecificDateKot(collection, dt):
    return collection.find({'date':dt})

# all data
def getTodayKot(collection):
    # createMainInventoryData()
    # find_one and return 
    return collection.find({'date':date.today().isoformat()})

def getKitchenUnservedKot(collection):
    ret = collection.find({"$and":[
            {'date':date.today().isoformat()},
            { 'total': { "$exists": False}},
            ]})
    return ret