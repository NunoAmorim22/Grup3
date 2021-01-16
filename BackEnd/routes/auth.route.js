//PAG 265-------------

const router = require('express').Router();
//const router = express.Router();
const passport = require('passport');
const authController= require("../controllers/auth.controller.js")


module.exports = function(app, passport) {
   router.get('/signup', authController.signup);
   router.get('/signin', authController.signin);
   router.get('/signupSuccess', authController.signupSuccess);
   router.get('/signinSuccess', isLoggedIn, authController.signinSuccess);
    
   router.post
('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signup'
    }));
    router.get('/logout', authController.logout);
    
    router.post
('/signin', passport.authenticate('local-signin', {
        successRedirect: '/signinSuccess',
        failureRedirect: '/signin'
    }));
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
};







router.post ('/login',
passport.authenticate('local' , {successRedirect:"/users",
failureRedirect:'/login',
failureFlash: true})
);







