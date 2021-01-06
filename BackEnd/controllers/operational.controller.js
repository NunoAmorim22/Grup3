//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");


//get de todos os operacionais
//id e nome

function getAllOperationals(req,res){
    
    

    const query =connect.con.query ("SELECT o.id_operational, c.name FROM Operational o, Candidate c WHERE o.id_candidate=c.id_candidate", function(err, rows, fields){
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

//delete operacionais 
// id_operational
function deleteOperationals (req , res) {
    const idOperational =req.params.id;

    if (idOperational!='NULL' && typeof(idOperational) != 'undefined') {
    const query = connect.con.query("DELETE FROM Operational WHERE id_operational = ?", idOperational , function (err, rows, fields){
        console.log(query.sql);
        if (!err){
            res.status(jsonMessages.db.successDeleteU.status).send (jsonMessages.db.successDeleteU);
                }
                else{
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
    });
    }
}

//get dos dados de operacional para o perfil
//levar id de operacional
// vai buscar a equipa


function getOprationalDataTeam(req,res){
    
    idOperational=req.params.id;

    const query =connect.con.query ("SELECT   DISTINCT  t.team_indicative FROM Team_Inscription ti, Team t WHERE t.id_team=ti.id_team AND ti.id_team IN (SELECT t.id_team FROM Team_Inscription ti, Operational op, Team t, Occurrence o WHERE op.id_operational=ti.id_operational AND ti.id_team=t.id_team AND op.id_operational=?)",idOperational, function(err, rows, fields){
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



// vai buscar o resto dos dados do operacional quando se clica
//aparecer Email,id,nome,equipa e creditos
function getOprationalDataRest(req,res){
    
    idOperational=req.params.id;

    const query =connect.con.query ("SELECT c.email, op.id_operational, c.name, op.credits FROM Candidate c, Operational op WHERE op.id_candidate=c.id_candidate AND op.id_operational =?;",idOperational, function(err, rows, fields){
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

// editar um operacional
// vai alterar email, nome, password e confirmar password
// vai receber id_operacional


function EditOperationalData (req,res){
    req.sanitize("id_operational").escape();
    req.sanitize("email").escape();
    req.sanitize("name").escape();
    req.sanitize("password").escape();
  

/*
    req.checkBody("name","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:45});
    req.checkBody("naturality","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:20});
    req.checkBody("phone_number","Insira 9 números").matches(/^[a-z ]+$/i).isLength({ min: 0, max:10});
    req.checkBody("genre","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:2});
    req.checkBody("cc_number","Insira 8 números").matches(/^[0-9]+$/).isLength({ min: 0, max:8 });
    req.checkBody("job","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:20});
    req.checkBody("skin_color","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:10});
    req.checkBody("eyes_color","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:10});
    req.checkBody("hair_color","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:10});
    req.checkBody("heigth","Insira 3 numeros (ex: 1.50)").matches(/^[0-9]+$/).isLength({ min: 0, max:3});
    req.checkBody("body_shape","Insira apenas texto").matches(/^[a-z ]+$/i).isLength({ min: 0, max:10});
*/
   
    const errors = req.validationErrors();
    console.log(errors);
    if(errors){
        res.send(errors);
        return;
    }
    else{
     const idSuspect = req.params.id;  
     const name = req.body.name;
     const naturality = req.body.naturality;
     const phone_number = req.body.phone_number;
     const genre = req.body.genre;
     const cc_number = req.body.cc_number;
     const job = req.body.job;
     const skin_color = req.body.skin_color;
     const eyes_color = req.body.eyes_color;
     const hair_color = req.body.hair_color;
     const height = req.body.height;
     const body_shape = req.body.body_shape;
     //const active = req.body.active;
     const active = 1;

     if (idSuspect !='NULL' && typeof(idSuspect) != 'undefined') {
        
        const update = [name,naturality,phone_number,genre,cc_number,job,skin_color,eyes_color,hair_color,height,body_shape,active,idSuspect];
        const query = connect.con.query("UPDATE Suspect SET name=?,naturality=?,phone_number=?,genre=?,cc_number=?,job=?,skin_color=?,eyes_color=?,hair_color=?,height=?,body_shape=?,active=? WHERE id_suspect=?", update, function (err, rows, fields){
            console.log(query.sql);
            if (!err){
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                    }
                    else{
                        console.log(err);
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                    }
            });
        }
    }
}

module.exports = {
    getAllOperationals:getAllOperationals,
    deleteOperationals:deleteOperationals,
    getOprationalDataTeam:getOprationalDataTeam,
    getOprationalDataRest:getOprationalDataRest,
    EditOperationalData:EditOperationalData

};