//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//Função para atualizar os creditos de cada operacional conforme a avaliação do lider de equipa
//---------------------------------------------------------------------------------------------------------------------
//Levar na rota o id da ocorrencia
//fazer query que determine o lider da equipa que participou na ocorrencia 
//Sacar id de operacional de lider 
//Levar os creditos que foram inseridos
//Tem que levar no body esses creditos(=nota) que o lider atribui a cada operacional da equipa
//Depois atualizar operational_evaluation (evaluation_credits) de cada operacional na ocorrencia

function updateCredits(req,res){
    req.sanitize("id_occurrence").escape();
 
 
    const errors = req.validationErrors();
   if(errors){
       res.send(errors);
       return;
   }
   else{
    const idOccurrence= req.params.id;
    const grade1 = req.body.grade;
    const grade2 =req.body.grade;;
    const grade3= req.body.grade;
    const grade4= req.body.grade

        const update = [grade1,grade2,grade3,grade4,idOccurrence];
           
        
        const query = connect.con.query ("UPDATE Operational_evaluation SET grade=? AND id_occurrence=? AND id_occurrence IN (SELECT id_occurrence FROM Occurrence o , Operational_evaluation oe, Operational op , Team t, Team_Inscription ti WHERE o.occurrence=oe.id_occurrence AND oe.id_operacional=op.id_operational AND op.id_operational=ti.id_operational AND o.id_team=ti.id_team AND t.id_team=ti.id_team AND op.id_operational=l.id_operational)" ,update,function(err, rows, fields){
            console.log(query.sql);
           
            if(!err){
                //insertquery = res.location(rows.insertId);
                //post=[idOccurrence,insertquery];
                post=[email, password, idOperational];
                const query = connect.con.query ('UPDATE User SET email=?, password=? WHERE id_user=(SELECT id_user FROM Operational WHERE id_operational=?)',post, function(err,rows, fields){
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
