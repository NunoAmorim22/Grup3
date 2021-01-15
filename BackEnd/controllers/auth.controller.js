const express = require('express');
//const router = express.Router();

const userController = require('../controllers/users.controller.js');



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
        
