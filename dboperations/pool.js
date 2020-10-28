var mysql = require('mysql');
// connect to the db
// dbConnectionInfo = {
//     connectionLimit: 5,
//     host: 'jaap3.mioot.com',
//     user: 'mioot',
//     password: 'zxc*1234', 
//     database: 'jaap3_mioot'
// };

dbConnectionInfo = {
  connectionLimit: 5,
  host: 'appdb.mioot.com',
  user: 'mioot',
  password: 'Zxc*1234', 
  database: 'check_verify'
};

//create mysql connection pool
var dbconnection = mysql.createPool(
    dbConnectionInfo
  );

// Attempt to catch disconnects 
dbconnection.on('connection', function (connection) {
    console.log('DB Connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
  
  });
  
  
module.exports = dbconnection;
