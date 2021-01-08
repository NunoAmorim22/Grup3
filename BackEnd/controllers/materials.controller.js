//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//Get do tipo de material disponivel da lista de todos os materiais existentes
//Vai levar o id de ocorrencia na rota 
function getMaterialtype(req,res){
    const query =connect.con.query ("SELECT m.category FROM Material m , Occurrence_material om WHERE m.id_material IN (SELECT id_material FROM Material WHERE id_occurrence=?) AND m.material_availability=?", function(err, rows, fields){
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