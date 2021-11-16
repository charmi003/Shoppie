const express=require("express");
const router=express.Router();
const cart_controller=require("../controllers/cart_controller");
const passport=require("passport");

router.get("/",passport.checkAuthenticatedUser,cart_controller.cart);
router.get("/add-item",passport.checkAuthenticatedUser,cart_controller.addItem);
router.get("/remove-item/",passport.checkAuthenticatedUser,cart_controller.removeItem);
router.get("/update-item-quantity/",passport.checkAuthenticatedUser,cart_controller.update);


module.exports=router;