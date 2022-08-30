import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Inventory from './component/Inventory'
import BuyandSell from './component/accounting/BuyandSell'
import Navbar from './component/Navbar'

function App() {
  return (
      < BrowserRouter >
         <Navbar />
      <Routes>
            <Route exact path="/" element={<Inventory/>} />
            <Route path="/account" element={<BuyandSell/>} />
            {/* <Route component={ErrorPage} /> */}
         </Routes>
      </BrowserRouter>
  )
}

export default App