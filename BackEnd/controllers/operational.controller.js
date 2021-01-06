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

function getOprationalData(req,res){
    
    

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
module.exports = {
    getAllOperationals:getAllOperationals,
    deleteOperationals:deleteOperationals,
    getOprationalData:getOprationalData 

};