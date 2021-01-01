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

//get de todas as ocorrencias finalizadas e respetivo indicativo de equipa que participou nela
function getAllEndedOccurrences(req,res){
    
    update =["Concluído","1"];

    const query =connect.con.query ("SELECT o.id_occurrence, t.team_indicative FROM Occurrence o, Team t WHERE o.id_team=t.id_team AND o.state=? AND o.team_presence=?", update, function(err, rows, fields){
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

//get das participaçoes em ocorrencias de um operacional logado  e respetivos creditos recebidos por cada uma delas
function getAllParticipations(req,res){
    const idOperational= req.params.id;

    update =[idOperational,"Concluído"/*"1"*/];

    const query =connect.con.query ("SELECT o.id_occurrence, ope.evaluation_credits FROM Occurrences o, Operational_evaluation ope, Operational op User u, Team t, Team_Inscription ti WHERE op.id_user=u.id_iser AND op.id_operatonal=ti.id_operational AND t.id_team =ti.id_team AND ope.id_occurrence=o.id_occurrence AND ope.id_operational=op.id_operational AND t.id_team=o.id_team AND op.id_operational=? AND o.state=?"/*AND o.team_presence=?*/ , update, function(err, rows, fields){
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
function getAllPresences(req,res){
    const idOperationalLog= req.params.id;

    update =[idOperationalLog,"Em Processo"];

    const query =connect.con.query ("SELECT t.id_team, op.id_operartional, c.name FROM Operational op, Team t, Candidate c, Team_Inscription ti, Occurrence o,Operational_evaluation ope WHERE t.id_team=ti.id_team AND op.id_operational=ti.id_operational AND o.id_occurrence=ope.id_occurrence AND op.id_operational=ope.id_operational AND c.id_candidate=op.id_candidate AND op.id_operational=? AND o.state=?" , update, function(err, rows, fields){
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



//------------------------------------------
//WARNING
//falta fazer rotas no controlador das ocorrencias

//exportar módulos
module.exports = {
    getAllActiveOccurrences:getAllActiveOccurrences,
    getAllEndedOccurrences:getAllEndedOccurrences,
    getAllParticipations:getAllParticipations,
    getAllPresences:getAllPresences
}