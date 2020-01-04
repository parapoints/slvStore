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

var express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');
const emailservice = require('./EmailService.js')

const imageupload = multer({dest: './Assets/ProductImages/'})
let commondao = require("./commonDao.js");
// require own library
let control = require('./controller.js');
let jsonparse = require('./jsonParse.js');
let importcsv = require('./importcsv.js');
const bodyParser = require('body-parser')
let enums = require('./enums');
let path = require('path');
var unzip = require('unzipper');
util = require('util');
var importCSV = new importcsv();
var app = express();
var extract = require('extract-zip')
var cors = require('cors')
app.use(express.json());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/akshatag145/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})
var controller = new control();
var jsonToParse = new jsonparse();
var mainenum = new enums();
var injectable = require('./Services/OtpService');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './home/pavan/uploads')
//     },
//     filename: function (req, file, cb) {
//       let extArray = file.mimetype.split("/");
//       let extension = extArray[extArray.length - 1];
//       cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
//     }
//   })
//   const upload = multer({ storage: storage })
app.get('/', function (req, res) {
    if (req.query.url != undefined) {

        console.log(req.body);
        let localpath = req.query.url.toString();
        console.log(localpath);
        res.writeHead(200, 'image/jpeg');
        fs.createReadStream(localpath).pipe(res);

    } else {
        console.log(req.body);
        let localpath = req.query.recurl.toString();
        console.log(localpath);
        res.writeHead(200, 'image/mpeg');
        fs.createReadStream(localpath).pipe(res);
    }

    // res.send(mainenum.getValue('SeasonCode'));
});
app.get('/login', (req, res) => {
    res.send({username: 'pavan', password: '123456'})
})

app.get('/admin', (req, res) => {
    controller.logger();
})

app.post('/register', (req, res) => {
    var responseData = controller.registercontrol(req);
    res.send({register: responseData});
})

app.get('/connect', (req, res) => {
    var responseDisplay = controller.connectController();
    console.log(responseDisplay);
    res.send(responseDisplay);
})

app.post('/addproducts', (req, res) => {
    var jsonData = jsonToParse.parseJson(req);
    controller.addProducts(jsonData);
})

// sample csv upload code
app.post('/Upload', upload.array('myFile', 12), function (req, res, next) {
    console.log(req.files);
    if (req.files.length > 0) {

        var arrayfiles = [];
        req.files.forEach(function (file) {
            console.log('Uploading file...');
            arrayfiles.push({url: '/home/akshatag145/images/' + file.filename})
        })
        res.send(arrayfiles);

        // res.send({
        //     requestcommand:"uploadCsv",
        //      argsList:[{
        //         name:"status",
        //         value:true,
        //         type:uploaded
        //     }]
        // })

        // var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        // var filename = 'FILE NOT UPLOADED';
        // var uploadStatus = 'File Upload Failed';
    }
})
app.post('/putProducts', function (req, res) {
    console.log(req);
    console.log(req.body.products);
    controller.putProducts(req.body.products).then(function (rows) {
        res.send(rows);
    })
})
app.post('/UploadImage', imageupload.single('imagefile'), (req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var imagepath = req.file.filename;
        res.send(req.headers.host + '/Assets/ProductImages' + imagepath + '.jpeg')

        // var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        // var filename = 'FILE NOT UPLOADED';
        // var uploadStatus = 'File Upload Failed';
    }


})

app.post('/requestToken',function(req,res){
      var service = new injectable();
     service.authToken(req.body.token).then(function(token){
       if(token.success === 'true'){
         res.send(JSON.stringify(token));
       }
       else{
         res.send('something went wrong')
       }
     })
})

app.post('/registerUser',function(req,res){
    common.insertUser(req.body.user).then(function(err,user){
      res.send(user);
    })
})
app.post('/sendOTP',function(req,res){
      var service = new injectable();
      console.log(req.body.user);
      service.registerUser(req.body.user).then(function(reg){

        if(reg.success === true){
            console.log("res"+reg);
          res.send(JSON.stringify(reg));
        }
        else{
          res.send('something went wrong')
        }
      })
     })

app.get('/getCategories', function (req, res) {
        var common  = new commondao();
    common.getCategories().then(function (rows) {
        res.send(rows);
    })
})


app.post('/getProductsByCategory', (req, res) => {
    console.log(req + "request got");
    var response = controller.fetchproducts_by_category(req).then(prod => {
        res.send(prod);
    });

    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

}) //getproducts
app.get('/getProducts', (req, res) => {
    var response = controller.fetchproducts().then(prod => {
        res.send(prod);
    });
    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

}) //getproducts

app.get('/getRecordings', (req, res) => {
    let common = new commondao();
    common.getRecordings().then(resp => {
        res.send(resp);
    })

    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

}) //getproducts
app.get('/getEmployee', (req, res) => {
    let common = new commondao();
    common.getEmployee().then(resp => {
        res.send(resp);
    })

    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

}) //getproducts

app.post('/updateProducts', (req, res) => {
    let common = new commondao();
    controller.updateProducts(req).then(resp => {
        res.send(resp);
    })

    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

}) //getproducts


app.get('/getWhatapp', (req, res) => {
    let common = new commondao();
    common.getWhatsApp().then(resp => {
        res.send(resp);
    })

    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

}) //getproducts


// app.get('/getRecordings',(req,res=>{

// }))

app.get('/streamrecord', (req, res) => {
    console.log(req.body.url);
//    let localpath =  path.join(__dirname,'music.mp3');

    let localpath = "/home/pavan/Desktop/music1.mp3";


    res.writeHead(200, 'audio/mpeg');
    fs.createReadStream(localpath).pipe(res);

    // var readStream = fs.createReadStream(req.query.url);
    // // We replaced all the event handlers with a simple call to util.pump()
    // readStream.pipe(res);
    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

})
app.get('/streamimage', (req, res) => {
    console.log(req.body);
    let localpath = path.join(__dirname, '');
    console.log(localpath);

    res.writeHead(200, 'image/jpeg');
    fs.createReadStream(localpath).pipe(res);

    // var readStream = fs.createReadStream(req.query.url);
    // // We replaced all the event handlers with a simple call to util.pump()
    // readStream.pipe(res);
    // var result = controller.fetchproducts().subscribe(x=>{
    //    res.send(x);
    // })

})


function getEmployee(req, res) {

}

function parseFile(req, res, next) {
    var filePath = req.files.file.path;
    console.log(filePath);

}

//sendMail
app.post('/sendmail',(req,res) =>{
    console.log();
    let emailservice = new emailservice()
    //emailservice.sendMail()
})
//email,body
//parsed.email.emailid, parsed.body

var server = app.listen(3002, function () {
});
