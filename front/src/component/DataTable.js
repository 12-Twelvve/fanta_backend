import React ,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


export default function DataTable(props) {
  const [rows, setRows] = useState([])
  // values changes
  function setNewRows (params) {
    const tempRow = rows.map(p=>(p.pname==params.pname)?params:p)
    setRows(tempRow)
    // if we want to save the changes data in differet partculars then
    let tempData = props.tableData.map((li)=>(li.particulars==props.particularOption)?({particulars:li.particulars, plist:tempRow}):li)
    props.settableData(tempData)
  }
  // value setter----------------------------  
  const new_in_stockValueSetter=(params)=>{
    let new_in_stock = Number(params.value.toString());
    const total_in_stock = total_in_stockValueGetter({...params.row ,new_in_stock})  
      const actual_remaining_stock = actutal_remaining_stockValueGetter({...params.row, total_in_stock})
        const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
      const remaining_after_dispatch_order = remaining_after_dispatch_orderValueGetter({...params.row, total_in_stock})
        const tomorrow_order = tomorrow_orderValueGetter({...params.row, remaining_after_dispatch_order})
    setNewRows({...params.row, new_in_stock, total_in_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order})
    return {...params.row, new_in_stock, total_in_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order}
  }
  const durbarmarg_out_stockValueSetter =(params)=>{
    let durbarmarg_out_stock = Number(params.value.toString());
    const total_outlet_out_stock = total_outlet_out_stockValueGetter({...params.row, durbarmarg_out_stock})
      const total_out_stock = total_out_stockValueGetter({...params.row, total_outlet_out_stock})
        const actual_remaining_stock = actutal_remaining_stockValueGetter({...params.row, total_out_stock})
          const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    setNewRows({...params.row, durbarmarg_out_stock, total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus})
    return {...params.row, durbarmarg_out_stock, total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus}
  }
  const kumaripati_out_stockValueSetter =(params)=>{
    let kumaripati_out_stock = Number(params.value.toString());
    const total_outlet_out_stock = total_outlet_out_stockValueGetter({...params.row, kumaripati_out_stock})
      const total_out_stock = total_out_stockValueGetter({...params.row, total_outlet_out_stock})
        const actual_remaining_stock = actutal_remaining_stockValueGetter({...params.row, total_out_stock})
          const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    setNewRows({...params.row, kumaripati_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus})
    return {...params.row, kumaripati_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus}
  }
  const baneshwor_out_stockValueSetter = (params)=>{
    let baneshwor_out_stock= Number(params.value.toString());
    const total_outlet_out_stock = total_outlet_out_stockValueGetter({...params.row, baneshwor_out_stock})
    const total_out_stock = total_out_stockValueGetter({...params.row, total_outlet_out_stock})
      const actual_remaining_stock = actutal_remaining_stockValueGetter({...params.row, total_out_stock})
        const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    setNewRows({...params.row, baneshwor_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus})
    return {...params.row, baneshwor_out_stock , total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus}
}
  const central_out_stockValueSetter =(params)=>{
    let central_out_stock = Number(params.value.toString());
    const total_out_stock = total_out_stockValueGetter({...params.row, central_out_stock})
      const actual_remaining_stock = actutal_remaining_stockValueGetter({...params.row, total_out_stock})
        const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    const remaining_after_dispatch_order = remaining_after_dispatch_orderValueGetter({...params.row, central_out_stock})
      const tomorrow_order = tomorrow_orderValueGetter({...params.row, remaining_after_dispatch_order})
    setNewRows({...params.row, central_out_stock, total_out_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order})
    return {...params.row, central_out_stock, total_out_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order}
  }
  const central_return_stockValueSetter =(params)=>{
    let central_return_stock= Number(params.value.toString());
    const actual_remaining_stock = actutal_remaining_stockValueGetter({...params.row, central_return_stock})
      const surplus = surplusValueGetter({...params.row, actual_remaining_stock})
    const remaining_after_dispatch_order = remaining_after_dispatch_orderValueGetter({...params.row, central_return_stock})
      const tomorrow_order = tomorrow_orderValueGetter({...params.row, remaining_after_dispatch_order})
    setNewRows({...params.row, central_return_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order})
    return {...params.row, central_return_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order}
  }
  const available_ramaining_stockValueSetter =(params)=>{
    let available_ramaining_stock = Number(params.value.toString());
    const surplus = surplusValueGetter({...params.row, available_ramaining_stock})
    setNewRows({...params.row, available_ramaining_stock, surplus})
    return {...params.row, available_ramaining_stock, surplus}
  }

  // value getter-----------------------------
  const total_in_stockValueGetter = (row) => {
    return (Number(row.new_in_stock) + Number(row.morning_stock))
  };
  const total_outlet_out_stockValueGetter = (row) => {
    return Number(row.baneshwor_out_stock) + Number(row.kumaripati_out_stock) + Number(row.durbarmarg_out_stock);
  };
  const total_out_stockValueGetter =(row)=>{
    return Number(row.central_return_stock) + Number(row.total_outlet_out_stock);
  }
  const actutal_remaining_stockValueGetter =(row)=>{
    return Number(row.total_in_stock) + Number(row.central_return_stock)- Number(row.total_out_stock);
  }
  const surplusValueGetter =(row)=>{
    return Number(row.available_remaining_stock) -  Number(row.actual_remaining_stock);
  }
  const remaining_after_dispatch_orderValueGetter =(row)=>{
    return Number(row.total_in_stock) + Number(row.central_return_stock) - Number(row.durbarmarg_order) - Number(row.kumaripati_order) - Number(row.baneshwor_order) - Number(row.central_out_stock);
  }
  const tomorrow_orderValueGetter =(row)=>{
    return  Number(row.remaining_after_dispatch_order)
  }


  const columns = [
    { 
      field: 'pname',
      headerName: 'Particulars',
      width: 150,
      headerAlign: 'center',
      align: 'center', 
      headerClassName: 'header',
    },
    {
      field: 'morning_stock',
      headerName: 'Morning Current Stock',
      width: 250,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
  
    },
    {
      field: 'new_in_stock',
      headerName: 'New in Stock',
      width: 180,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      valueSetter : new_in_stockValueSetter,
    },
    {
      field: 'total_in_stock',
      headerName: 'Total in Stock',
      width: 200,
      // editable: true,
      colId:'total_in_stock',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      // valueGetter:total_in_stockValueGetter,
    },
    {
      field: 'durbarmarg_order',
      headerName: 'Durbarmarg Order',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'pink'
  
    },
    {
      field: 'durbarmarg_out_stock',
      headerName: 'Out Stock',
      width: 150,
      editable: true,
      headerAlign: 'left',
      align: 'left',
      headerClassName: 'pink',
      valueSetter : durbarmarg_out_stockValueSetter,  
    },
    {
      field: 'kumaripati_order',
      headerName: 'Kumaripati Order',
      width: 220,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'yellow',
    },
    {
      field: 'kumaripati_out_stock',
      headerName: 'Out Stock',
      width: 150,
      editable: true,
      headerAlign: 'left',
      align: 'left',
      headerClassName: 'yellow',
      valueSetter : kumaripati_out_stockValueSetter,    
    },
    {
      field: 'baneshwor_order',
      headerName: 'Baneshwor Order',
      width: 220,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'orange'
    },
    {
      field: 'baneshwor_out_stock',
      headerName: 'Out Stock',
      width: 150,
      editable: true,
      headerAlign: 'left',
      align: 'left',
      headerClassName: 'orange',
      valueSetter : baneshwor_out_stockValueSetter,  
    },
    {
      field: 'total_outlet_out_stock',
      headerName: 'Total Outlet Out Stock',
      width: 220,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      colId:'total_outlet_out_stock',
      headerClassName: 'header',
      // valueGetter: total_outlet_out_stockValueGetter ,
    },
    {
      field: 'central_out_stock',
      headerName: 'Central OutStock',
      width: 190,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      valueSetter : central_out_stockValueSetter,

    },
    {
      field: 'central_return_stock',
      headerName: 'Central Return Stock',
      width: 230,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      valueSetter : central_return_stockValueSetter,
    },
    {
      field: 'total_out_stock',
      headerName: 'Total OutStock',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      colId:'total_out_stock',
      headerClassName: 'header',
      // valueGetter: total_out_stockValueGetter ,
    },
    {
      field: 'actual_remaining_stock',
      headerName: 'Actual Remaining Stock',
      width: 240,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      colId:'actual_remaining_stock',
      headerClassName: 'header',
      // valueGetter: actutal_remaining_stockValueGetter,
    },
    {
      field: 'available_ramaining_stock',
      headerName: 'Available Remaining Stock',
      width: 280,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      valueSetter : available_ramaining_stockValueSetter,
    },
    {
      field: 'surplus',
      headerName: 'Surplus/Deficit',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      // valueGetter: surplusValueGetter ,
    },
    {
      field: 'remaining_after_dispatch_order',
      headerName: 'Remaining After dispatch order',
      width: 300,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      colId:'remaining_after_dispatch_order',
      headerClassName: 'header',
      // valueGetter: remaining_after_dispatch_orderValueGetter,
    },
    {
      field: 'tomorrow_order',
      headerName: 'Tomorrow Order',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      // valueGetter: tomorrow_orderValueGetter,
    },
  
  ];
  
  function CustomToolbar() {
      return (
        <GridToolbarContainer>
          <GridToolbarExport 
          sx={{color:"gray"}}
          />
        </GridToolbarContainer>
      );
    }
  // setRows to rows according to props pass
  useEffect(()=>{
    let tempData = props.tableData.find((li)=>(li.particulars===props.particularOption))
    if (tempData){
        const rows = tempData.plist;
        setRows(rows) 
        }
    else{
      setRows([])
    }
  },[props.tableData, props.particularOption])

  return (
    <Box 
    display="flex"
    justifyContent="center"
    alignContent="center"
    sx={{width: '100%',}}
    >
    <Box
    sx={{ 
        height: 700, width: '90%', 
        '& .header': {
            backgroundColor: 'lightgray',
          },
        '& .header_longName': {
            backgroundColor: 'lightgray',
            
          },
          '& .pink': {
            backgroundColor: 'pink',
            
          },
          '& .orange': {
            backgroundColor: 'orange',
          },
          '& .yellow': {
            backgroundColor: 'yellow',
          },

    }}>
      <DataGrid
        disableColumnMenu
        rows={rows}
        columns={columns}
        pageSize={25}
        getRowId={(row) => row.pname }
        rowsPerPageOptions={[25]}
        components={{ Toolbar: CustomToolbar }}
        />
    </Box>
    </Box>
  );
}



