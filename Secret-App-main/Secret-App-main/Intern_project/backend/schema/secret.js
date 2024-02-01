const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const postschema=new mongoose.Schema({
    secret:{
        type:String,
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        comment:{type:String},
        postedby:{type:ObjectId,ref:"User"},
        
    }],
    postedby:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const secret=mongoose.model('Secret',postschema)

module.exports=secret;