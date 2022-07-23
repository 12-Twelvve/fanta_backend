import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Filter from './Filter'
import DataTable from './DataTable'
import moment from "moment"


function Inventory(){
  const [particularOption, setParticularOption] = useState('')
  const [date, setDate] = useState('')
  const [fetchData, setfetchData] = useState([])
  const [tableData, settableData] = useState([])
  // get datas 
  useEffect(() => {
    const url = "http://127.0.0.1:8000/";
    const getData =() =>{
       fetch(url)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setfetchData(res)
        })
    }
    getData();
  }, []);
  useEffect(()=>{
    console.log(particularOption)
    console.log(date)
    if (fetchData.length>0){
      let tempData = fetchData.find((li)=>(moment(li.date).format('yy MM DD')==date))
      if (tempData){
        // console.log(tempData.data)
        settableData(tempData.data)
      }
      else{
        settableData([])
      }
    }
  },[date, fetchData])
  useEffect(()=>{
    console.log('hello sunshine')
  },[tableData])

  return (
    <div>
        <Navbar />
        <Filter setParticularOption={setParticularOption} setDate={setDate}/>
        <DataTable date={date} particularOption={particularOption} tableData={tableData} settableData={settableData} />
        {/* update button */}

        
    </div>
  )
}

export default Inventory
// const demoData ={"SAUCE":["MOMO ACHAR", "LOCAL JHOL", "CHILLI SAUCE", "CHYOLA SAUCE", "DESI TANDOORI SAUCE", "OLD TANDOORI", "HOT SAUCE", "SUKUT SAUCiE", "MINT SAUCE", "GHERKING", "BBQ SAUCE", "SZECHUAN SAUCE", "GOUDA CHEESE", "KETCHUP SACHE", "GG PASTE", "MAYONNAISE", "RICE GRAVY", "PIZZA SAUCE"]}
