const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Image:{
        type:String
    },
    Description:{
        type:String
    },
    Price:{
        type:Number
    }
},{
    timestamps:true
})


const Product=mongoose.model("Product",productSchema);

module.exports=Product;