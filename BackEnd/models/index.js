"use strict";
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = "MySQL";
const config = require ("../config/config.json") [env];
const sequelize = new Sequelize (config.database, config.username, config.password, config);


const db = {};
fs
.readdirSync(__dirname)
.filter(function(file) {
return (file.indexOf(".") !== 0) && (file !== "index.js");
})


.forEach(function(file){
    let model = sequelize.import(path.join(__dirname, file));
    //const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db [model.name] =model;
});

Object.keys(db).forEach(function(modelName) {
    if("associate" in db [modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = Sequelize;
module.exports =db;
