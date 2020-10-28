var express = require('express');
var logincontoler = require('../../controler/login/logincontroller');
var manageController = require('../../controler/manage-strings/managestringscontroller')
var dboOperator = require("../../dboperations/dboOperators");
//MN
var cvrouters = express.Router();

// cvrouters.get('/isSessionValid', function (req, res) {
//     res.send('isSessionValid');
// })

cvrouters.get('/login', logincontoler.login)

cvrouters.get('/test', logincontoler.test)

cvrouters.get('/removesess',logincontoler.logout);

cvrouters.get('/updatepassword', logincontoler.changepassword);

cvrouters.post('/add',logincontoler.add);

cvrouters.get('/managestrings', manageController.getStrings);

cvrouters.post('/addstring', manageController.addString);

cvrouters.get('/isSessionValid',logincontoler.isSessionValid);

module.exports = cvrouters