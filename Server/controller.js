'use strict';
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


}

