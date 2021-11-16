const express=require("express");
const router=express.Router();
const home_controller=require("../controllers/home_controller");
const passport=require("passport");


router.get("/",home_controller.home);
router.post("/payment/",passport.checkAuthenticatedUser,home_controller.payment);
router.post("/payment-complete",passport.checkAuthenticatedUser,home_controller.paymentComplete)

router.use("/users",require("./users"));
router.use("/cart",require("./cart"));


module.exports=router;