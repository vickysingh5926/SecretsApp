import React from 'react'
import './profile.css'
import {toast } from 'react-toastify';
import { useEffect,useState } from 'react'
import profile from '../picture/profile.png'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [secrets,setsecrets]=useState([]);
  const navigate=useNavigate();
  const notifyB=(val)=> toast.error(val)
  const notifyA=(val)=> toast.success(val)
  const profiedata=JSON.parse(localStorage.getItem('detail'));
  useEffect(()=>{
 fetch(`https://secret-app-delta.vercel.app/profile/${JSON.parse(localStorage.getItem("detail"))._id}`,{
  headers:{
    "Authorization":"Bearer"+localStorage.getItem("token")
  }
 }).then((result)=>{
return result.json();
 }).then((val)=>{
  setsecrets(val)
 }).catch((err)=>{
  console.log(err)
 })
  },[])

 const deletesecret=(id)=>{
 const confirm=window.confirm('Are you want to delete it?')
 if(confirm){
  fetch(`https://secret-app-delta.vercel.app/secret/${id}`,{
    method:'delete',
    headers:{
      'Content-Type':'application/json',
      'authorization':'Bearer'+localStorage.getItem('token')
    }
  }).then((result)=>{
    return result.json();
  })
  .then((val)=>{
    if(val.message){
      notifyA(val.message)
      navigate('/')
    }
    else{
      notifyB(val.error)
    }
    return;
  }).catch((err)=>{
    console.log(err);
  })
 }
  
 } 

  return (
    <div className='profile-page-value'>
 <div className='profile-data'>
    <div className="profile-frame">
    <div className="profile-pic">
    <img  src={profile} alt="" />
    </div>
    
    <div className="profile-data">
    <h1>{profiedata.name}</h1>
    <div className="profile-info" style={{marginTop:'10px'}}>
    <p style={{fontWeight:'bold',fontSize:'larger'}}>Username:{profiedata.username}</p>
    <p style={{fontWeight:'bold',fontSize:'larger'}}>Secret Posted:{secrets.length}</p>
    </div>
    </div>
    </div>
<hr style={{width:"95%",margin:"25px auto",opacity:"0.9"}}/>
    <div className="gallery">
   {
    secrets.map((secret,key)=>{
      return(
        <div className='secret-card1'>
          <div className='delete-button-div'><span class="material-symbols-outlined" onClick={()=>{deletesecret(secret._id)}} >delete</span></div>
        <div style={{width:'100%',paddingTop:'10px',height:'10%',display:'flex',alignItems:'center',justifyContent:'center'}}> <h1>Secret</h1></div> 
        <hr style={{width:"95%",margin:"20px auto",opacity:"0.9"}}/>
        <div  className='secret-text-div'>
        <p className='secret-text'>{secret.secret}</p>
        </div>
        
      </div>
      )
    })
  }
    </div> 

    </div>
    </div>
   
  )
}

export default Profile
