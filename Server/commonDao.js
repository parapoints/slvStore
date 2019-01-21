const mysql =  require ("mysql");

let rxjs = require('rxjs');

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

        select_products(observe){
            console.log('inside select produts')
            var connection = this.connectToDB(); // connect to mysql database;
          
        //               var query = connection.query('select * from  product_catalog ',(error,res)=>{
        //         if(error){
        //             return error
        //         }
        //         else{
        //             console.log(res);
            
        //             observe.next(res);
        //                 // console.log(res);
                        
                    
        //         }
          
        
        // })
        var sql = "select * from product_catalog";
        return new Promise( ( resolve, reject ) => {
            connection.query( sql,( err, rows ) => {
                if ( err )
                    return reject( err );
                    // console.log(rows);
                resolve( rows );
            } );
        } );
           
        }


    

}
