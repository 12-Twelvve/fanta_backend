import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';




function CashHistory({sells}) {
  return (
    <Box wirddddd>
       { Object.entries(sells).map(([k,v]) => {
              return (<Item k={k} value={v}/>)
        })}
    </Box>
  )
}

const Item =({k, value})=>{
    return(
        <Box sx={{ display: 'flex', width:1, margin:1, textAlign:'center'}}>
            <Typography component="div" sx={{fontWeight:600}} variant="h6">
              {k}:
            </Typography> 
            {Array.isArray(value)?value.map((v)=>(<Box sx={{marginX:1,padding:1,borderRadius:5, backgroundColor:'yellow'}}><Typography component="div" variant="h6">
              {v}
            </Typography> </Box>)):<Box sx={{marginX:1,padding:1,borderRadius:5, backgroundColor:'yellow'}}> <Typography component="div" variant="h6">
              {value}
            </Typography></Box>}   
        </Box>
    )
}

export default CashHistory