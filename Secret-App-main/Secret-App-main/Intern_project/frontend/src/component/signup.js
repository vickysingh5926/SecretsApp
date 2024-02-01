import React from 'react'
import './signup.css'
import {Link, useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import logo from '../picture/logo.png'
import { ToastContainer, toast } from 'react-toastify';
const Signup = () => {
  const notifyA=(val)=>{toast.success(val)}
  const notifyB=(val)=>{toast.error(val)}
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [username,setusername]=useState('');
  const [name,setname]=useState('');
  const navigate=useNavigate();
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
   await fetch('https://secret-app-delta.vercel.app/signup',{
      method:"post",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify({
        email:email,password:password,name:name,username:username
      })
    }).then((res)=>{
      return res.json();
    }).then((val)=>{
if(val.message){
  setemail("");
  setpassword("");
  setname("");
  setusername("");
  notifyA(val.message)
 navigate('/login')
}
else{
  notifyB(val.error)
}

    }).catch((err)=>{
console.log('error');
    })
  }


  return (
    <div className='signup'>
        
    <div className='form-container'>
      
    <div className='form'>
    <img  className='signup-logo' src={logo}/>
    
    <p className='loginpara'>Sign up to reveal and know secrets <br/> of others</p>
   <div>
   <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
   </div>
   <div>
   <input type='text' name='name' id='name' placeholder='Full name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
   </div>
   <div>
   <input type='text' name='username' id='username' placeholder='Username' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
   </div>
   <div>
   <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
   </div>
   <p className='loginpara' style={{fontSize:"12px",margin:"3px 0px"}}>
   By signing up,you agree to out terms,<br/>privacy policy and cookies policy.
   </p>
   <input type='submit' id='submit-btn' value="Sign Up" onClick={senddata}/>
   
    </div>
    
    <div className='form2'>
    Already have an account?
    <Link to="/login"><span style={{color:"blue",cursor:"pointer"}}>Log In</span></Link>
    </div>
    </div>
    </div>
  )
}

export default Signup
