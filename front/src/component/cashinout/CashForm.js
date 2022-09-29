import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from "moment"


function CashForm({sells,branch, date}) {
    const [cashIn, setcashIn] = useState(null)
    const [foodmandu, setfoodmandu] = useState(null)
    const [bhojdeals, setBhoojdeals] = useState(null)
    const [patho, setpatho] = useState(null)
    const [foodganj, setfoodganj] = useState(null)
    const [foodole, setfoodole] = useState(null)
    const [foodBusters, setfoodBusters] = useState(null)
    const [tatomitho, settatomitho] = useState(null)
    const [POSmachine, setPOSmachine] = useState(null)
    const [fonepay, setfonepay] = useState(null)
    const [esewa, setesewa] = useState(null)
    const [cashsales, setcashsales] = useState(null)
    const [cashout, setcashout] = useState(null)
    const [foodcredit, setfoodcredit] = useState(null)
    const [gasIn, setgasIn] = useState(null)
    const [waterjarIn, setwaterjarIn] = useState(null)
    const [pepsiIn, setpepsiIn] = useState(null)
  
    const uploadData =()=>{
      let brnch = "";
      if(branch=="kumaripati"){
        brnch = "kumaripati_sells"
      }
      else{
        brnch = "durbarmarg_sells"
      }
      fetch(`http://127.0.0.1:8000/${brnch}`, {
          method: "POST",
          body: JSON.stringify({
            date:moment(date).format('yyyy-MM-DD'),
            sells:sells
          }),
          headers: {
              "Content-type": "application/json"
          }
          })
          .then(response => response.json())
          .then(dt => {
            console.log(dt)
          }).catch(err=>{
            console.log(err)
        })
    }
    // empty field
    const emptyField =()=>{
        setcashIn(null)
        setfoodmandu(null)
        setBhoojdeals(null)
        setpatho(null)
        setfoodganj(null)
        setfoodole(null)
        setfoodBusters(null)
        settatomitho(null)
        setPOSmachine(null)
        setfonepay(null)
        setesewa(null)
        setcashsales(null)
        setcashout(null)
        setfoodcredit(null)
        setgasIn(null)
        setwaterjarIn(null)
        setpepsiIn(null)
    }
    // update data 
    const handleSubmit =()=>{
        sells.cashIn = cashIn?cashIn:sells.cashIn
        sells.foodmandu.push(foodmandu)
        sells.bhojdeals.push(bhojdeals)
        sells.patho.push(patho) 
        sells.foodole.push(foodole)
        sells.foodBusters.push(foodBusters)
        sells.tatomitho.push(tatomitho)
        sells.POSmachine.push(POSmachine)
        sells.fonepay.push(fonepay)
        sells.esewa.push(esewa)
        sells.cashout.push(cashout)
        sells.foodcredit.push(foodcredit)
        sells.gasIn.push(gasIn) 
        sells.pepsiIn.push(pepsiIn)
        sells.cashsales.push(cashsales)
        sells.waterjarIn.push(waterjarIn)
        sells.foodganj.push(foodganj)
        Object.entries(sells).forEach(([k,v]) => {
            if(k != 'cashIn'){
                // for null
                sells[k] = v?.filter(function (e) {return e != null;});
            }
        })
        // empty field
        emptyField()
        // upload data
        uploadData()
    }

  return (
    <Box sx={{marginX:25 }}>
     <form >
        <Box
        sx={{ display:"flex",flexDirection: 'column'}}
        >
        <Box  sx={{ display:"flex" ,flexWrap: 'wrap'}}>
        <TextField   
          sx={{marginY:1}}     
          id="cash_in"
          label="Cash In"
          value={cashIn}
          onChange={(e)=>{
                setcashIn(e.target.value.replace(/ /g, ''))
            }}
        />
        {sells?.cashIn?<Box  sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {sells.cashIn}
        </Box>:''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
           sx={{marginY:1}}
          id="foodmandu"
          label="Foodmandu"
          value={foodmandu}
          onChange={(e)=>{setfoodmandu(e.target.value)}}
        />
        {sells?.foodmandu?sells.foodmandu.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="bhojdeals"
          label="Bhojdeals"
          value={bhojdeals}
          onChange={(e)=>{setBhoojdeals(e.target.value)}}
        />
         {sells?.bhojdeals?sells.bhojdeals.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="patho"
          label="Patho"
          value={patho}
          onChange={(e)=>{setpatho(e.target.value)}}
        />
         {sells?.patho?sells.patho.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="foodganj"
          label="Foodganj"
          value={foodganj}
          onChange={(e)=>{setfoodganj(e.target.value)}}
        />
         {sells?.foodganj?sells.foodganj.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="foodole"
          label="Foodole"
          value={foodole}
          onChange={(e)=>{setfoodole(e.target.value)}}
        />
         {sells?.foodole?sells.foodole.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="foodbusters"
          label="FoodBusters"
          value={foodBusters}
          onChange={(e)=>{setfoodBusters(e.target.value)}}
        />
         {sells?.foodBusters?sells.foodBusters.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="tatomitho"
          label="Tatomitho"
          value={tatomitho}
          onChange={(e)=>{settatomitho(e.target.value)}}
        />
         {sells?.tatomitho?sells.tatomitho.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="POSMachine"
          label="POSmachine"
          value={POSmachine}
          onChange={(e)=>{setPOSmachine(e.target.value)}}
        />
         {sells?.POSmachine?sells.POSmachine.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="fonepay"
          label="Fonepay"
          value={fonepay}
          onChange={(e)=>{setfonepay(e.target.value)}}
        />
         {sells?.fonepay?sells.fonepay.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="esewa"
          label="Esewa"
          value={esewa}
          onChange={(e)=>{setesewa(e.target.value)}}
        />
         {sells?.esewa?sells.esewa.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="cashsales"
          label="Cash Sales"
          value={cashsales}
          onChange={(e)=>{setcashsales(e.target.value)}}
        />
         {sells?.cashsales?sells.cashsales.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex" ,flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="cashout"
          label="Cash Out"
          value={cashout}
          onChange={(e)=>{setcashout(e.target.value)}}
        />
         {sells?.cashout?sells.cashout.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="foodcredit"
        label="Food credit"
        value={foodcredit}
        onChange={(e)=>{setfoodcredit(e.target.value)}}
        />
         {sells?.foodcredit?sells.foodcredit.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="gasin"
          label="Gas In"
          value={gasIn}
          onChange={(e)=>{setgasIn(e.target.value)}}
        />
         {sells?.gasIn?sells.gasIn.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="waterIn"
          label="Water jar In"
          value={waterjarIn}
          onChange={(e)=>{setwaterjarIn(e.target.value)}}
        />
         {sells?.waterjarIn?sells.waterjarIn.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        <Box  sx={{ display:"flex",flexWrap: 'wrap'}}>
        <TextField
          sx={{marginY:1}}
          id="pepsiin"
          label="Pepsi In"
          value={pepsiIn}
          onChange={(e)=>{setpepsiIn(e.target.value)}}
        />
         {sells?.pepsiIn?sells.pepsiIn.map(d=>(<Box key={d} sx={{backgroundColor:"yellow" ,margin:2, padding:1 }}>
            {d}
        </Box>)):''}
        </Box>
        </Box>
        <Button  variant="contained" disableElevation  onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default CashForm