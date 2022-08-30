import React , {useState, useEffect}from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePickr from '../DatePicker';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

function BuyandSell() {
  const [branch, setbranch] = useState("durbarmarg");
  const [date, setdate] = useState('')
  const [rows, setrows] = useState([])
    // fetch data 
  const fetchOrders =()=>{}
    // handle data
  const handleChange = (event) => {
    setbranch(event.target.value);
  };
  const columns = [
    { 
      field: 'item',
      headerName: 'Item',
      width: 425,
      resizable:true,
      sortable:false,
      headerAlign: 'center',
      align: 'center', 
      headerClassName: 'orange',
      hideSortIcons:true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      sortable:false,
      headerClassName: 'orange',
  
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 150,
      editable: true,
      headerAlign: 'center',
      align: 'center',
      sortable:false,
      headerClassName: 'orange',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 180,
      editable:false,
      headerAlign: 'center',
      sortable:false,
      align: 'center',
      headerClassName: 'orange',

    },
    {
      field: 'discount',
      headerName: 'Discount',
      width: 125,
      sortable:false,
      editable: false,
      headerAlign: 'center',
      headerClassName: 'orange',
      align: 'center',
  
    },
    {
      field: 'servicetax',
      headerName: 'Service Tax',
      width: 125,
      sortable:false,
      editable: true,
      headerAlign: 'left',
      headerClassName: 'orange',
      align: 'left',
    },
    {
      field: 'total',
      headerName: 'Total',
      sortable:false,
      editable: false,
      headerAlign: 'center',
      headerClassName: 'orange',
      align: 'center',
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
//   getalltheDatas
  return (
    <Box >
        <Box 
        display="flex"
        sx={{m:3,mt:5, gap:1,}} 
        justifyContent="center"
        >
        <FormControl sx={{ minWidth: 300,mr:2, }}>
            <InputLabel id="branch-id">Branch</InputLabel>
            <Select
            labelId="branch-id"
            id="branch-select"
            value={branch}
            label="Branch"
            onChange={handleChange}
            >
            <MenuItem value={"durbarmarg"}>Durbarmarg</MenuItem>
            <MenuItem value={"kumaripati"}>Kumaripati</MenuItem>
            </Select>
        </FormControl>
        <DatePickr setDate={setdate}/>
      </Box>
      {/* daily sells */}
      <Box
    display="flex"
    justifyContent="center"
    alignContent="center"
    sx={{width: '100%',}}>
      <Box 
      
      sx={{ 
        height: 700, width: '70%', 
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
        loading ={rows.length>0?false:true}
        hideFooter={true}
        pageSize={25}
        getRowId={(row) => row.items }
        rowsPerPageOptions={[50]}
        components={{ Toolbar: CustomToolbar }}
        />  
      </Box>
      </Box>
    </Box>
  )
}

export default BuyandSell