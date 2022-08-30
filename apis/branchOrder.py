# from datetime import date, timedelta

def getAllBranchData(collection):
    # callScheduler()
    return collection.find()

def getSpecificDateOrder(collection, date):
    return collection.find( { "date": date } )

# update data through out the day
def addOrder(collection, data):
    return collection.insert_one(data)
    
def updateOrder(collection, data):
    # print(data['orderId'])
    return collection.update_one(
        {
            "orderId":data['orderId']
        },
        {
            "$set":data
        },
        upsert =True
        )