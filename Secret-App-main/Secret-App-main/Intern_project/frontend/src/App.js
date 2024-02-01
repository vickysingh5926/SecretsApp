import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState,useEffect } from 'react';
import Navbar from './component/navbar.js'
import Signup from './component/signup.js'
import Login from './component/login.js'
import Secret from './component/secret.js'
import Profile from './component/profile.js'
import Logincontext from './component/logincontext.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './component/home.js'


function App() {
  const [userlogin,setuserlogin]=useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <Logincontext.Provider value={{setuserlogin}}>
      <Navbar  login={userlogin} />
      <Routes>
      <Route path='/' element={<Home/>}></Route>
     <Route path='/signup' element={<Signup/>}></Route>
     <Route path='/home' element={<Home/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/postsecret' element={<Secret/>}></Route>
     <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
      <ToastContainer theme='dark'/>
      </Logincontext.Provider>
     
    </div>
    
    </BrowserRouter>
    
  );
}

export default App;
