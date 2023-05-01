import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import LoginScreen from './components/Login'
import RegisterScreen from './components/Register'
import Dashboard from './components/Dashboard'
import AddCar from './components/AddCar'
import EditCar from './components/EditCar'




const App = () => {
  return (
    <BrowserRouter>
    <main className='py-3'>
      <Header/>
    <Container>
       <Routes>
         <Route path="/" element={<LoginScreen/>}/>
         <Route path="/register" element={<RegisterScreen/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/add" element={<AddCar/>}/>
         <Route path="/edit" element={<EditCar/>}/>     
        </Routes>
      </Container> 
      </main> 
    </BrowserRouter>

  )
}

export default App