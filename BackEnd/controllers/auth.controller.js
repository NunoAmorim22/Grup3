//PAG 269-------

const express = require('express');
//const router = express.Router();

const userController = require('../controllers/users.controller.js');


// APAGAR TUDO ----
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {


    passport.use ('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        },
            
            passport.use (new LocalStrategy (
            function (email, password, done) {
            
                userController.FindUser({email: email}, function(err, user) {

                    if(err){
                        return done(err);
                        } if(!user) {
                            return done(null. false, {message: 'Username Incorreto'});
                        } if(!user.validPassword(password)) {
                            return done (null, false, { message: 'Password errada.' });
                        }
                        return done (null, user);
                });
                    
            })
        )
    ))
}
//-----------------------------------------------------CODIGO PAGINA 269 DO LIVRO-----------------------------------------------------------------------------//     
const jsonMessagesPath = _dirname + "/../assets/jsonMessage/";
const jsonMessages = require(jsonMessagesPath + "login");
var exports = module.exports = {};

exports.signup = function(req, res) {
    res.status(jsonMessages.user.duplicate.status).send(jsonMessages.user.duplicate);
};
exports.signupSucess = function(req, res){
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