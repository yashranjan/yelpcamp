var express=require("express");
var router=express.Router();
var User = require("../models/user.js");
var passport = require("passport");

router.get("/",function(req,res){
    res.render("landingPage");
});

//======================================
// AUTHENTICATION ROUTES
//======================================

//REGISTER ROUTE
router.get("/register", function(req, res){
   res.render("register"); 
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register",{"error":err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YELPCamp "+user.username+" !");
            res.redirect("/campgrounds"); 
        });
    });
});

//LOGIN ROUTE
router.get("/login", function(req, res){
	res.render("login"); 
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Logged you out!");
   res.redirect("/campgrounds");
});

module.exports=router;