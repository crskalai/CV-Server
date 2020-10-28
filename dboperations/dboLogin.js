var dbconnection = require('./pool');


//var query="select * from user_details";// where user_name=? and password=?";
exports.insertUserSession = async function (query){
  return new Promise((resolve, reject) => {
      dbconnection.query(query, (err, result) => {
          return err ? reject(err) : resolve(result.insertId);
        } );
      dbconnection.releaseConnection;
    });
}

var upQry = "UPDATE user_details SET login_status = 1, last_login = ? WHERE user_id = ?";
exports.updateUserDetails = async function (cur_dt, uId){
  return new Promise((resolve, reject) => {
      dbconnection.query(upQry, [cur_dt,uId],(err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}


// var menuQry = "select mm.menu_id,m.menu_name,m.menu_link,m.parent_menu_id,m.position,m.is_add,m.is_edit,m.is_delete,m.is_view,m.is_public " +
//               "from menu_matrix mm left join menu_master m on mm.menu_id = m.menu_id " +
//               "where mm.partner_id = ? and mm.role_id = ? and m.partner_id = ? " +
//               "and m.is_view = 1 and m.is_public = 1 order by m.position";
var menuQry = "select mm.menu_id,m.menu_name,m.menu_link,m.parent_menu_id,m.position,m.is_add,m.is_edit,m.is_delete,m.is_view,m.is_public,ls.string_name " +
              "from menu_matrix mm left join menu_master m on mm.menu_id = m.menu_id " +
              "left join language_strings ls on mm.menu_id = ls.string_code " +
              "where mm.partner_id = ? and mm.role_id = ? and m.partner_id = ? " +
              "and m.is_view = 1 and m.is_public = 1 and ls.group_id=2 order by m.position";
exports.getMenuDetails = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(menuQry,[pId, rId, pId], (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var missQry = "SELECT * FROM mission_details WHERE mission_status=1";
exports.getMissionDetails = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(missQry, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var visaQry = "SELECT * FROM visa_category_master WHERE visa_category_status=1";
exports.getVisaDetails = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(visaQry, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var vacQry = "SELECT * FROM vac_details WHERE vac_status=1";
exports.getVACDetails = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(vacQry, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var t = "select * from language_strings where group_id=6";
exports.getTest = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(t, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}
var t1 = "select * from language_strings where group_id=3";
exports.getTest1 = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(t1, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}
var t2 = "select * from language_strings where group_id=4";
exports.getTest2 = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(t2, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}
var t3 = "select * from language_strings where group_id=5";
exports.getTest3 = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(t3, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}
var t4 = "select * from language_strings where group_id=7";
exports.getTest4 = async function (pId, rId){
  return new Promise((resolve, reject) => {
      dbconnection.query(t4, (err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var passQry = "SELECT password FROM password_history WHERE user_id=? order by pass_history_id desc limit 5";
exports.getPasswordHistory = async function (uId){
  return new Promise((resolve, reject) => {
      dbconnection.query(passQry, [uId],(err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var query="call procLoginSelect(?,?,?,?)";
exports.getLogin = async function (user_name,password,partnerCode,ipAdd){
    return new Promise((resolve, reject) => {
        dbconnection.query(query,[user_name,password,partnerCode, ipAdd], (err, result) => {
            return err ? reject(err) : resolve(result);
          } );
        dbconnection.releaseConnection;
      });
}

var delQry = "call procUserSessionDelete(?,?,?)";
exports.deleteUserSessions = async function (sId,sTkn,sts){
  return new Promise((resolve, reject) => {
      dbconnection.query(delQry, [sId,sTkn,sts],(err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var upQry1 = "UPDATE user_details SET login_status = 0 WHERE user_id = ?";
exports.updateUserStatus = async function (cur_dt, uId){
  return new Promise((resolve, reject) => {
      dbconnection.query(upQry1, [uId],(err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

var upPassQry = "UPDATE user_details SET password = ? WHERE user_id = ?";
exports.updatePassword = async function (pass, uId){
  return new Promise((resolve, reject) => {
      dbconnection.query(upPassQry, [pass, uId],(err, result) => {
          return err ? reject(err) : resolve(result);
        } );
      dbconnection.releaseConnection;
    });
}

exports.insertPasswordHistory = async function (query){
  return new Promise((resolve, reject) => {
      dbconnection.query(query, (err, result) => {
          return err ? reject(err) : resolve(result.insertId);
        } );
      dbconnection.releaseConnection;
    });
}

exports.isValidSession = async function(session_id,session_token){
  return new Promise((resolve,reject) => {
     dbconnection.query("select count(*) as sessionvalid from user_sessions where \
     session_id = ? and session_token = ?",
      [session_id,session_token],(err,result) => {
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