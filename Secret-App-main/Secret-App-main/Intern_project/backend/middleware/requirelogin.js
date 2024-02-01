const jwt=require('jsonwebtoken');
const key=require('../secretkey/tokenkey.js')
const mongoose=require('mongoose');
const user=require('../schema/user.js')
const requirelogin=(req,res,next)=>{
    
    const {authorization}=req.headers;
    if(!authorization){
        res.json({error:'You must sign in before'});
    }
    const token=authorization.replace("Bearer","");
    jwt.verify(token,key,(err,payload)=>{
        if(err){
            console.log(err);
            res.json({error:'Error Occur'});
            return;
        }
        const _id=payload;
        user.findById(_id).then((userdata)=>{
            req.userdata=userdata;
            next();
          })
      
    })


}

module.exports=requirelogin;