import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/homePage/Home'
import Login from './pages/loginPage/Login'
import Sell from './pages/sell/Sell'
import ProductDetail from './pages/productDetail/ProductDetail'
import MyAds from './pages/myAds/MyAds'

const App = () => {
  return (
    <>
      <Routes>
             <Route path="/" element={<Home />}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/sell' element={<Sell/>}/>
             <Route path="/edit-ad/:id"element={<Sell />}/>
             <Route path="/product/:id" element={<ProductDetail />}/>
             <Route path="/myads" element={<MyAds />}/>


      </Routes>
    </>
  )
}

export default App
