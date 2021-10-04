//jshint esversion:6
const express = require('express');
const bodyParser=require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB',{
    useNewUrlParser:true
});

const artclsSchema={
    title:String,
    content:String
}
const Article=mongoose.model("Article",artclsSchema)
app.get("/articles",(req,res)=>{
Article.find(function(err,result){
   if(!err){
       res.send(result)
   }else{
       res.send(err);
   }
})
})
app.post("/articles",(req,res)=>{
    // console.log(req.body.title),
    // console.log(req.body.content)
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content,
    })
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully registered");
        }
        else {
            res.send(err);
        }
    });
    
})
app.delete("/articles",(req, res)=>{
    Article.deleteMany(function(err){
        if(!err){
            console.log("Successfully deleted");
        }
        else{
            console.log(err);
        }
    })
})
const Port=3000;
app.listen(Port, function(){
    console.log("Server started on port"+Port);
})