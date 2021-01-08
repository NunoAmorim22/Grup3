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

function EditOperationalData(req,res){
    req.sanitize("id_operational").escape();
    req.sanitize("name").escape();
    req.sanitize("email").escape();
    req.sanitize("password").escape();
  
    
   const errors = req.validationErrors();
   if(errors){
       res.send(errors);
       return;
   }
   else{
    const idOperational = req.params.id;
    const name = req.body.name;
    const email =req.body.email;
    const password= req.body.password;
    

        const update = [name,idOperational];
           
        
        const query = connect.con.query ('UPDATE Candidate SET name=? WHERE id_candidate=(SELECT id_candidate FROM Operational WHERE id_operational=?)',update, function(err, rows, fields){
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
