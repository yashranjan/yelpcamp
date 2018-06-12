var comment = require("../models/comment.js");
var campground = require("../models/campground.js");

//All the middleware
var  middlewareObj={};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated())
        return next();
    req.flash("error","You need to log-in first in order to do that!!");
    res.redirect("/login");
};

middlewareObj.checkUser = function(req,res,next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id,function(err,foundCamp){
		if(err||!foundCamp){
			console.log(err);
			req.flash("error","campground not found!");
			res.redirect("back");
		}else{
			if(foundCamp.author.id.equals(req.user._id)){
				next();		
			}else{
				req.flash("error","You don't have permission to do that!");
				res.redirect("back");
			}
			}
		});	
	}else{
		req.flash("error","You need to log-in first in order to do that!!");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
			req.flash("error","campground not found!");
			res.redirect("back");
		}else{
			if(foundComment.author.id.equals(req.user._id)){
				next();		
			}else{
				req.flash("error","You don't have permission to do that!");
				res.redirect("back");
			}
			}
		});	
	}else{
		req.flash("error","You need to log-in first in order to do that!!");
		res.redirect("back");
	}
};

module.exports = middlewareObj;