var dboLogin = require("../../dboperations/dboLogin");
var CryptoJS = require("crypto-js");

const Str = require('@supercharge/strings');
let authKey = Str.random(16);
let sessToken = Str.random(16);
let sessId = "";

exports.changepassword = async function(req,res,next){
    var jsonData = req.query.params;
    var reqparam = JSON.parse(jsonData);
    var newpass = reqparam.password;
    var bytes  = CryptoJS.AES.decrypt(reqparam.password, '8080808080808080');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    let flag = 0;
    console.log(reqparam);
    var uId = reqparam.user_id;
    console.log("uId-1", uId);
    var result = await dboLogin.getPasswordHistory(uId);
    result.forEach(element => { 
        if(element.password == newpass)
        {
            flag = 1;
            console.log(element.password); 
        }        
      }); 
      
    if(flag == 1)
    {
        res.status(200).send({Flag: flag});
    }
    else
    {
        //update user_details & password_history chk
        console.log("uId-2", uId);
        var result = await dboLogin.updatePassword(newpass, uId);
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        
        let cur_dt = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        
        let dt = Date.now();
        var qry = "insert into password_history (partner_id,user_id,password,changed_on) values(1," + uId + ",'" + newpass + "','" + cur_dt + "')";
        
        var result = await dboLogin.insertPasswordHistory(qry);

        console.log(result);
        res.status(200).send({Flag: 2});
    }
}
exports.login = async function(req, res, next){
    let result1;
    var jsonData = req.query.params;   
    var reqparam = JSON.parse(jsonData);
    var t = reqparam.password;
    console.log(t);
    var bytes  = CryptoJS.AES.decrypt(reqparam.password, '8080808080808080');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(reqparam);
    console.log(originalText);
    var result = await dboLogin.getLogin(reqparam.user_name,reqparam.password,reqparam.partnerCode,reqparam.ipAdd);
    var rows = JSON.parse(JSON.stringify(result[0]));
    if(rows[0].response == 0)
    {
        sessToken = Str.random(16);
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        
        let cur_dt = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        
        let dt = Date.now();
        var qry = "insert into user_sessions (partner_id,user_id,session_token,auth_key,login_time,last_ping,status_since,ip_address,login_group_id,role_id,language_id,login_status) values(" + rows[0].pId + "," + rows[0].userId + ",'" + sessToken + "','" + authKey + "','" + cur_dt + "','" + cur_dt + "','" + cur_dt + "','" + reqparam.ipAdd + "'," + rows[0].loginGroupId + "," + rows[0].roleId + "," + rows[0].lId +",1)";
        
        var result = await dboLogin.insertUserSession(qry);
        var result_user = await dboLogin.updateUserDetails(cur_dt,result);
        var missObj = await dboLogin.getMissionDetails();
        var visaObj = await dboLogin.getVisaDetails();
        var vacObj = await dboLogin.getVACDetails();
        //console.log(result);  //last inserted id
        sessId = result;
        var menuObj = await dboLogin.getMenuDetails(rows[0].pId,rows[0].roleId);
        result1 = menuObj;
    }
    else
    {
        sessId = "";
        sessToken = "";
    }
    res.status(200).send({All:rows[0], Response:rows[0].response, MaxAttempt:rows[0].maxAttempt,UserId: rows[0].userId, Menu:result1, SessionToken: sessToken, SessionId: sessId, Mission: missObj, Visa: visaObj, VAC: vacObj});
    //res.status(200).send({Response:rows[0].response, MaxAttempt:rows[0].maxAttempt,UserId: rows[0].userId, Menu:result1, SessionToken: sessToken, SessionId: sessId});
}

exports.test = async function(req, res, next){
    var obj = await dboLogin.getTest();
    var obj1 = await dboLogin.getTest1();
    var obj2 = await dboLogin.getTest2();
    var obj3 = await dboLogin.getTest3();
    var obj4 = await dboLogin.getTest4();
    res.status(200).send({Roles: obj, Mission: obj1, Country: obj2, VAC: obj3, Language: obj4});
}

exports.logout = async function(req, res, next){
    var jsonData = req.query.params;
    var reqparam = JSON.parse(jsonData);
    console.log(reqparam.session_id);
    console.log(reqparam);
    var result = await dboLogin.deleteUserSessions(reqparam.session_id,reqparam.session_token,reqparam.status);
    var rows = JSON.parse(JSON.stringify(result[0]));
    console.log(rows[0]);
    res.status(200).send(rows[0]);
}

exports.isSessionValid = async function(req, res, next){
    console.log(req.query.params);
    var jsonData = req.query.params;
    var reqparam = JSON.parse(jsonData);
    var result = await dboLogin.isValidSession(reqparam.session_id,reqparam.session_token);
    res.status(200).send(result);
}


exports.add = async function(req, res, next){
    console.log(req.query);
    res.status(200).send('Added Successfully');
}