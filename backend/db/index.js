const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'sudhamsh',
    database : 'EventAppDB'

});

mysqlConnection.connect((err)=>{
    if(!err)
       console.log("database connected");
    else
       console.log("Could not connect to database!!"+err);
})

module.exports = mysqlConnection;