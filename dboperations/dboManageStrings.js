var dbconnection = require('./pool');

var strQry = "SELECT * FROM language_strings WHERE language_id=1";
exports.getStringDetails = async function (){
  return new Promise((resolve, reject) => {
      dbconnection.query(strQry, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var query="call procStringsInsert(?,?,?,?,?)";
exports.addString = async function (stringCode,stringName,groupId,pId,lId){
    return new Promise((resolve, reject) => {
        dbconnection.query(query,[stringCode,stringName,groupId,pId,lId], (err, result) => {
            return err ? reject(err) : resolve(result);
          } );
        dbconnection.releaseConnection;
      });
}