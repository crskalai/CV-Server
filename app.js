var express = require('express');
var app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();  
  });
 
/*var routers = require('./router/routers');
app.use('/api/', routers);*/

var cv = require('./router/cv/cvrouter');
app.use('/api/',cv);

/*var operatorconsole = require('./router/operatorconsole/operatorsroutes');
app.use('/operatorconsole/', operatorconsole);*/


var common = require('./router/common/commonrouter');
app.use('/common/', common);

app.listen(8433, function() {
 console.log("Om Sai Server is running at 3000 port!");
 console.log("I am sai");
});
