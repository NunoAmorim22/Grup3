//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//Get do tipo de material disponivel da lista de todos os materiais existentes
//Vai levar o id de ocorrencia na rota 
function getMaterialtype(req,res){
    const idOccurrence=req.params.id;
    update =[idOccurrence,"Disponível"];
    const query =connect.con.query ("SELECT m.category FROM Material m ,Occurrence_material om, Occurrence o WHERE o.id_occurrence=om.id_occurrence AND om.id_material=m.id_material  AND  m.id_material IN (SELECT id_material FROM Occurrence_material WHERE id_occurrence=?) AND m.material_availability=?",update, function(err, rows, fields){
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


































//Exportar as funções
module.exports = {
   getMaterialtype:getMaterialtype
};