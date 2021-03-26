const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const Blog = require("./models/blog");
const ejs = require("ejs");


const app = express();

// ! Connecting to DB !
const URL = "mongodb+srv://vidar_29:SANYOGNOAH29@node-with-db.00ylb.mongodb.net/sanyog-blog?retryWrites=true&w=majority";
mongoose.connect(URL,{ useNewUrlParser: true })
.then((result) => console.log("Connected to DB"))
.catch((err) => console.log(err))


app.use(express.static('public'));

// ! Setting up ejs view engine
app.set("view engine","ejs");

// !For using input from form
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// ! To show all blogs !
app.get("/",function(req,res){
    Blog.find().sort({ createdAt: -1 })
     .then((result) => {
         res.render("index",{Blogdata: result})
     })
     .catch((err) => {
         console.log(err);
     })
})

// ! For displaying the content for editing !
app.get("/:id/edit",function(req,res){
    const id = req.params.id;
    //  Blog.findById(id)
    Blog.findOne({_id: id})
     .then((result) => {
         res.render("edit",{blog: result});
     })
     .catch((err) => {
         console.log(err);
     });
})


// ! To save the blogs and redirect it to index and show it there !
app.post("/",function(req,res){
    const blog = new Blog(req.body);
    blog.save()
     .then((result) => {
         res.redirect("/");
     })
     .catch((err) => {
         console.log(err);
     });
})
// ! To view particular blog !
app.get("/blog/:id",function(req,res){
    const id = req.params.id;
    Blog.findById(id)
     .then((result) => {
         res.render("details",{blog: result});
     })
     .catch((err) => {
         console.log(err);
     }); 
})



// ! Saving the edits and redirecting !
app.post("/:id",function(req,res){
    const id = req.params.id;
    Blog.findOneAndUpdate({ _id: id},req.body).then(function(){
    Blog.findOne({_id: id}).then(function(Blog){ 
      res.redirect("/"); 
      });
    });
})

// ! For delete !
app.delete("/blog/:id",function(req,res){
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
     .then(function(result){
         res.json({redirect: "/"});
     })
     .catch(function(err){
         console.log(err);
     });
})

//  ! For creating !
app.get("/create",function(req,res){
    res.render("create");
})

app.listen(3000,function(){
    console.log("Server started at port 5000");
})
