var mongoose=require("mongoose");
var campground=require("./models/campground.js");
var Comment=require("./models/comment.js");

var data=[
	{
		name:"Yash Ranjan",
		image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg",
		description:"This is a very awesome place to live"
	},
	{
		name:"Abhishek",
		image:"https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197__340.jpg",
		description:"This is another awesome place to live although not too good as compared to the previous one"
	},
	{
		name:"Yogesh",
		image:"https://cdn.pixabay.com/photo/2017/07/17/16/21/turkey-2512944__340.jpg",
		description:"This is the worst place to live as it doesn't have proper facilities"
	}
];
function seedDB(){
	//REMOVE ALL CAMPGROUNDS
	// campground.remove({},function(err){
	// 	if(err)
	// 		console.log(err);
	// 	else{
	// 		console.log("Campgrounds have been removed");
	// 		data.forEach(function(seed){
	// 			campground.create(seed,function(err,camp){
	// 				if(err){
	// 					console.log(err);
	// 				}
	// 				else{
	// 					console.log("Added a campground");
						//CREATE A COMMENT
					// 	Comment.create({
					// 		text:"This place is great, but I wish there was internet.",
					// 		author:"Holmes"
					// 	},function(err,comment){
					// 		if(err)
					// 			console.log(err);
					// 		else{
					// 			camp.comments.push(comment);
					// 			camp.save();
					// 			console.log("Created new comment");
					// 		}
					// 	})					
// 					}
// 				})
// 			})
// 		}
// 	});
}

module.exports=seedDB;