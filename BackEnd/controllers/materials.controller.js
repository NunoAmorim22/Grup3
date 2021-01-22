//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//Get do tipo de material disponivel da lista de todos os materiais existentes
//Vai levar o id de ocorrencia na rota 
function getMaterialtype(req,res){
    const idOccurrence=req.params.id;
    update =["Disponível",idOccurrence];
    const query =connect.con.query ("SELECT m.category, om.quantity, om.id_material FROM Material m ,Occurrence_material om, Occurrence o  WHERE o.id_request=om.id_request AND om.id_material=m.id_material  AND  m.id_material IN (SELECT id_material FROM Material) AND m.material_availability= ? AND o.id_occurrence=?",update, function(err, rows, fields){
        console.log(query.sql);

        someVar=[];
        function setValue(value) {
            someVar = value;
            console.log(someVar);
          }
    
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
                        setValue(rows);
                    }
                }
    
    });
}

// confirmar material utilizado
// get de quantidades do id de material
//put atualizar material - tirar quantidade utilizada ao total
// Material e Occurrence Material

function UpdateUsedMaterial(req,res){
    req.sanitize("id_request").escape();
    req.sanitize("id_material").escape();
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
     const idRequest= req.params.id_req;
     const idMaterial= req.params.id_mat;
        
     if (idRequest!='NULL' && typeof(idRequest!= 'undefined')) {
        
        const update = [idRequest, idMaterial];
        const query = connect.con.query("UPDATE Material SET material_quantity = material_quantity - (SELECT quantity FROM Occurrence_material WHERE id_request=? AND id_material=?) WHERE id_material=?;", update, function (err, rows, fields){
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


// Reposição de material -finalizar ocorrencia



//Exportar as funções
module.exports = {
   getMaterialtype:getMaterialtype,
   UpdateUsedMaterial:UpdateUsedMaterial
};