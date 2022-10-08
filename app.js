//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const posts =[];

//connect to MongoDB by specifying port to access MongoDB server
main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect('mongodb://localhost:27017/blogDB');
  }

  //create a SCHEMA that sets out the fields each document will have and their datatypes
const postsSchema = new mongoose.Schema ({
	title: String,
  content: String
})

//create a MODEL , moongse automaticaly drops capital I and make prural fruits, lodash
const Post = new mongoose.model ("Post", postsSchema)



app.get("/",function (req,res) {

    //display post by finding the posts from db

    Post.find({},function (err,foundPosts) {
         if (err) {
          console.log(err);
         }
         else
         {res.render("home",{home_content: homeStartingContent, messagesPost: foundPosts});}
    })
 
 
});

app.get("/about",function (req,res) {
  res.render("about",{about_content: aboutContent});
});

app.get("/contact",function (req,res) {
  res.render("contact",{contact_content: contactContent});
});

app.get("/compose",function (req,res) {

  res.render("compose");
});


//routing parameter
app.get("/posts/:postId",function (req,res) {
  const PostId=req.params.postId;
  
  // posts.forEach(post => {
  //   console.log(post.title);
  //   const storedTitle= _.lowerCase(post.title);
  //   if (storedTitle===postTitle) {
         
        //display post on new page]
        Post.findOne({_id: PostId},function (err,post) {
          res.render("post",{post: post});

        })
    
  //   }

  // });
});

app.post("/compose",function (req,res) {

    const postTitle=req.body.postTitle;
    console.log(req.body.postBody);
    const postContent=req.body.postBody;

   
//create a DOCUMENT
const post = new Post ({
	title: postTitle,
  content: postContent
})
    post.save(function (err) {
      if (!err) {
        res.redirect("/");
      }
    });
   

});

app.post("/delete", function(req,res){

  const idDelete= req.body.button;
  
  
  
  
  
  Post.findByIdAndRemove(idDelete,function(err){
  
    if(!err){
  
      console.log("successfully deleted");
  
    }
  
    res.redirect("/");
  
  });
  
  
  
  });
  
  
  
  

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
