//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//Saber tudo de todos os suspeitos e de todos os participantes de todas as ocorrencias
function getALL(req,res) {
    const query = connect.con.query("SELECT o.id_occurrence, s.*, p.* FROM Occurrence o, Suspect s , Participant p WHERE o.id_occurrence  IN (SELECT id_occurrence  FROM Participation) AND s.id_suspect IN (SELECT id_suspect FROM Participation)AND p.id_participant IN (SELECT id_participant FROM Participation) AND s.active=1 AND p.active=1 ORDER BY o.id_occurrence", function(err, rows, fields){
        console.log(query.sql);
        
        if(err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
                else{
                    if(rows.length==0) {
                        res.status(jsonMessages.db.noRecords.status).send (jsonMessages.db.noRecords);
                    }
                    else{
                        res.send(rows);
                    }
                }
    
    });
    }

//Saber tudo dos suspeitos e das ocorrencias
function getALLSuspects(req,res) {
    const query = connect.con.query("SELECT o.id_occurrence, s.* FROM Occurrence o, Suspect s , Participant p WHERE o.id_occurrence  IN (SELECT id_occurrence  FROM Participation) AND s.id_suspect IN (SELECT id_suspect FROM Participation) AND s.active=1 ORDER BY o.id_occurrence", function(err, rows, fields){
        console.log(query.sql);
        
        if(err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
                else{
                    if(rows.length==0) {
                        res.status(jsonMessages.db.noRecords.status).send (jsonMessages.db.noRecords);
                    }
                    else{
                        res.send(rows);
                    }
                }
    
    });
    }

//Saber tudo dos participantes das ocorrencias
function getALLParticipants(req,res) {
    const query = connect.con.query("SELECT o.id_occurrence, p.* FROM Occurrence o , Participant p WHERE o.id_occurrence  IN (SELECT id_occurrence  FROM Participation) AND id_participant IN (SELECT id_participant FROM Participation) AND p.active=1 ORDER BY o.id_occurrence", function(err, rows, fields){
        console.log(query.sql);
        
        if(err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
                else{
                    if(rows.length==0) {
                        res.status(jsonMessages.db.noRecords.status).send (jsonMessages.db.noRecords);
                    }
                    else{
                        res.send(rows);
                    }
                }
    
    });
    }

//Saber tudo de um suspeito numa determinada ocorrencia
function getSuspectOccurrencebyID(req,res){
    const idOccurrence = req.params.id_occu;
    const idSuspect= req.params.id_susp;
    
    //const post ={ id_suspect : idSuspect, 
       // id_occurrence : idOccurrence};
        update =[idSuspect,idOccurrence];
    const query =connect.con.query ("SELECT o.id_occurrence, s.* FROM Occurrence o, Suspect s, Participation p WHERE s.id_suspect =p.id_suspect AND s.id_suspect=$1  AND o.id_occurrence =p.id_occurrence AND o.id_occurrence=$2 AND active=1", [idSuspect,idOccurrence], function(err, rows, fields){
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
//Saber tudo de um participante numa determinada ocorrencia
function getParticipantOccurrencebyID(req,res){
    const idParticipant= req.params.id;
    const idOccurrence = req.params.id;
    const typep = req.params.id; 
    const post = {id_participant:idParticipant,
                  id_occurrence:idOccurrence,
                  participant_type : typep};                             
    const query =connect.con.query ("SELECT o.id_occurrence, pa.* FROM Occurrence o, Participant pa, Participation pe WHERE pa.id_participant =pe.id_participant AND pa.id_participant=? AND pa.participant_type=? AND o.id_occurrence =pe.id_occurrence AND o.id_occurrence=? AND active=1", post, function(err, rows, fields){
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

//EXPORTAR AS FUNÇÕES
module.exports={
    getALL:getALL,
    getALLSuspects: getALLSuspects,
    getALLParticipants: getALLParticipants,
    getSuspectOccurrencebyID:getSuspectOccurrencebyID,
    getParticipantOccurrencebyID:getParticipantOccurrencebyID,
};