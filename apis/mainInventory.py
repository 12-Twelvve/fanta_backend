from datetime import date, timedelta

def getAllData(collection):
    # callScheduler()
    return collection.find()

def getLastdayData(collection):
    return collection.find().sort("_id",-1).limit(1)

def getYesterdayData(collection):
    yesterday = date.today() - timedelta(days=1)
    return collection.find_one({'date':yesterday.isoformat()})

# called every end of the day 
def createMainInventoryData(collection):
    dt = getYesterdayData(collection)
    if not dt:
        dat = getLastdayData(collection)
        for d in dat:# not able to assign value to cursor data so-- this
            dt = d
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


def getTodayData(collection):
    ret = collection.find_one({'date':date.today().isoformat()})
    if ret:
        return ret
    else:
        createMainInventoryData(collection)
        return collection.find_one({'date':date.today().isoformat()})

    # return data


# update data through out the day
def updateData(collection, data):
    # yesterday = date.today() - timedelta(days=1)
    # can update today's data only
    return collection.update_one(
        { "date": date.today().isoformat()},
        {"$set": data},
        upsert=False
        )

# delete
def deleteData():pass

# updateFromBranchOrder
def updateBranchOrder(stock, order, branch):
    for o in order:
        break_out_flag = False
        for dt in stock['data']:
            for li in dt['plist']:
                if li['pname'] == o['name']:
                    li[branch] = o['quantity']
                    break_out_flag = True 
                    break
            if break_out_flag:
                break
    return stock
# kumaripati
def updateBranchKumaripatiOrder(stock, order):
    return updateBranchOrder(stock, order, 'kumaripati_order')
    # for o in order:
    #     break_out_flag = False
    #     for dt in stock['data']:
    #         for li in dt['plist']:
    #             if li['pname'] == o['name']:
    #                 li['kumaripati_order'] = o['quantity']
    #                 break_out_flag = True 
    #                 break
    #         if break_out_flag:
    #             break
    # return stock
# durbarmarg
def updateBranchDurbarmargOrder(stock, order):
    return updateBranchOrder(stock, order, 'durbarmarg_order')


def checkDifferenceStock(bf, af):
    k_outstock =[]
    d_outstock = []
    # before stock
    for list_ind ,b_list in enumerate(bf['data']):
        for item_ind, b_item in enumerate(b_list['plist']):
            # check for kumaripati
            if b_item['kumaripati_out_stock'] != af['data'][list_ind]['plist'][item_ind]['kumaripati_out_stock']:
                # changed
                diff = int(af['data'][list_ind]['plist'][item_ind]['kumaripati_out_stock'])- int(b_item['kumaripati_out_stock'])
                k_outstock.append({'name':b_item['pname'], 'out':diff})
            # check for durbarmarg
            if b_item['durbarmarg_out_stock'] != af['data'][list_ind]['plist'][item_ind]['durbarmarg_out_stock']:
                # changed
                diff = int(af['data'][list_ind]['plist'][item_ind]['durbarmarg_out_stock']) - int(b_item['durbarmarg_out_stock']) 
                d_outstock.append({'name':b_item['pname'], 'out':diff})
    return k_outstock, d_outstock
# -----------------------------------------------

# from datetime import datetime
# from apscheduler.schedulers.background import BackgroundScheduler

# def callScheduler():
#     print('ok')
#     scheduler = BackgroundScheduler()
#     scheduler.add_job(createMainInventoryData , "cron", month='*', week='*', hour='1', minute='2')
#     # scheduler.add_job(job_function, "cron",month='*',week='*', hour='*' ,minute='*', )
#     scheduler.start()
#     return 