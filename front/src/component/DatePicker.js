import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment"

export default function DatePickr({setDate}) {
  const [value, setValue] = React.useState(new Date());
  const lastYearDate =()=>{
    var d = new Date(); 
    d.setFullYear(d.getFullYear()-1);
    return d; 
  }
  React.useEffect(()=>{
    setDate(moment(value).format('yy MM DD'))
  },[value])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="date"
        views={['month','day']}
        value={value}
        minDate={lastYearDate()}
        disableFuture
        inputFormat="MMM dd"
        onChange={(newValue) => {
          setValue(newValue);
        }}
        
        renderInput={(params) => {
        return <TextField {...params}/>
      }}
      />
    </LocalizationProvider>
  );
}