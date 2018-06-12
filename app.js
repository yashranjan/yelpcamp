var express   			  = require("express"),
	bodyParser 			  = require("body-parser"),
	app		  			  = express(),
	mongoose  			  = require("mongoose"),
	flash				  = require("connect-flash"),
	passport  			  = require("passport"),
	localStrategy		  = require("passport-local"),
	methodOverride		  = require("method-override"),
	passportLocalMongoose = require("passport-local-mongoose"),
	campground 		      = require("./models/campground.js"),
	comment   			  = require("./models/comment.js"),
	User  				  = require("./models/user.js"),
	seedDB    			  = require("./seed.js");

//REQUIRING ROUTES
var commentRoutes 	 = require(__dirname+"/routes/comments.js"),
	campgroundRoutes = require(__dirname+"/routes/campgrounds.js"),
	authRoutes 		 = require(__dirname+"/routes/auth.js");

mongoose.connect("mongodb://localhost/YelpCamp");	
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment=require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Yash is a human being",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use(authRoutes);
app.use("/campgrounds/:id/comments/",commentRoutes);
app.use("/campgrounds/",campgroundRoutes);

seedDB();	

app.listen(3000,function(){
	console.log("Yelp camp started.");
});