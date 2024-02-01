import React from 'react'
import './login.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {Link, useNavigate} from 'react-router-dom'
import logo from '../picture/logo.png'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const notifyA=(val)=>{toast.success(val)}
  const notifyB=(val)=>{toast.error(val)}
  const navigate=useNavigate();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const emailregex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 async function senddata(){
  if(!emailregex.test(email)){
    notifyB("Invalid Email")
    return;
}
else if(!passwordregex.test(password)){
  notifyB("Password must contain atleast 8 characters,including atleast 1 numeric value, 1 lowercase(a-z),1 uppercase(A-Z) and 1 special character")
return
}
   await fetch('https://secret-app-delta.vercel.app/login',{
      method:"post",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify({
        email:email,password:password
      })
    }).then((res)=>{
      return res.json();
    }).then((val)=>{
if(val.message){
   localStorage.setItem('token',val.token);
   localStorage.setItem('detail',JSON.stringify(val.detail));
  notifyA(val.message);
  navigate('/home');
}
else{
  notifyB(val.error)
}
    }).catch((err)=>{
console.log('error');
    })
  }
  return (
    <div className='signin'>
    <div className='logincontainer'>
    
    <div className='loginform'>
    <img src={logo} className='signup-logo'/>
    <div><input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}} /></div>
    <div><input type='password' name='password' id='password' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}} /></div>
    <input type='submit' value="Sign In" id='login-btn' onClick={senddata}/>
    <GoogleOAuthProvider clientId="">
    <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
      </GoogleOAuthProvider>
    </div>
    <div className='loginform2'>
          Don't have an account?
          <Link to="/signup"><span style={{color:"blue",cursor:"pointer"}}>Sign Up</span></Link>
    </div>
    </div>
    </div>
  )
}

export default Login
