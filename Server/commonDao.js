const mysql =  require ("mysql");


module.exports = class CommonDAO{
    constructor(){

    }

    connectToDB(){
        var flag = false;
        var con = mysql.createConnection({
            host:"localhost",
            port:"3306",
            user:"root",
            password:"1111",
            database : "slvstore"
        });
        con.connect((err)=>{
         if(err){
             throw err;
             flag = false;
         }
         else{
            console.log("connected");
            flag = true;
         }
         
        });
        while (!flag) {
            require('deasync').runLoopOnce();
        }
        return con;
    }
    
    insertAdmin(admin){ 
        
        this.connectToDB(); //connect to mysql database
    
    }

    insertProducts(prod){
        var connected = this.connectToDB();//.connect to mysql database
        if(connected == true){
            
        }
    }


    inportCSV(data){
        var flag = false;
        var connection = this.connectToDB();//.connect to mysql database
       // if(connection == true){
            var query = connection.query('INSERT INTO product_catalog  VALUES ?', [data], (error, response) => {
                if(error){
                    console.log(error);
                   throw error;
                } 
                else{
                    flag = true;
                }
                });
                while (!flag) {
                    require('deasync').runLoopOnce();
                }
                return flag;
        }

    

}
