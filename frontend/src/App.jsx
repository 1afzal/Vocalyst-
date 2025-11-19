import React from 'react'
import Vocalyst from './Vocalyst'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Landing from './components/Landing'
import SignupFormDemo from './components/signup-form-demo'
import ChatApp from './components/ChatBot'
import { Login } from './components/Login'


function App(){
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/vocalyst' element={<Vocalyst />}/>
        <Route path='/signup' element={<SignupFormDemo />}/>
        <Route path="/chat" element={< ChatApp />}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    
    </BrowserRouter>

  )
}

export default App
