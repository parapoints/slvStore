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

// require 3rd party library
var express=require('express');
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

// require own library
let control = require('./controller.js');
let jsonparse = require('./jsonParse.js');
let importcsv = require('./importcsv.js');
let enums = require('./enums');
var importCSV = new importcsv();
var app =  express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var controller = new control();
var jsonToParse = new jsonparse();
var mainenum = new enums();
app.get('/',function(req,res)
{
    res.send(mainenum.getValue('SeasonCode'));
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

// sample csv upload code
app.post('/Upload', upload.single('myFile'), function (req, res, next) {
    console.log(req.file);
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var  originalFilename = req.file.originalname.split('.');
        if((originalFilename[1] == 'csv')){
            importCSV.importcsv(filename);
        }
        // var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        // var filename = 'FILE NOT UPLOADED';
        // var uploadStatus = 'File Upload Failed';
    }
  })


function parseFile(req, res, next){
    var filePath = req.files.file.path;
    console.log(filePath);
}
var server=app.listen(3000,function() {});

