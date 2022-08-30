from datetime import date, timedelta

def getAllData(collection):
    # callScheduler()
    return collection.find()

def getYesterdayData(collection):
    yesterday = date.today() - timedelta(days=1)
    return collection.find_one({'date':yesterday.isoformat()})

def getTodayData(collection):
    # if (!):
    # createMainInventoryData()
    # find_one and return 
    return collection.find_one({'date':date.today().isoformat()})


# update data through out the day
def updateData(collection, data):
    # yesterday = date.today() - timedelta(days=1)
    # can update today's data only
    return collection.update_one(
        { "date": date.today().isoformat()},
        {"$set": data},
        upsert=False
        )

# called every end of the day 
def createMainInventoryData(collection):
    dt = getYesterdayData(collection)
    dt['date'] = date.today().isoformat()
    for pIndex , particulars in enumerate(dt['data']):
        for plIndex, pitem in enumerate(particulars['plist']):
            dt['data'][pIndex]['plist'][plIndex]['pname'] = dt['data'][pIndex]['plist'][plIndex]['pname']
            dt['data'][pIndex]['plist'][plIndex]['morning_stock'] = dt['data'][pIndex]['plist'][plIndex]['actual_remaining_stock']
            dt['data'][pIndex]['plist'][plIndex]['new_in_stock'] = 0
            dt['data'][pIndex]['plist'][plIndex]['total_in_stock'] = dt['data'][pIndex]['plist'][plIndex]['morning_stock'] + dt['data'][pIndex]['plist'][plIndex]['new_in_stock']
            # if the stock is not out yet we have to add 
            dt['data'][pIndex]['plist'][plIndex]['kumaripati_order'] = dt['data'][pIndex]['plist'][plIndex]['kumaripati_order'] - dt['data'][pIndex]['plist'][plIndex]['kumaripati_out_stock']
            dt['data'][pIndex]['plist'][plIndex]['kumaripati_out_stock'] = 0
            dt['data'][pIndex]['plist'][plIndex]['durbarmarg_order'] = dt['data'][pIndex]['plist'][plIndex]['durbarmarg_order'] - dt['data'][pIndex]['plist'][plIndex]['durbarmarg_out_stock']
            dt['data'][pIndex]['plist'][plIndex]['durbarmarg_out_stock'] = 0
            dt['data'][pIndex]['plist'][plIndex]['baneshwor_order'] = dt['data'][pIndex]['plist'][plIndex]['baneshwor_order'] - dt['data'][pIndex]['plist'][plIndex]['baneshwor_out_stock'] 
            dt['data'][pIndex]['plist'][plIndex]['baneshwor_out_stock'] = 0
            dt['data'][pIndex]['plist'][plIndex]['central_kitchen_order'] = dt['data'][pIndex]['plist'][plIndex]['central_kitchen_order'] - dt['data'][pIndex]['plist'][plIndex]['central_out_stock'] 
            dt['data'][pIndex]['plist'][plIndex]['central_out_stock'] =0
            dt['data'][pIndex]['plist'][plIndex]['central_return_stock']=0
            dt['data'][pIndex]['plist'][plIndex]['total_outlet_out_stock'] = 0
            dt['data'][pIndex]['plist'][plIndex]['total_out_stock']=0
            dt['data'][pIndex]['plist'][plIndex]['actual_remaining_stock']= 0
            dt['data'][pIndex]['plist'][plIndex]['available_remaining_stock']= dt['data'][pIndex]['plist'][plIndex]['total_in_stock']
            dt['data'][pIndex]['plist'][plIndex]['surplus'] = dt['data'][pIndex]['plist'][plIndex]['available_remaining_stock'] - dt['data'][pIndex]['plist'][plIndex]['actual_remaining_stock']
            dt['data'][pIndex]['plist'][plIndex]['remaining_after_dispatch_order'] = dt['data'][pIndex]['plist'][plIndex]['total_in_stock'] - dt['data'][pIndex]['plist'][plIndex]['kumaripati_order'] - dt['data'][pIndex]['plist'][plIndex]['durbarmarg_order'] -dt['data'][pIndex]['plist'][plIndex]['baneshwor_order'] -dt['data'][pIndex]['plist'][plIndex]['central_kitchen_order']
            dt['data'][pIndex]['plist'][plIndex]['tomorrow_order'] = dt['data'][pIndex]['plist'][plIndex]['remaining_after_dispatch_order']
    del dt['_id']
    return collection.insert_one(dt)
# delete
def deleteData():pass

def job_function():
    print("Worldooo")

# -----------------------------------------------

from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler

def callScheduler():
    print('ok')
    scheduler = BackgroundScheduler()
    scheduler.add_job(createMainInventoryData , "cron", month='*', week='*', hour='1', minute='2')
    # scheduler.add_job(job_function, "cron",month='*',week='*', hour='*' ,minute='*', )
    scheduler.start()
    return 