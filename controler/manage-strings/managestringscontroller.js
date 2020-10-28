var dboStrings = require("../../dboperations/dboManageStrings.js");


exports.getStrings= async function(req,res,next)
{
    var result = await dboStrings.getStringDetails();
    res.status(200).send(result);
}

/*exports.addString= async function(req,res,next)
{
    console.log(res.query.params);
    //var jsonData = req.query.params;
    //console.log(jsonData);
   // var reqparam = JSON.parse(jsonData);
    //console.log(reqparam);
    //var result = await dboStrings.addString();
    res.status(200).send("result");
}*/

exports.addString = async function(req, res, next){
    console.log(req.query);
    var jsonData = req.query.params;
    var reqparam = JSON.parse(jsonData);
    console.log(reqparam);
    var result = await dboStrings.addString(reqparam.stringCode,reqparam.stringName,reqparam.groupId,1);
    res.status(200).send('Added Successfully');
}