const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");


//get de todas as ocorrencias que estao ativas

function getAllActiveOccurrences(req,res){
    
    update =["Em Processo"];

    const query =connect.con.query ("SELECT id_occurrence FROM Occurrence WHERE state=? order by id_occurrence", update, function(err, rows, fields){
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

//get de todas as ocorrencias que estao ativas de determinada equipa
//Fazer----------------------------------------
function getAllActiveTeamOccurrences(req,res){
    const idOperational= req.params.id;
    update =[idOperational,"Em Processo"];

    const query =connect.con.query ("SELECT  DISTINCT o.id_occurrence FROM Occurrence o, Team_Inscription ti WHERE o.id_team=ti.id_team AND ti.id_team IN (SELECT t.id_team FROM Team_Inscription ti, Operational op, Team t, Occurrence o WHERE op.id_operational=ti.id_operational AND ti.id_team=t.id_team AND op.id_operational=?) AND o.state=?", update, function(err, rows, fields){
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

//get de todas as ocorrencias finalizadas e respetivo indicativo de equipa que participou nela
function getAllEndedOccurrences(req,res){
    
    update =["Concluído"];
                                                                                                                                                                                                                                                                               
    const query =connect.con.query ("SELECT o.id_occurrence, t.team_indicative FROM Occurrence o, Team t WHERE o.id_team=t.id_team AND o.state=?", update, function(err, rows, fields){
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
//garante que operacional esteve realmente presente- AND ope.id_occurrence=o.id_occurrence AND ope.id_operational=op.id_operational
//garante que operacional marcou presenca - operational_presence_conf = 1

//get das participaçoes em ocorrencias de um operacional logado  e respetivos creditos recebidos por cada uma delas
//passar o operacional que está a ser logado
function getAllParticipations(req,res){
    const idOperational= req.params.id;

    update =[idOperational,"Concluído","1"];

    const query =connect.con.query ("SELECT o.id_occurrence, ope.evaluation_credits FROM Occurrence o, Operational_evaluation ope, Operational op, User u, Team t, Team_Inscription ti WHERE op.id_user=u.id_user AND op.id_operational=ti.id_operational AND t.id_team =ti.id_team AND ope.id_occurrence=o.id_occurrence AND ope.id_operational=op.id_operational AND t.id_team=o.id_team AND op.id_operational=? AND o.state=? AND ope.operational_presence_conf=?"/*AND o.team_presence=?*/ , update, function(err, rows, fields){
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


// get de operacionais de uma equipa, com  presenca marcada, e que fazem parte da equipa  de um determinado operacional que está logado
//tem que se passar o id do operacional em questão para ele ir buscar as coisas associadas a ele, como a equipa e presenças dos colegas de equipa
function getAllPresences(req,res){
    const idOperationalLog= req.params.id;
    

    update =["1",idOperationalLog,"Em Processo","1"];

    const query =connect.con.query ("SELECT DISTINCT ti.id_team,op.id_operational, c.name FROM Operational op, Team_Inscription ti, Candidate c, User u, Team t, Operational_evaluation ope  WHERE op.id_operational=ti.id_operational AND ope.operational_presence_conf=? AND op.id_operational=ope.id_operational AND op.id_candidate=c.id_candidate AND op.id_user=u.id_user  AND ti.id_team IN (SELECT t.id_team FROM Team_Inscription ti, Operational op, Team t, Occurrence o, Operational_evaluation ope WHERE op.id_operational=ti.id_operational AND ti.id_team=t.id_team AND op.id_operational=ope.id_operational AND op.id_operational=? AND o.state=? AND ope.operational_presence_conf=?)" , update, function(err, rows, fields){
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

//get de dados de occorrencia que se clica no menu principal
function getClickedOccurrenceData(req,res){
    idOccurrence= req.params.id;
    update =[idOccurrence];

    const query =connect.con.query ("SELECT o.id_occurrence, l.address, l.county, o.arrival_date, t.team_indicative  FROM Occurrence o, Request r, Location l, Team t WHERE  o.id_occurrence =? AND o.id_request=r.id_request AND r.id_location=l.id_location AND o.id_team=t.id_team", update, function(err, rows, fields){
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

//fechar ocorrencia
function CloseOccurrence(req,res){
    req.sanitize("id_occurrence").escape();
    

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
     const idOccurrence = req.params.id;
     const state= "Concluído";   
     if (idOccurrence !='NULL' && typeof(idOccurrence != 'undefined')) {
        
        const update = [state,idOccurrence];
        const query = connect.con.query("UPDATE Occurrence SET state=? WHERE id_occurrence=?", update, function (err, rows, fields){
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

//exportar módulos
module.exports = {
    getAllActiveOccurrences:getAllActiveOccurrences,
    getAllEndedOccurrences:getAllEndedOccurrences,
    getAllParticipations:getAllParticipations,
    getAllPresences:getAllPresences,
    getAllActiveTeamOccurrences:getAllActiveTeamOccurrences,
    getClickedOccurrenceData:getClickedOccurrenceData,
    CloseOccurrence:CloseOccurrence
}