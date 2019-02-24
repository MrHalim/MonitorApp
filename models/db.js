/* jshint esversion:6*/
const sql = require('mysql');

const connection = sql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'dhtmonapp'
});

connection.connect();
// connection.query('SELECT 1 + 1 AS solution', 
// function(err, res, fields){
//     if (err) throw err;
//     console.log('the result is :', res[0].solution);    
//     }

// );


module.exports = connection;