//Definição da porta e caminho
const host = process.env.HOST ;
const port = process.env.PORT || 3000 ;

//iniciar App
const express = require ('express');
const app = express();




//Controlo de acesso
const cors = require('cors');
app.use(cors());
app.use(cors({
    exposedHeaders: ['location'],
    }));
    
//Colocar app à escuta
app.listen(port, function(err) {
    if(!err) {
        console.log ('Aplication listening on ' + host + ' and port ' + port);
    }
    else {
        console.log(err);
    }
});

//Criação de rotas estáticas
app.use('../assets', express.static ('assets'));
app.use('../views', express.static ('views'));

//-----------------------------------------------------------------------------------------------------
const passport = require('passport');

 app.post('/login',
 passport.authenticate ('local', {successRedirect:'/', 
 failureRedirect: '/login',
failureFlash: true })
);


const LocalStrategy =require('passport-local').Strategy;
const  user  = require('../assets/jsonMessages/login.js');
passport.use(new LocalStrategy(
    function(username,password,done){
        user.findOne({username: username}, function(err, user){
            if(err) {
                return done(err);
            } if(!user){
                return done (null, false, {message:'Username Incorreto.'});
            } if(!user.validPassoword(password)) {
                return done (null, false, {message: 'Password Errada'});
            }
            return done(null, user);
        });
    }
))

//-----------------------------------------------------------------------------------------------------------
module.exports = app;
require('./loader.js');
