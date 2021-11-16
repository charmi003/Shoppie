const express=require("express");
const router=express.Router();
const users_controller=require("../controllers/users_controller");
const passport=require("passport");

router.get("/sign-up",users_controller.signUp);

router.get("/sign-in",users_controller.signIn);

router.post("/sign-up/form",users_controller.signUpForm);

router.post("/sign-in/form",passport.authenticate("local",{
    failureRedirect:"/users/sign-in"
}),users_controller.signInForm)


router.get("/sign-out",users_controller.signOut);

module.exports=router;