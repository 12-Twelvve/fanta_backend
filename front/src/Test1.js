// value setter----------------------------  
{

const new_in_stockValueSetter=(params)=>{
    let new_in_stock = Number(params.value.toString());
    const total_in_stock = total_in_stockValueGetter({...params.row ,new_in_stock})  
      const actual_remaining_stock = actual_remaining_stockValueGetter({...params.row, total_in_stock})
        const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
      const remaining_after_dispatch_order = remaining_after_dispatch_orderValueGetter({...params.row, total_in_stock})
        const tomorrow_order = tomorrow_orderValueGetter({...params.row, remaining_after_dispatch_order})
    console.log({...params.row, new_in_stock, total_in_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order})
    
    setNewRows({...params.row, new_in_stock, total_in_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order})
    return {...params.row, new_in_stock, total_in_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order}
  }
  const durbarmarg_out_stockValueSetter =(params)=>{
    let durbarmarg_out_stock = Number(params.value.toString());
    const total_outlet_out_stock = total_outlet_out_stockValueGetter({...params.row, durbarmarg_out_stock})
      const total_out_stock = total_out_stockValueGetter({...params.row, total_outlet_out_stock})
        const actual_remaining_stock = actual_remaining_stockValueGetter({...params.row, total_out_stock})
          const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    setNewRows({...params.row, durbarmarg_out_stock, total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus})
    return {...params.row, durbarmarg_out_stock, total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus}
  }
  const kumaripati_out_stockValueSetter =(params)=>{
    let kumaripati_out_stock = Number(params.value.toString());
    const total_outlet_out_stock = total_outlet_out_stockValueGetter({...params.row, kumaripati_out_stock})
      const total_out_stock = total_out_stockValueGetter({...params.row, total_outlet_out_stock})
        const actual_remaining_stock = actual_remaining_stockValueGetter({...params.row, total_out_stock})
          const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    setNewRows({...params.row, kumaripati_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus})
    return {...params.row, kumaripati_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus}
  }
  const baneshwor_out_stockValueSetter = (params)=>{
    let baneshwor_out_stock= Number(params.value.toString());
    const total_outlet_out_stock = total_outlet_out_stockValueGetter({...params.row, baneshwor_out_stock})
    const total_out_stock = total_out_stockValueGetter({...params.row, total_outlet_out_stock})
      const actual_remaining_stock = actual_remaining_stockValueGetter({...params.row, total_out_stock})
        const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    setNewRows({...params.row, baneshwor_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus})
    return {...params.row, baneshwor_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus}
}
  const central_out_stockValueSetter =(params)=>{
    let central_out_stock = Number(params.value.toString());
    const total_out_stock = total_out_stockValueGetter({...params.row, central_out_stock})
      const actual_remaining_stock = actual_remaining_stockValueGetter({...params.row, total_out_stock})
        const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    const remaining_after_dispatch_order = remaining_after_dispatch_orderValueGetter({...params.row, central_out_stock})
      const tomorrow_order = tomorrow_orderValueGetter({...params.row, remaining_after_dispatch_order})
    setNewRows({...params.row, central_out_stock, total_out_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order})
    return {...params.row, central_out_stock, total_out_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order}
  }
  const central_return_stockValueSetter =(params)=>{
    let central_return_stock= Number(params.value.toString());
    const actual_remaining_stock = actual_remaining_stockValueGetter({...params.row, central_return_stock})
      const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    const remaining_after_dispatch_order = remaining_after_dispatch_orderValueGetter({...params.row, central_return_stock})
      const tomorrow_order = tomorrow_orderValueGetter({...params.row, remaining_after_dispatch_order})
    setNewRows({...params.row, central_return_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order})
    return {...params.row, central_return_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order}
  }
  const available_ramaining_stockValueSetter =(params)=>{
    let available_remaining_stock = Number(params.value.toString());
    const surplus = surplusValueGetter({...params.row, available_remaining_stock})
    setNewRows({...params.row, available_remaining_stock, surplus})
    return {...params.row, available_remaining_stock, surplus}
  }
}
// getter
{

  // value getter-----------------------------
  const total_in_stockValueGetter = (row) => {
    return (Number(row.new_in_stock) + Number(row.morning_stock))
  };
  const total_outlet_out_stockValueGetter = (row) => {
    return Number(row.baneshwor_out_stock) + Number(row.kumaripati_out_stock) + Number(row.durbarmarg_out_stock);
  };
  const total_out_stockValueGetter =(row)=>{
    return Number(row.central_out_stock) + Number(row.total_outlet_out_stock);
  }
  const actual_remaining_stockValueGetter =(row)=>{
    return Number(row.total_in_stock) + Number(row.central_return_stock)- Number(row.total_out_stock);
  }
  const surplusValueGetter =(row)=>{
    return Number(row.available_remaining_stock) -  Number(row.actual_remaining_stock);
  }
  const remaining_after_dispatch_orderValueGetter =(row)=>{
    return Number(row.total_in_stock) + Number(row.central_return_stock) - Number(row.durbarmarg_order) - Number(row.kumaripati_order) - Number(row.baneshwor_order) - Number(row.central_out_stock);
  }
  const tomorrow_orderValueGetter =(row)=>{
    // if value is less than set tocooklist
    if (Number(row.minValue)>=Number(row.remaining_after_dispatch_order)){
        props.setTodoList(oldArray => [...oldArray, row.pname])
    }
    return  Number(row.remaining_after_dispatch_order)
  }
}