const express = require('express');
const router = express.Router();
const passport = require('passport');

//const userController = require('../controllers/users.controller.js');

router.post ('/login',
passport.authenticate('local' , {successRedirect:"/users",
failureRedirect:'/login',
failureFlash: true})
);







