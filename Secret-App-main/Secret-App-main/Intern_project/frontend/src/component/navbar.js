import React, { useEffect } from 'react'
import './navbar.css'
import logo from "../picture/logo.png"
import { Link } from 'react-router-dom'
import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Logincontext from './logincontext.js'
const Navbar = (prop) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const navigate=useNavigate();
 const logout = () => {
  const check=window.confirm('Are you want to Logout?')
  if(check){
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  }
   
}
 const loginstatus=()=>{
  const token=localStorage.getItem('token');
   if(token || prop.login){
    return [
      <>
      <Link to='/home' className='path'><li className='nav-item'>Home</li></Link>
      <Link to='/postsecret' className='path'><li className='nav-item'>Post Secret</li></Link>
      <Link to='/profile' className='path'><li className='nav-item'>Profile</li></Link>
      <li style={{ listStyle: 'none' }}><button className='primaryBtn' onClick={logout}>Log Out</button></li>
    </>
    ]

   }
   else{
    return [
      <>
      </>
    ]
   }
}

 
  const loginstatusmobile=()=>{
    const token=localStorage.getItem('token');
     if(token || prop.login){
      return [
        <>
        <Link to={'/'}><li><span class="material-symbols-outlined">home</span></li></Link>
        <Link to="/profile"><li><span class="material-symbols-outlined">account_circle</span></li></Link>
        <Link to="/postsecret"><li><span class="material-symbols-outlined">add_circle</span></li></Link>
        <li onClick={logout}><span class="material-symbols-outlined">logout</span></li>
        </>
      ]
        
     }
     else{
      return [
        <>
        <Link to="/signup"><li>Sign Up</li></Link>
        <Link to="/login"> <li>Sign In</li></Link>
        </>
      ]
     }
  }
  return (

    <div className='navbar'>
    <img className='logo' src={logo} alt='err' onClick={()=>{
      navigate('/')
    }}/>
    <ul className='nav-menu'> { loginstatus()}</ul>
    <ul className='nav-mobile'> { loginstatusmobile()}</ul>
    </div>
  )
}

export default Navbar