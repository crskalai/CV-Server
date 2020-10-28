// var mysql = require('mysql');

const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'appdb.mioot.com',
  user: 'mioot',
  password: 'Zxc*1234', 
  database: 'check_verify'
});

app.all('/*', function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    if (request.method == 'OPTIONS') {
          response.status(200).end();
    } else {
          next();
    }
});






//app.get('/api/login/:name/:pass/:pId',(req, res) => {
  app.get('/api/login/:user_name/:password',(req, res) => {
    let sql = "SELECT count(*) as total FROM user_details  where user_name='"+req.params.user_name + "' and password='" +req.params.password+ "'";// and partner_id=" + req.params.pId;
    //let sql = "SELECT count(*) as total FROM user_details  where user_name='"+req.params.name + "'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
    var result;
    var rows = JSON.parse(JSON.stringify(results[0]));
    console.log(rows.total);
    if(rows.total == 1)
    {
        result = 1;
    }
    else
    {
        result = 0;
    }
    res.send(JSON.stringify({"response": result}));
    });
  });

// //show all skills
// app.get('/api/skills',(req, res) => {
//     let sql = "SELECT  skill_id,skill_name FROM skills  where partner_id = 4378 limit 2";
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//     });
//   });

//   //show single skills
// app.get('/api/skills/:id/:pId',(req, res) => {
//     let sql = "SELECT  skill_id,skill_name FROM skills  where partner_id = "+ req.params.pId +" and skill_id="+req.params.id;
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//     //   res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//     res.send(JSON.stringify({"response": results}));
//     });
//   });

  //Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });
// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World!');
// }).listen(8080); 

