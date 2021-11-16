const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("../models/user");

//asking the passport to use the lcoal strategy
passport.use(new LocalStrategy({
    usernameField:"Email",
    passwordField:"Password",
    passReqToCallback:true,
    },
    function(req,Email, Password, done) {
      User.findOne({ Email:Email }, function (err, user) {
        if (err) { return done(err); }

        if (!user) { req.flash("error","Invalid Email Or Password!"); return done(null, false); }

        if(user.Password!=Password) { req.flash("error","Invalid Email Or Password!"); return done(null,false); }
        
        req.flash("success","Signed In Successfully!")
        return done(null,user);
        
      });
    }
));


// serializing:-put the user_id into cookie
// deserializing:-using the user_id from the cookie and finduser using that

//serializing the user
passport.serializeUser(function(user,done){
    done(null,user._id);
})

//deserializing the user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)  { return done(err); }
        return done(null,user);
    })

})


//middleware to check if the user is authenticated
passport.checkAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }

    return res.redirect("/users/sign-in");
}


//sending the user to locals for views
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated)
        res.locals.user=req.user;
        
    return next();
}



module.exports=passport;