var dbconnection = require('./pool');

var query="select partner_id, operator_id,user_name, first_name,last_name from operator_information \
where partner_id=? ";

exports.getoperatorinfo = async function (partner_id){
    
    return new Promise((resolve, reject) => {
        dbconnection.query(query,[partner_id], (err, result) => {
            return err ? reject(err) : resolve(result);
          } );
        dbconnection.releaseConnection;
      });
}
exports.isOPeratorExist = async function(partner_id,operator_id){
    return new Promise((resolve,reject) => {
        dbconnection.query("select operator_id from operator_information where \
        partner_id = ? and operator_id=?",[partner_id,operator_id],(err,result) => {
            return err ? reject(err) : resolve(result);
        });
        dbconnection.releaseConnection;
    });
}
exports.isValidSession = async function(partner_id,operator_id,operator_session_id){
    return new Promise((resolve,reject) => {
       dbconnection.query("select count(*) as sessionvalid from operator_information where \
        partner_id = ? and operator_id=? and operator_sessionid = ?",
        [partner_id,operator_id,operator_session_id],(err,result) => {
            if(err){
                return reject(err);
            }
            else{
                if(result[0].sessionvalid <= 0){
                    return resolve(false);
                }
            return resolve(true);
            }
        });
        dbconnection.releaseConnection;
    });
}
