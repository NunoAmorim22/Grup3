const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
var exports = module.exports = {};
exports.signup = function(req, res) {
    res.status(jsonMessages.user.duplicate.status).send(jsonMessages.user.duplicate);
};
exports.signupSuccess = function(req, res) {
    res.status(jsonMessages.user.signupSuccess.status).send(jsonMessages.user.signupSuccess);
};
exports.signin = function(req, res) {
    res.status(jsonMessages.user.invalid.status).send(jsonMessages.user.invalid);

};
exports.signinSuccess = function(req, res) {
    /*
console.log(global.sessData.passport.user);

const email=global.sessData.passport.email;

const query =connect.con.query ("SELECT op.id_operational, uso.login_type FROM users us, User_old uso, Operational op  WHERE us.email=uso.email  AND us.email=? AND op.id_user=uso.id_user ",email, function(err, rows, fields){ 
console.log(query.sql);

if(err) {
    console.log(err);
    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else{
            if(rows.length==0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else{
                res.send(rows);
            }
        }

});
*/
    res.status(jsonMessages.user.signinSuccess.status).send(jsonMessages.user.signinSuccess);
};
exports.logout = function(req, res, err) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            res.status(jsonMessages.user.logoutError.status).send(jsonMessages.user.logoutError);
        }
        res.status(jsonMessages.user.logoutSuccess.status).send(jsonMessages.user.logoutSuccess);
    });
};
