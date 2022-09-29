import React , {useState, useEffect}from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePickr from '../DatePicker';
import CashForm from './CashForm';
import Button from '@mui/material/Button';
import moment from "moment"
import CashHistory from './CashHistory';

// import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


function CashInOut() {
  const [branch, setbranch] = useState("durbarmarg");
  const [date, setdate] = useState('')
  const [data, setdata] = useState({})
  const [historydata, sethistorydata] = useState({})
  const [showdata, setshowdata] = useState(false)
//   const [rows, setrows] = useState([])
       // fetch data 
  const fetchSellsData =()=>{
    let brnch = "";
    if(branch=="kumaripati"){
      brnch = "kumaripati_sells"
    }
    else{
      brnch = "durbarmarg_sells"
    }
    fetch(`http://127.0.0.1:8000/${brnch}`, {
        method: "GET",
        })
        .then(response => response.json())
        .then(dt => {
          console.log(dt)
          if(dt){
            setdata(dt.sells)
          }
        }).catch(err=>{
          setdata({})
          console.log(err)
        })
  }
    // handle data
  const handleChange = (event) => {
    setbranch(event.target.value);
  };
  const getSpecificDateData =()=>{
   let brnch = "";
    if(branch=="kumaripati"){
      brnch = "kumaripati_sells"
    }
    else{
      brnch = "durbarmarg_sells"
    }
    fetch(`http://127.0.0.1:8000/${brnch}?date=${moment(date).format('yyyy-MM-DD')}`, {
        method: "GET",
        })
        .then(response => response.json())
        .then(dt => {
          sethistorydata(dt)
          setshowdata(true)
        });
  }
  useEffect(()=>{
    fetchSellsData()
  },[branch])
  return (
    <Box>
      <Box 
        display="flex"
        sx={{m:3,mt:5, }} 
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
      </Box>
      {/* daily cash in and out */}
      <CashForm sells={data} branch={branch} date={date}/>
      <Box display="flex"
        sx={{m:3,mt:5, gap:1,}} 
        justifyContent="center">
          <DatePickr setDate={setdate}/>
          <Button  variant="contained" disableElevation  onClick={getSpecificDateData}>
           Get
        </Button>
      </Box>
      <Box display="flex" 
        sx={{m:3,mt:5, width:1}} 
        justifyContent="center">
          {
            showdata?
            <CashHistory sells= {historydata?.sells}/>:''
          }
      </Box>
    </Box>
  )
}

export default CashInOut