var express=require("express");
var router=express.Router();
var campground = require("../models/campground.js");
var middleware = require("../middleware/index.js");

//CAMPGROUNDS ROUTES
router.get("/",function(req,res){
	campground.find({},function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.render("campground/index",{camp:camp});		
		}
	})
});

router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
});

router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.Name;
	var price=req.body.Price;
	var imageUrl=req.body.URL;
	var desc=req.body.Description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCamp={name:name,price:price,image:imageUrl,description:desc,author:author};
	campground.create(newCamp,function(err,camp){
		if(err)
			console.log(err);
		else{
			console.log("New object added.");
			res.redirect("/campgrounds");
		}
	});
});

router.get("/:id",function(req,res){
	campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
		if(err)
			console.log(err);
		else{
			res.render("campground/show",{camp:foundCamp});
		}
	});
});

router.get("/:id/edit",middleware.checkUser,function(req,res){
	campground.findById(req.params.id,function(err,foundCamp){
		res.render("campground/edit",{camp:foundCamp});
	});		
});

router.put("/:id",middleware.checkUser,function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.Camp,function(err,updatedCamp){
		res.redirect("/campgrounds/"+req.params.id);
	});
});

router.delete("/:id",middleware.checkUser,function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		res.redirect("/campgrounds");
	});
});

module.exports=router;