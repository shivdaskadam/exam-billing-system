var express    = require("express");
var app        =express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var methodoverride= require("method-override");
var flash        =   require("connect-flash");
var user    = require("./models/user");
var seedDB    = require("./seed");
var passport = require("passport");
var localStatergy= require("passport-local");

var indexroute=require("./Routes/index"),
    staffroute=require("./Routes/staff"),
    teacherroute=require("./Routes/teacher"),
    authentroute=require("./Routes/authent"),
    rateroute=require("./Routes/rates");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(flash());
app.use(require("express-session")({
    secret :"this is my secret",   
    resave :false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodoverride("_method"));
passport.use(new localStatergy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

mongoose.connect("mongodb://localhost/Myproject", { useNewUrlParser: true });


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

//seedDB();
//seedNorm();
app.use("/",authentroute);
app.use("/",rateroute);
app.use("/",indexroute);
app.use("/",teacherroute);
app.use("/",staffroute);



const port = process.env.PORT || 3000;
app.listen(port,process.env.IP,function(){
    
    console.log("ok");
});
