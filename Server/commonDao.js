const sql =  require ("mysql");


module.exports = class CommonDAO{
    constructor(){

    }

    connectToDB(){
        var con = sql.createConnection({
            host:"localhost",
            user:"root",
            password:"1111"
        })
        con.connect((err)=>{
         if(err){
             throw err;
             return false;

         }
         console.log("connected");
         

        })
        return true;
    }
    
    insertAdmin(admin){
        
        this.connectToDB(); //connect to mysql database
    
    }

    insertProducts(prod){
        var connected = this.connectToDB();//.connect to mysql database
        if(connected == true){
            
        }
    }





}
