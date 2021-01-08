//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//get da equipa de um leader numa ocorrencia
function getTeamOfLeader(req,res){
    const idOperationalLog= req.params.id;
    

    update =["1",idOperationalLog,"Em Processo","1"];

    const query =connect.con.query ("SELECT DISTINCT ti.id_team,op.id_operational, c.name FROM Operational op, Team_Inscription ti, Candidate c, User u, Team t, Operational_evaluation ope  WHERE op.id_operational=ti.id_operational AND ope.operational_presence_conf=? AND op.id_operational=ope.id_operational AND op.id_candidate=c.id_candidate AND op.id_user=u.id_user  AND ti.id_team IN (SELECT t.id_team FROM Team_Inscription ti, Operational op, Team t, Occurrence o, Operational_evaluation ope WHERE op.id_operational=ti.id_operational AND ti.id_team=t.id_team AND op.id_operational=ope.id_operational AND op.id_operational=? AND o.state=? AND ope.operational_presence_conf=? AND op.id_operational NOT IN (SELECT id_operational FROM Leader))" , update, function(err, rows, fields){
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




//Função para atualizar os creditos de cada operacional conforme a avaliação do lider de equipa
//---------------------------------------------------------------------------------------------------------------------
//Levar na rota o id da ocorrencia
//fazer query que determine o lider da equipa que participou na ocorrencia 
//Sacar id de operacional de lider 
//Levar os creditos que foram inseridos
//Tem que levar no body esses creditos(=nota) que o lider atribui a cada operacional da equipa
//Depois atualizar operational_evaluation (evaluation_credits) de cada operacional na ocorrencia

function updateCreditsOp1(req,res){
    req.sanitize("id_occurrence").escape();
 
 
    const errors = req.validationErrors();
   if(errors){
       res.send(errors);
       return;
   }
   else{
    const idOccurrence= req.params.id_occu;
    const idOperational=req.params.id_op;
    const state="Concluído";
    const grade = req.body.grade;
  


    //update do primeiro operacional
        const update = [grade,grade,idOccurrence, idOperational,state];
           
        
        const query = connect.con.query ("UPDATE Operational_evaluation SET grade=?, evaluation_credits=? WHERE id_occurrence=? AND  id_operational=?  AND id_occurrence IN (SELECT o.id_occurrence FROM Occurrence o , Operational op , Team t, Team_Inscription ti, Leader l WHERE op.id_operational=ti.id_operational AND o.id_team=ti.id_team AND t.id_team=ti.id_team AND op.id_operational!=l.id_operational AND o.state=?) AND id_operational IN (SELECT id_operational FROM Occurrence)" ,update,function(err, rows, fields){
            console.log(query.sql);
           
            if(!err){
              
                post=[idOperational];
                const query = connect.con.query ('UPDATE Operational SET total_credits,  WHERE id_operational=(SELECT LAST_INSERT_ID (id_operational) FROM Operational_Evaluation WHERE id_operational=?)',post, function(err,rows, fields){
                    console.log(query.sql);
                    res.status(jsonMessages.db.successInsert.status).send (jsonMessages.db.successInsert);
                });
            }
            else{
                console.log(err);
                if(err.code == 'ER_DUP_ENTRY'){
                    res.status(jsonMessages.db.duplicateId.status).send(jsonMessages.db.duplicateId);
                }
                else
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
    });
    }    
}

module.exports={
    getTeamOfLeader:getTeamOfLeader,
    updateCreditsOp1:updateCreditsOp1
}