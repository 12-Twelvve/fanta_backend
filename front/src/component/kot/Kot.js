import React, {useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePickr from '../DatePicker';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


// datacollection
// data.kot
const items1 = [
{title:"jhol momo", quantity:2},
{title:"dang special", quantity:1},
{title:"dami special", quantity:2},
{title:"doaru special", quantity:2},
{title:"sunflower special", quantity:3},
{title:"kathmandu special", quantity:2}
]
const kot1 = {kotId:'12321235', items:items1}
const order = [{kot:kot1},{kot:kot1}, {kot:kot1}]
const data =[order, order, order]

function Kot() {
    const [branch, setbranch] = useState("durbarmarg");
    const [date, setdate] = useState('')   
      // fetch data 
    const fetchKots =()=>{}
      // handle data
    const handleChange = (event) => {
      setbranch(event.target.value);
    };
  
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
        {/* data-orders-kots */}
        <Box display="flex"
            flexWrap='wrap'
          sx={{m:3,mt:5, gap:3,}} 
          justifyContent="center">
        {data.map(o=>o.map(kt =><KotCard kot={kt.kot}/>))}
        </Box>
    </Box>
    )
}

const KotCard =({kot})=>{
    return(
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {kot?.kotId}
        </Typography>
        <Box color="text.secondary" sx={{ display:'flex',fontSize: 14, justifyContent:'space-around'}}>
        <Typography variant="body2">
          items
        </Typography>
        <Typography variant="body2">
          quantity
        </Typography>
        </Box>
        <hr/>
        {/* map through */}
        {kot?.items.map(k=>(
        <Box sx={{ display:'flex',fontSize: 14, justifyContent:'space-around'}}>
            <Typography variant="body2">
            {k?.title}
            </Typography>
            <Typography variant="body2">
            {k?.quantity}
            </Typography>
        </Box>))}
      </CardContent>
    </Card>
    )
}

export default Kot