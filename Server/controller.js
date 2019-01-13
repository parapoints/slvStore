'use strict';
let rxjs = require('rxjs');
const fs = require('fs');
let commondao = require("./commonDao.js");

var common = new commondao();

module.exports = class Controller {
    constructor(){

    }
    logger(){
        console.log("Inside Controller")
    }

    registercontrol(registerData){
        return registerData;
    }

    connectController(){
      var message =  common.connectToDB();
      console.log(message);
      return message;
    }

    uploadImageFiles(req){
    const observabele  = new rxjs.Observable(observer=>{
        console.log(req);
        if (req.file) {
            console.log('Uploading file...');
            var filename = req.file.filename;
            var  originalFilename = req.file.originalname.split('.');
            return req.file;
           
            
            // var uploadStatus = 'File Uploaded Successfully';
        } else {
            console.log('No File Uploaded');
            // var filename = 'FILE NOT UPLOADED';
            // var uploadStatus = 'File Upload Failed';
        }
        

    })  

return observabele;
}



}

