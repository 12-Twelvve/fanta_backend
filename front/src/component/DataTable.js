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
  // setter --------------------------------
  const setter =(row)=>{
    const total_in_stock = row.new_in_stock + row.morning_stock
    const total_outlet_out_stock = row.baneshwor_out_stock + row.kumaripati_out_stock + row.durbarmarg_out_stock
    const total_out_stock = row.central_out_stock + total_outlet_out_stock
    const actual_remaining_stock = total_in_stock + row.central_return_stock - total_out_stock
    const surplus = row.available_remaining_stock - actual_remaining_stock
    const remaining_after_dispatch_order = total_in_stock + row.central_return_stock- row.baneshwor_order -row.kumaripati_order - row.durbarmarg_order - row.central_out_stock
    const tomorrow_order = remaining_after_dispatch_order
    return {...row, total_in_stock, total_outlet_out_stock, total_out_stock, actual_remaining_stock, surplus, remaining_after_dispatch_order, tomorrow_order}
  }
  // each element setter----------------------------  
  const new_in_stockValueSetter=(params)=>{
    let new_in_stock = Number(params.value.toString());
    const tempValue = setter({...params.row, new_in_stock})
    setNewRows(tempValue)
    return {...tempValue}
  }
  const durbarmarg_out_stockValueSetter =(params)=>{
    let durbarmarg_out_stock = Number(params.value.toString());
    const tempValue = setter({...params.row, durbarmarg_out_stock})
    setNewRows(tempValue)
    return {...tempValue}
  }
  const kumaripati_out_stockValueSetter =(params)=>{
    let kumaripati_out_stock = Number(params.value.toString());
    const tempValue = setter({...params.row, kumaripati_out_stock})
    setNewRows(tempValue)
    return {...tempValue}  
  }
  const baneshwor_out_stockValueSetter = (params)=>{
    let baneshwor_out_stock= Number(params.value.toString());
    const tempValue = setter({...params.row, baneshwor_out_stock})
    setNewRows(tempValue)
    return {...tempValue} 
  }
  const central_out_stockValueSetter =(params)=>{
    let central_out_stock = Number(params.value.toString());
    const tempValue = setter({...params.row, central_out_stock})
    setNewRows(tempValue)
    return {...tempValue} 
  }
  const central_return_stockValueSetter =(params)=>{
    let central_return_stock= Number(params.value.toString());
    const tempValue = setter({...params.row, central_return_stock})
    setNewRows(tempValue)
    return {...tempValue} 
  }
  const available_remaining_stockValueSetter =(params)=>{
    let available_remaining_stock = Number(params.value.toString());
    const tempValue = setter({...params.row, available_remaining_stock })
    setNewRows(tempValue)
    return {...tempValue} 
  }
// if (Number(row.minValue)>=Number(row.remaining_after_dispatch_order)){
//     props.setTodoList(oldArray => [...oldArray, row.pname])
// }

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
      editable: false,
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
      editable:false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
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
      headerClassName: 'header',
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
      headerClassName: 'header',
    },
    {
      field: 'actual_remaining_stock',
      headerName: 'Actual Remaining Stock',
      width: 240,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
    },
    {
      field: 'available_remaining_stock',
      headerName: 'Available Remaining Stock',
      width: 280,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
      valueSetter : available_remaining_stockValueSetter,
    },
    {
      field: 'surplus',
      headerName: 'Surplus/Deficit',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
    },
    {
      field: 'remaining_after_dispatch_order',
      headerName: 'Remaining After dispatch order',
      width: 300,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
    },
    {
      field: 'tomorrow_order',
      headerName: 'Tomorrow Order',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
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