// const rows = tempData.plist.map((vl)=>createData(...vl));

// function createData(
//   pname,
//   morning_stock, 
//   new_in_stock, 
//   total_in_stock, 
//   durbarmarg_order,
//   durbarmarg_out_stock,
//   kumaripati_order,
//   kumaripati_out_stock,
//   baneshwor_order,
//   baneshwor_out_stock,
//   total_outlet_out_stock,
//   central_out_stock,
//   central_return_stock,
//   total_out_stock,
//   actual_remaining_stock,
//   available_ramaining_stock,
//   surplus,
//   remaining_after_dispatch_order,
//   tomorrow_order,
//   ) {
//   return {
//     pname,
//     morning_stock, 
//     new_in_stock, 
//     total_in_stock, 
//     durbarmarg_order,
//     durbarmarg_out_stock,
//     kumaripati_order,
//     kumaripati_out_stock,
//     baneshwor_order,
//     baneshwor_out_stock,
//     total_outlet_out_stock,
//     central_out_stock,
//     central_return_stock,
//     total_out_stock,
//     actual_remaining_stock,
//     available_ramaining_stock,
//     surplus,
//     remaining_after_dispatch_order,
//     tomorrow_order,
//    };
// }
 // data of particular date
//  const datas = [
//   {
//       "particulars":'sauce',
//       "plist":[
//           ['momoachar', 12 ,4 , 5, 7, 2, 2, 1, 5, 6, 1, 0, 4, 6, 4, 3, 6, 6, 3, 2],
//           ['moachar', 14 ,4 , 5, 7,null, 2, 1, 5, 6, 1, 0, 4, 6, 4, 3, 6, 6, 3, 2],
//       ]
//   },
//   {
//       "particulars":'others',
//       "plist":[
//           ['kima', 12 ,4 , 5, 7, 2, 2, 1, 5, 6, 1, 0, 4, 6, 4, 3, 6, 6, 3, 2],
//           ['sima', 14 ,4 , 5, 7,null, 2, 1, 5, 6, 1, 0, 4, 6, 4, 3, 6, 6, 3, 2],
//       ]
//   },
//   {
//       "particulars":'drinks',
//       "plist":[
//           ['orengo', 12 ,4 , 5, 7, 2, 2, 1, 5, 6, 1, 0, 4, 6, 4, 3, 6, 6, 3, 2],
//           ['monga', 14 ,4 , 5, 7,null, 2, 1, 5, 6, 1, 0, 4, 6, 4, 3, 6, 6, 3, 2],
//           ['bananaba', 14 ,4 , 5, 7,null, 2, 1, 5, 6, 1, 0, 4, 6, 4, 3, 6, 6, 3, 2],
//       ]
//   }
// ]

// function setNewInStock(params) {
//   let new_in_stock = params.value.toString();
//   // this changes the following values
//   console.log(params.row)
//   // let total_in_stock = Number(params.row.morning_stock) + Number(new_in_stock)
//   // let actual_remaining_stock = Number(total_in_stock) + Number(params.row.central_return_stock) -Number(params.row.total_out_stock)
//   // let remaining_after_dispatch_order = Number(total_in_stock) + Number(params.row.central_return_stock) +  - Number(params.row.durbarmarg_order) - Number(params.row.kumaripati_order) - Number(params.row.baneshwor_order) - Number(params.row.central_out_stock)
//   // let tomorrow_order = remaining_after_dispatch_order
//   // return { ...params.row, new_in_stock ,
//   //          total_in_stock,
//   //          actual_remaining_stock,
//   //          remaining_after_dispatch_order,
//   //          tomorrow_order
//   // };
// }

// function setRemainingAfterDispatchOrder(params) {
//   const remaining_after_dispatch_order = params.value.toString();
//   console.log(params.row)
//   return { ...params.row, remaining_after_dispatch_order };
// }