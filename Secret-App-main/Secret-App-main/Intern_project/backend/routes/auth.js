const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const user=require('../schema/user.js')
const secret_model=require('../schema/secret.js')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const requirelogin=require('../middleware/requirelogin.js')
const key = require('../secretkey/tokenkey.js');
router.post('/signup',(req,res)=>{
   const  {name,username,email,password}=req.body;
   if(!name||!email||!username||!password){
   return res.json({error:"Fill all Feilds"});
   }
  user.findOne({email:email}).then((detail)=>{
     if(detail){
      return res.json({error:'User Already Registered'})
     }
     bcrypt.hash(password,3).then((hashpass)=>{
      user.insertMany({name:name,email:email,username:username,password:hashpass}).then(()=>{
        
          return res.json({message:"Registered Successfully"})
         }).catch(()=>{
          return res.json({error:"Error occur"})
         }) 
  }).catch(()=>{
     return res.json({error:"Error Occur"});
    })
  }).catch((err)=>{
     console.log('error')
  })
  
   
})
router.post('/login',(req,res)=>{
    const  {email,password}=req.body;
    if(!email||!password){
    return res.json({error:"Fill all Feilds"});
    }
    user.findOne({email:email})
        .then((detail)=>{
       if(!detail){
       return res.json({error:'Invalid Email'})
       }
       bcrypt.compare(password,detail.password).then((val)=>{
        if(!val){
            return res.status(422).json({error:"Invalid Password"})
        }
        else{
            const token=jwt.sign({_id:detail._id},key);
            const datasend={
               message:'Login Successfully',
               token:token,
               detail:detail
            }
           return res.status(200).json(datasend)
        }
    }).catch(()=>{
       return res.status(422).json({error:"Error Occur"})
    })
    
 }).catch(()=>{
   return res.status(422).json({error:"Error Occur"})
 })
})

router.post('/postsecret',requirelogin,(req,res)=>{
const {secret,postedby}=req.body;

if(!secret||!postedby){
  return res.json({error:'Please fill all fields'})
}

 secret_model.insertMany({secret:secret,postedby:postedby}).then(()=>{
      return res.json({message:'Posted Successfully'})
 }).catch(()=>{
   return res.json({error:'Error! try again'})
 })

})

router.get('/home',(req,res)=>{
  secret_model.find().populate('postedby').sort("-createdAt").then((val)=>{
   res.status(200).json(val);
  }).catch((err)=>{
   res.json('error');
  })
})

router.get('/profile/:id',requirelogin,(req,res)=>{
   const id=req.params.id;
   secret_model.find({postedby:id}).populate('postedby').then((val)=>{
      return res.json(val)
   }).catch((err)=>{
      return res.json('error');
   })
})

router.put('/like',requirelogin,(req,res)=>{
   secret_model.findByIdAndUpdate(req.body.secretid,{$push:{likes:req.userdata._id}},{new:true}).populate("postedby").populate("comments.postedby").then((result)=>{
           return res.status(200).json(result);
 }).catch((err)=>{
   return res.json({error:"Error"})
 })
})
router.put('/unlike',requirelogin,(req,res)=>{
   secret_model.findByIdAndUpdate(req.body.secretid,{$pull:{likes:req.userdata._id}},{new:true}).populate("postedby").populate("comments.postedby").then((result)=>{
           return res.status(200).json(result);
 }).catch((err)=>{
   return res.json({error:"Error"})
 })
})

router.put('/comment',requirelogin,(req,res)=>{
 let mess={
   comment:req.body.text,
   postedby:req.userdata._id
 }
 secret_model.findByIdAndUpdate(req.body.secretid,{$push:{comments:mess}},{new:true}).populate("postedby").populate("comments.postedby").then((result)=>{
   return res.status(200).json(result);
}).catch((err)=>{
return res.json({error:"Error"})
})
})

router.delete('/secret/:id',requirelogin,(req,res)=>{
  
   secret_model.findOne({_id:req.params.id}).then((result)=>{
    if(!result){
    return res.status(404).json({error:"Post not found!!!"})
    }
    else{
       secret_model.deleteOne({_id:req.params.id}).then((result)=>{
        return res.json({message:"Deleted Successfully"})
       }).catch((err)=>{
         res.json({error:"error occur"})
       })
     
    }
   }).catch((error)=>{console.log(error)})
 })

module.exports = router;

