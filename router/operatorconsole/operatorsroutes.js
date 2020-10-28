var express = require('express');
var operatorcontoler = require('../../controler/operator/operatorcontroler');
var dboOperator = require("../../dboperations/dboOperators");

var miootoperatorrouters = express.Router();
const RequestIp = require('request-ip');

// middleware that is specific to this router
// miootoperatorrouters.use(function timeLog (req, res, next) {
//     var ipaddrclientaess = RequestIp.getClientIp(req);
//     console.log('Operator console middleware process : ', ipaddrclientaess);
//     var jsonData = req.query.params;
//     console.log(jsonData)
//     var reqparam = JSON.parse(jsonData);
//     next();
    //next(reqparam.user_name,reqparam.password);
    // async function mail() {
    //     var isvalid = await dboOperator.isValidSession(reqparam.partner_id,reqparam.operator_id,reqparam.operator_session_id);
    //     console.log(isvalid);
    //     if(isvalid)
    //         next();
    //     else
    //         res.status(901).send("Invalid operator session");
        
    // }
//     mail();
//   })

// miootoperatorrouters.use(function timeLog (req, res, next) {
    
//     var jsonData = req.query.params;
//     console.log(jsonData)
//     var reqparam = JSON.parse(jsonData);
//     next();
// })
miootoperatorrouters.get('/', function (req, res) {
    res.send('Operator Console Root Service');
})

// miootoperatorrouters.get('/login', operatorcontoler.login)

miootoperatorrouters.get('/login1', operatorcontoler.login1)

miootoperatorrouters.get('/logout',operatorcontoler.logout);

miootoperatorrouters.get('/getalloperator',operatorcontoler.getalloperators);

module.exports = miootoperatorrouters;

