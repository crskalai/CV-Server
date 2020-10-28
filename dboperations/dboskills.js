var dbconnection = require('./pool');

var query="select * from skills where partner_id=? and skill_id=?";

exports.getskillinfo = async function (partner_id,skill_id){
    return new Promise((resolve, reject) => {
        dbconnection.query(query,[partner_id,skill_id], (err, result) => {
            return err ? reject(err) : resolve(result);
          } );
        dbconnection.releaseConnection;
      });
}