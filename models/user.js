const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String,
    },
    Password:{
        type:String,
    },
    Orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]
},{
    timestamps:true
})


const User=mongoose.model("User",userSchema);

module.exports=User;