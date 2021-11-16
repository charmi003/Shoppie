const Product=require("../models/product");
const User=require("../models/user");
const Order=require("../models/order");
const env=require("../config/environment");

module.exports.home=async function(req,res){
    
    try{
        let products=await Product.find({});
        return res.render("home",{
            products:products
        });

    }catch(err){
        req.flash("error","ERROR!");
        return res.redirect("back");
    }
}



const Razorpay=require("razorpay");
const razorpay=new Razorpay({
    key_id:env.rz_key_id,
    key_secret:env.rz_key_secret
})

module.exports.payment=async function(req,res)
{
    try
    {
        var options = {
        amount: req.query.total*100,  // amount in the smallest currency unit
        currency: "INR",
        };
        razorpay.orders.create(options,(err,order)=>{
            res.json({
                order:order,
                key:env.rz_key_id
            });
        })

    }
    catch(err)
    {
        req.flash("error","ERROR!");
        return res.redirect("back");
    }
   
}

module.exports.paymentComplete=async function(req,res)
{       
    try
    {
        await Order.deleteMany( { _id:{$in:req.user.Orders} } );
        let l=req.user.Orders.length;
        req.user.Orders.splice(0,l);
        await req.user.save();
        req.flash("success","Payment Successful!")
        return res.redirect("/");
    }
    catch(err)
    {
        req.flash("error","ERROR!");
        return res.redirect("back");
    }
        
}

