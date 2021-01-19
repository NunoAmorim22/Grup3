//PAG 269-------

//const express = require('express');
//const router = express.Router();
//-----------------------------------------------------CODIGO PAGINA 269 DO LIVRO-----------------------------------------------------------------------------//     
//const jsonMessagesPath = _dirname + "/../assets/jsonMessages/";
//const jsonMessages = require(jsonMessagesPath + "login");
const jsonMessages = require ("../assets/jsonMessages/login.js")
var exports = module.exports = {};

exports.signup = function(req, res) {
    res.status(jsonMessages.user.duplicate.status).send(jsonMessages.user.duplicate);
};
exports.signupSuccess = function(req, res){
    res.satatus(jsonMessages.user.signupSuccess.status).send(jsonMessages.user.signupSuccess);
};
exports.signin = function(req, res) {
    res.status(jsonMessages.user.invalid.status).send(jsonMessages.user.invalid);
};
exports.signinSuccess = function(req, res){
    res.status(jsonMessages.user.signinSuccess.status).send(jsonMessages.user.signinSucess);
};

exports.logout = function(req, res, err){
    req.session.destroy(function(err){
        if (err){
            console.log(err);
            res.status(jsonMessages.user.logoutError.status).send(jsonMessages.user.logoutError);
        }
        res.status(jsonMessages.user.logoutSuccess.status).send(jsonMessages.user.logoutSucess);
    });
}; 
