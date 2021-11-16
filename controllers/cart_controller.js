const Product=require("../models/product");
const User=require("../models/user");
const Order=require("../models/order");


//Action to display the cart
module.exports.cart=async function(req,res){
    try{
        await req.user.populate({
            path:"Orders",
            populate:{
                path:"Product"
            }
        }).execPopulate();
        return res.render("cart");
    }
    catch(err)
    {
        req.flash("error","ERROR!");
        return res.redirect("back");
    }
    
}


//Action to add an item to the cart
module.exports.addItem=async function(req,res){

    try
    {
        let check=true;
        if(!req.user)
        {   
            check=false;
            req.flash("error","Sign In To Shop!");
            return res.redirect("back");
        }
        let prod=await Product.findById(req.query.product);
        await req.user.populate("Orders").execPopulate();
        let order_found=req.user.Orders.find(x => x.Product==prod.id);

        if(order_found==undefined)   //the user has not made any order on this product yet
        {
            let new_order=new Order({
                Product:prod._id,
                User:req.user._id,
                Quantity:1
            })

            let new_order_created=await new_order.save();
            req.user.Orders.push(new_order_created._id);
            await req.user.save();
        }
        else   //the user has already placed an order on this product
        {
            await Order.findByIdAndUpdate(order_found._id,{$inc : {'Quantity' : 1}})
        }

        if(req.xhr)
        {
            return res.status(200).json({
                user:check,
                message:"Item Added To The Cart!"
            })

        }
        req.flash("success","Item Added To The Cart!")
        return res.redirect("/");
    }
    catch(err)
    {
        req.flash("error","ERROR!");
        return res.redirect("back");
    }
}



//Action to remove an item from the cart
module.exports.removeItem=async function(req,res)
{
    try
    {
        let o_id=req.query.order;
        await Order.findByIdAndDelete(o_id);
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{Orders:o_id}
        })
        req.flash("success","Item Removed!");
        return res.redirect("back");
    }
    catch(err)
    {
        req.flash("error","ERROR!");
        return res.redirect("back");
    }
  
}



//Action to update the item's quantity in the cart
module.exports.update=async function(req,res){
    try
    {
        let o_id=req.query.order;
        let qty=req.query.qty;

        let updated_order=await Order.findByIdAndUpdate(o_id,{
            Quantity:qty
        })

        return res.status(200).json({
            updated_order:updated_order,
            message:"Quantity Updated!"
        });
    }
    catch(err)
    {
        req.flash("error","ERROR!");
        return res.redirect("back");
    }

}