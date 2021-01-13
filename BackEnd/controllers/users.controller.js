const connect = require('../config/connect.js');


 //get dos users

 function getUsers (req,res) {
    
    const query =connect.con.query ('SELECT * FROM Users order by id_user', function(err, rows, fields){
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
    }

//get de dados de um user

function FindUser(req,res) {

    req.sanitize('email').escape();

    const email = req.body.email;
    const query =connect.con.query ('SELECT * FROM Users WHERE email=?',email, function(err, rows, fields){
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
    }



module.exports={
    getUsers:getUsers,
    FindUser:FindUser
};