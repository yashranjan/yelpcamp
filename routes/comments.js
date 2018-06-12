var express = require("express");
var router = express.Router({mergeParams:true});
var campground = require("../models/campground.js");
var comment = require("../models/comment.js");
var middleware = require("../middleware/index.js");

// ========================================
// COMMENT ROUTE
// ========================================
router.get("/new",middleware.isLoggedIn,function(req,res){
	campground.findById(req.params.id,function(err,foundCamp){
		if(err)
			console.log(err);
		else
			res.render("comment/new",{camp:foundCamp});		
	})	
});

router.post("/",middleware.isLoggedIn,function(req,res){
	campground.findById(req.params.id,function(err,foundCamp){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			comment.create(req.body.comment,function(err,comments){
				if(err){
					console.log(err);
					req.flash("error","Something went wrong!");
					res.redirect("back");
				}
				else{
					comments.author.id=req.user._id;
					comments.author.username=req.user.username;
					comments.save();
					foundCamp.comments.push(comments);
					foundCamp.save();
					req.flash("success","Succefully added comment!");
					res.redirect("/campgrounds/"+foundCamp._id);
				}
			})
		}
	})
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	campground.findById(req.params.id,function(err,foundCamp){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			comment.findById(req.params.comment_id,function(err,foundComment){
				if(err){
					console.log(err);
					res.redirect("back");
				}else{
					res.render("comment/edit",{camp:foundCamp,comment:foundComment});
				}
			});
		}
	});
});

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			req.flash("success","Succefully deleted comment!");
			res.redirect("back");
		}
	});
});

module.exports=router;