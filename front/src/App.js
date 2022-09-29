import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Inventory from './component/Inventory'
import BuyandSell from './component/accounting/BuyandSell'
import Navbar from './component/Navbar'
import CashInOut from './component/cashinout/CashInOut'
import Kot from './component/kot/Kot'

function App() {
  return (
      < BrowserRouter >
         <Navbar />
      <Routes>
            <Route exact path="/" element={<Inventory/>} />
            <Route path="/account" element={<CashInOut/>} />
            <Route path="/sells" element={<BuyandSell/>} />
            <Route path="/kot" element={<Kot/>} />
            {/* <Route component={ErrorPage} /> */}
         </Routes>
      </BrowserRouter>
  )
}

export default App