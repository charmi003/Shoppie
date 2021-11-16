const express=require("express");
const env=require("./config/environment");
const port=env.port;
const expressLayouts=require("express-ejs-layouts");
const axios=require("axios");
const customMiddleWares=require("./config/middleware");


//firing the express app
const app=express();

//path for static files
app.use(express.static("./assets/"))

//for decoding the form data
app.use(express.urlencoded());

//for flash messages
const flash=require("connect-flash");


//tell the app to use the layout
app.use(expressLayouts);

//setting up the view engine
app.set("view engine","ejs");
app.set("views","./views");

//extracting styles and scripts
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//connecting to the database
const db=require("./config/mongoose");

//for authentication useing passport
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");

//express-session is needed for session-cookie
const session=require("express-session");

//user will be signed out if the server restarts, so store the session cookie in the DB, need connect-mongo for that
const MongoDbStore=require("connect-mongo");


//middleware that takes the session cookie and encrypts it
app.use(session({
    name:"shoppie",
    secret:env.session_cookie_secret_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:30*60*1000,   //maxage is in milliseconds
    },
    store: MongoDbStore.create({           //using mongoDbStore to store the session cookie in the DB
        mongoUrl: env.mongoUrl
    })

}))


//after the session cookie since flash messages are stored in session cookie
app.use(flash());
app.use(customMiddleWares.setFlash);



//ask the app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//sending all the requests with / being the root to routes/index.js
app.use("/",require("./routes/index"));
app.use("/users",express.static("./assets"));
app.use("/cart",express.static("./assets"));




app.listen(port,(err)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(`Shoppie is up and running on port ${port}!!`)
})




