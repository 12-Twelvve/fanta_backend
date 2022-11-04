from datetime import date, timedelta

def getAllSellsData(collection):
    return collection.find()

# update data through out the day
def addSells(collection, data):
    return collection.insert_one(data)

def getSpecificDateSellsData(collection, dt):
    return collection.find_one({'date':dt})

def getLastestData(collection):
    return collection.find().sort("_id", -1).limit(1)

def createTodaySells(collection):
    
    sells=['foodmandu','bhojdeals','patho','foodole','foodBusters', 'tatomitho','POSmachine', "fonepay","esewa", "cashout","foodcredit","gasIn","pepsiIn","cashsales","waterjarIn","foodganj" ]
    dt={'date':date.today().isoformat(), 'sells':{}}
    dt['sells']['cashIn']=''
    for s in sells:
        dt['sells'][s] =[]
    return collection.insert_one(dt)

def getTodaySellsData(collection):
    # createMainInventoryData()
    # find_one and return 
    one_ =  collection.find_one({'date':date.today().isoformat()})
    if not one_:
        createTodaySells(collection)
        one_ =  collection.find_one({'date':date.today().isoformat()})
    return one_
    


# update data through out the day
def updateSellsData(collection, data):
    # yesterday = date.today() - timedelta(days=1)
    # can update today's data only
    return collection.update_one(
        { "date": date.today().isoformat()},
        {"$set": data},
        upsert=True
        )