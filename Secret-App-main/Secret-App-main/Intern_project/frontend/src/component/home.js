// Home.js
import React, { useEffect ,useState} from 'react';
import StoryCard from './secretcard.js';
import {toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import profile from '../picture/profile.png'
import logo from '../picture/logo.png'
import './home.css'
const Home = () => {
  const navigate=useNavigate();
  const notifyB=(val)=> toast.error(val)
  const notifyA=(val)=> toast.success(val)
 const [secrets,setsecrets]=useState([]);
 const [show,setshow]=useState(false)
 const [item,setitem] = useState([])
 const [commentval,setcommentval] = useState("")
 const tooglecomment=(secret)=>{
  console.log(secret)
  if(show){
    setshow(false)
  }
  else{
    setitem(secret)
    setshow(true)
    
  }
}
 useEffect(()=>{
  const token=localStorage.getItem('token');
  if(!token){
    navigate('../signup')
    return;
  }
  fetch('https://secret-app-delta.vercel.app/home').then((val)=>{
      return val.json();
  }).then((res)=>{  
   setsecrets(res);
  }).catch((err)=>{
    console.log(err);
  })
 },[])
 const likesecret=(id)=>{
  fetch('https://secret-app-delta.vercel.app/like',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "authorization":"Bearer"+localStorage.getItem('token')
    },
    body:JSON.stringify({
      secretid:id
    })
  }).then((res)=>{
    return res.json();
  }).then((val)=>{
     const newdata=secrets.map((secret)=>{
      if(secret._id==val._id){
        return val
      }
      else{
        return secret;
      }
     })
     setsecrets(newdata)
  }).catch((err)=>{
    console.log(err)
  })
}
const unlikesecret=(id)=>{
  fetch('https://secret-app-delta.vercel.app/unlike',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "authorization":"Bearer"+localStorage.getItem('token')
    },
    body:JSON.stringify({
      secretid:id
    })
  }).then((res)=>{
    return res.json();
  }).then((val)=>{
    const newdata=secrets.map((secret)=>{
      if(secret._id==val._id){
        return val;
      }
      else{
        return secret;
      }
     })
     setsecrets(newdata)
  }).catch((err)=>{
    console.log(err)
  })
}
const makecomment=(val,id)=>{
  fetch('https://secret-app-delta.vercel.app/comment',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "authorization":"Bearer"+localStorage.getItem('token')
    },
    body:JSON.stringify({
      text:val,
      secretid:id
    })
  }).then((res)=>{
    return res.json();
  }).then((val)=>{
    const newdata=secrets.map((secret)=>{
      if(secret._id==val._id){
        return val;
      }
      else{
        return secret;
      }
     })
     setsecrets(newdata)
    notifyA("Comment Posted")
  }).catch((err)=>{
    notifyB("Error occur!!!")

  })
}
  return (
    <div className='home'>
      <div className='container'>
        {secrets.map((secret, index) => (
          <StoryCard key={index} secret={secret} likesecret={likesecret} unlikesecret={unlikesecret} makecomment={makecomment} tooglecomment={tooglecomment} />
        ))}
      </div>
      {
  show &&(
    <div className="show-Comment">
  <div className="container-comment">
    <div className="postPic">
     <img src={logo} alt="" />
    </div>
    <div className="details">
      <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
      <div className="card-pic">
    <img src={profile} alt="" />
    </div>
    <h5>Sender</h5>
      </div>
      {/* comment-section */}
<div className="commentsection" style={{borderBottom:"1px solid #00000029"}}>
  {
    item.comments.map((c,k)=>{
      return (
        <p className="comm">
        <span className="commenter" style={{fontWeight:"bold"}}>Reader Comment:</span>
        <span className="commentText" style={{fontWeight:'normal'}}>{c.comment}</span>
        </p>
      )
    })
  }
  
</div>
  <div className="card-content">
   <p>{item.likes.length} Likes</p>
   <p>{item.secret}</p>
  </div>
  {/*add-comment*/}
  <div className="add-comment">
   <span className="material-symbols-outlined">sentiment_satisfied</span>
   <input type="text" placeholder='Add a comment' value={commentval} onChange={(e)=>{setcommentval(e.target.value)}}/>
   <button className='comment-btn2' onClick={()=>(makecomment(commentval,item._id), tooglecomment(item))} >Post</button>
  </div>
    </div>
  </div>
  <div className="close-comment" onClick={()=>{tooglecomment(item)}}><span class="material-symbols-outlined material-symbols-outlined-comment">close</span></div>
</div>
  )
}

    </div>
  );
};

export default Home;
