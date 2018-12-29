// const express = require ("express");
// var app =  express();


// class Main{
//     constructor(){
//         app.get('/',function(req,res){
    
//             res.send("hello world");
//         })
        
//         app.listen(3000);
//     }
    

    
// }

var express=require('express');
let control = require('./controller.js');
let jsonparse = require('./jsonParse.js');
var app=express();


var controller = new control();
var jsonToParse = new jsonparse();
app.get('/',function(req,res)
{
    res.send("Hello world");
});

app.get('/Upload',function(req,res)
{
   res.send(req.params);
});
app.get('/login',(req,res)=>{
    res.send({username:'pavan',password:'123456'})
})

app.get('/admin',(req,res)=>{
  controller.logger();  
})

app.post('/register',(req,res)=>{
    var responseData =controller.registercontrol(req);
        res.send({register:responseData});
})

app.get('/connect',(req,res)=>{
   var responseDisplay =  controller.connectController();
   console.log(responseDisplay);
    res.send(responseDisplay);
})

app.post('/addproducts',(req,res)=>{
   var jsonData = jsonToParse.parseJson(req); 
   controller.addProducts(jsonData);
})
var server=app.listen(3000,function() {});

