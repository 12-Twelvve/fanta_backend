from datetime import date, timedelta

def getAllKot(collection):
    return collection.find()

# server unserved
def getSpecificDateKot(collection, dt):
    return collection.find_one({'date':dt})

# all data
def getTodayKot(collection):
    # createMainInventoryData()
    # find_one and return 
    return collection.find_one({'date':date.today().isoformat()})

def getKitchenUnservedKot(collection):
    pass
