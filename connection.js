const mysql= require('mysql');

var mysqlconnection = mysql.createConnection({
    host :'localhost',
    user :'root',
    password :'root',
    database : 'contactdb'
})

mysqlconnection.connect((err)=>{
    if(err)
    {
      console.log("error in db connection"+JSON.stringify(err,undefined,2));
    }
    else{
      console.log("succesfully db connection");
    }
})

module.exports=mysqlconnection;