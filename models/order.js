const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    Product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Quantity:{
        type:Number
    }
},{
    timestamps:true
})


const Order=mongoose.model("Order",orderSchema);

module.exports=Order;