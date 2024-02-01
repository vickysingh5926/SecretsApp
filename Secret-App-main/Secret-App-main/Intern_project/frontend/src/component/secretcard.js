import React from 'react';
import './secretcard.css'
import { useState } from 'react';
import logo from '../picture/logo.png'
import profile from '../picture/profile.png'
const StoryCard = ( props) => {
  const {secret,likesecret,unlikesecret,makecomment,tooglecomment}=props;
  const [comment,setcomment]=useState("")
  const date=new Date(secret.createdAt);
  const formattedDate = date.toISOString().split('T')[0];
  const parts = formattedDate.split('-');
  const newDateFormat = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const detail=JSON.parse(localStorage.getItem('detail'))
  return (
 <div className='secret-page'>
           <div className='profile-div'>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}><img src={profile} alt="" className='profile' />
            <span style={{fontWeight:'bold',marginLeft:'5px'}}>{
               detail._id==secret.postedby._id?detail.name:"User"
            }</span>
            </div>
            <span>Posted on:{newDateFormat}</span>
            </div>
     <div className='secret-card'>
      <div style={{width:'100%',height:'10%',display:'flex',alignItems:'center',justifyContent:'center'}} > <h1>Secret</h1></div> 
      <hr style={{ borderColor: 'black', borderWidth: '1px',width:'90%' }} />
      <div style={{height:'90%',minHeight:"300px",display:'flex',alignItems:'center',justifyContent:'center'}} className='secret-text-div'>
      <p className='secret-text'>{secret.secret}</p>
      </div>
      <hr style={{ borderColor: 'black', borderWidth: '1px',width:'90%' }} />
      <div style={{display:'flex',alignItems:'center',width:'100%',flexDirection:'column',justifyContent:'start',marginLeft:'10px'}}>
        <div style={{display:'flex',alignItems:'start',width:'100%',flexDirection:'row'}}>
        {
      secret.likes.includes(JSON.parse(localStorage.getItem("detail"))._id)?(<span class="material-symbols-outlined material-symbols-outlined-red" onClick={()=>{
        unlikesecret(secret._id)}}>favorite</span>):(<span class="material-symbols-outlined"  onClick={()=>{likesecret(secret._id)}}>favorite</span>)
    }
   <p  className='like-show'>{secret.likes.length} Likes</p>
        </div>
      <div style={{display:'flex',alignItems:'start',width:'100%',flexDirection:'column',margin:'2px'}}>
        <p  className='view-all-comment' onClick={()=>{tooglecomment(secret)}}>View all comments</p>
        </div>
   
      </div>
    </div>
    <div className="comment-like"> 
    <div className="input-comment">
      <div className='comment-input-box' ><input type="text" style={{width:'100%',border:'none'}} placeholder='Add Comment...' value={comment} onChange={(e)=>{setcomment(e.target.value)}}/></div>
      <div className='comment-post-box'><input  className='comment-btn' type="button"style={{width:'100%',border:'none'}} value={'Post'} onClick={()=>{makecomment(comment,secret._id)
      setcomment("");
      }} /></div>
    </div>
    </div>
    </div>
    
   
    
    
   
  );
};

export default StoryCard;
