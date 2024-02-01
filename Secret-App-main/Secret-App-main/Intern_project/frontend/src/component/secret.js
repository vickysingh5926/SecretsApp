import React from 'react'
import './secret.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Secret = () => {
  const notifyA=(val)=>{toast.success(val)}
  const notifyB=(val)=>{toast.error(val)}
  const navigate=useNavigate();
  const [secret_text,setsecret_text]=useState('')
  
   const send_secret=()=>{
    const detail=JSON.parse(localStorage.getItem('detail'));
       fetch('https://secret-app-delta.vercel.app/postsecret',{
        method:'post',
        headers:{"Content-Type":"application/json",
        "authorization":"Bearer"+localStorage.getItem('token'),
      },
       
        body:JSON.stringify({secret:secret_text,postedby:detail._id})
       })
       .then((res)=>{
        return res.json();
       })
       .then((val)=>{
        if(val.message){
         notifyA(val.message)
         setsecret_text("");
         navigate('/home')
        }
        else{
          
          notifyB(val.error)
        }
       }).catch((err)=>{
        console.log(err);
       })
   }
    
  return (
    <div className='secret-box-outerside'>
       
       <div className="content">
       
       <div className='secret-box-innerside'>
             <div className='textarea-div'>
                <textarea  className='textarea'  value={secret_text}  disabled ></textarea>
             </div>
             <div className='input-btn'>
               <div className='input-btn1'> <input type="text" className='text-written' placeholder='Type text here...' value={secret_text} onChange={(e)=>{setsecret_text(e.target.value)}}/></div>
               <div className='input-btn2'> <input className='post-btn' value={'Post'} onClick={send_secret}/></div>
              
             </div>
             
          </div>
       </div>
    </div>
  )
}

export default Secret
