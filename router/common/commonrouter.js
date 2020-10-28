var express = require("express");
var filecontroler = require("../../controler/common/miootfileuploads");
var miootfilerouter = express.Router();
var dboOperator = require("../../dboperations/dboOperators");

miootfilerouter.use(function timeLog (req, res, next) {
    console.log('mioot fileupload router middleware process.');
    // var jsonData = req.query.params;
    // var reqparam = JSON.parse(jsonData);
    // async function mail() {
    //     var isvalid = await dboOperator.isValidSession(reqparam.partner_id,reqparam.operator_id,reqparam.operator_session_id);
    //     if(isvalid)
    //         next();
    //     else
    //         res.status(901).send("Invalid operator session");
        
    // }
    // mail();
    next();
  })

miootfilerouter.get('/fileuploadform',filecontroler.fileuploadform);
miootfilerouter.post('/fileupload',filecontroler.fileupload);

module.exports = miootfilerouter;

