const User=require("../models/user");


//Action to render the sign up page
module.exports.signUp=function(req,res){
    return res.render("sign_up");
}

//action to render the sign in page
module.exports.signIn=function(req,res){
    return res.render("sign_in");
}


//Action to fetch the sign up form data
module.exports.signUpForm=async function(req,res){

    try{
        //check, password and confirm password should match
        if(req.body.Password!=req.body.Confirm_password)
        {
            req.flash("error","Passowrds didn't match!");
            return res.redirect("back");
        }

        //check if any user already exists with this email
        let user_found=await User.findOne({Email:req.body.Email});
        if(user_found)
        {
            req.flash("error","Email already taken!");
            return res.redirect("back");
        }

        //create a user with this credentials
        let new_user=new User(req.body);
        await new_user.save();

        return res.redirect("/users/sign-in")

    }catch(err){
        req.flash("error","ERROR!");
        return res.redirect("back");

    }
}




//Action fetch the sign in form data
module.exports.signInForm=function(req,res){
    return res.redirect("/");
}



//Action for signing out the user
module.exports.signOut=function(req,res){
    req.logout();
    req.flash("success","Signed Out Successfully!");
    return res.redirect("/");
}