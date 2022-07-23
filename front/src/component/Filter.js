import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePickr from './DatePicker';


export default function Filter(props) {
  const [particulars, setParticulars] = React.useState("sauce");
  const handleChange = (event) => {
    setParticulars(event.target.value);
  };
  React.useEffect(()=>{
    props.setParticularOption(particulars)
  },[particulars])
  return (
    <Box 
      display="flex"
      sx={{m:3,mt:5, gap:1,}} 
      justifyContent="center"
      >
      <FormControl sx={{ minWidth: 300,mr:2, }}>
        <InputLabel id="particular-id">Particulars</InputLabel>
        <Select
          labelId="particular-id"
          id="particular-select"
          value={particulars}
          label="Particulars"
          onChange={handleChange}
        >
          <MenuItem value={"sauce"}>Sauce</MenuItem>
          <MenuItem value={"masala"}>Masala</MenuItem>
          <MenuItem value={"momo"}>MOMO</MenuItem>
          <MenuItem value={"others"}>Others</MenuItem>
          <MenuItem value={"meat"}>Meat</MenuItem>
          <MenuItem value={"vegetable"}>Vegetables</MenuItem>
          <MenuItem value={"plastic_wrap"}>Plastic Wrap</MenuItem>
          <MenuItem value={"cleaning"}>Cleaning</MenuItem>
          <MenuItem value={"grocery"}>Grocery</MenuItem>
          <MenuItem value={"drinks"}>Drinks</MenuItem>
        </Select>
      </FormControl>
      <DatePickr setDate={props.setDate}/>
    </Box>
  );
}
