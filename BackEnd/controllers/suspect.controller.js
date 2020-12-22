//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");



//funcao para ir buscar tudo de todos os suspeitos 
function getSuspects(req,res) {
const query = connect.con.query ('SELECT * FROM Suspect order by id_suspect', function(err, rows, fields){
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
//pag 271 fazer uma funcao para ler dados especificos dos suspeitos getSuspectId
function getSuspectId (req,res) {
const idSuspect = req.params.id;
const post = {id_suspect:idSuspect};
const query =connect.con.query ('SELECT * FROM Suspect WHERE ? AND active = 1 order by id_suspect', post, function(err, rows, fields){
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

// funcao para inserir um determinado suspeito na base de dados post atualizar dados na BD nome da tabela postSuspect

function postSuspect (req,res){
    req.sanitize('id_suspect').escape();
    req.sanitize('name').escape();
    req.sanitize('naturality').escape();
    req.sanitize("phone_number").escape();
    req.sanitize('genre').escape();
    req.sanitize('cc_number').escape();
    req.sanitize('job').escape();
    req.sanitize('skin_color').escape();
    req.sanitize('eyes_color').escape();
    req.sanitize('hair_color').escape();
    req.sanitize('height').escape();
    req.sanitize('body_shape').escape();
    
   const errors = req.validationErrors();
   if(errors){
       res.send(errors);
       return;
   }
   else{
    //const idSuspect= req.body.id_suspect;
    const name = req.body.name;
    const naturality = req.body.naturality;
    const phone_number = req.body.phone_number;
    const genre = req.body.genre;
    const cc_number = req.body.cc_number;
    const job = req.body.job;
    const skin_color = req.body.skin_color;
    const eyes_color = req.body.eyes_color;
    const hair_color = req.body.hair_color;
    const height = req.body.height;
    const body_shape = req.body.body_shape;
    const active = 1;
    

        const post = {
            //id_suspect:idSuspect,
            name : name,
            naturality : naturality,
            phone_number: phone_number,
            genre : genre,
            cc_number : cc_number,
            job : job,
            skin_color : skin_color,
            eyes_color : eyes_color,
            hair_color : hair_color,
            height: height,
            body_shape: body_shape,
            active:active
        }       
        const query = connect.con.query ('INSERT INTO Suspect SET ?',post, function(err,post, fields){
            console.log(query.sql);
            if(!err){
                res.status(jsonMessages.db.successInsert.status).send (jsonMessages.db.successInsert);
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

// funcao para eliminar lógicamente um determinado suspeito na base de dados
function deleteSuspectL (req , res) {
    const update = [0,req.params.id];
    const query = connect.con.query("UPDATE Suspect SET active = ? WHERE id_suspect=?", update , function (err, rows, fields){
        console.log(query.sql);
        if (!err){
            res.status(jsonMessages.db.successDelete.status).send (jsonMessages.db.successDelete);
                }
                else{
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
    });
}
 
//funcao para eliminar um determinado suspeito na base de dados
function deleteSuspectF (req , res) {
    const update =req.params.id;
    const query = connect.con.query("DELETE FROM Suspect WHERE id_suspect = ?", update , function (err, rows, fields){
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

//Função para atualizar dados 
function updateSuspect (req,res){
    req.sanitize("id_suspect").escape();
    req.sanitize('name').escape();
    req.sanitize('naturality').escape();
    req.sanitize("phone_number").escape();
    req.sanitize('genre').escape();
    req.sanitize('cc_number').escape();
    req.sanitize('job').escape();
    req.sanitize('skin_color').escape();
    req.sanitize('eyes_color').escape();
    req.sanitize('hair_color').escape();
    req.sanitize('height').escape();
    req.sanitize('body_shape').escape();
    req.sanitize('active').escape();

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
     const idSuspect = req.params.id;   
     const name = req.body.name;
     const naturality = req.body.naturality;
     const phone_number = req.body.phone_number;
     const genre = req.body.genre;
     const cc_number = req.body.cc_number;
     const job = req.body.job;
     const skin_color = req.body.skin_color;
     const eyes_color = req.body.eyes_color;
     const hair_color = req.body.hair_color;
     const height = req.body.height;
     const body_shape = req.body.body_shape;
     const active = req.body.active;
        
     if (idSuspect !='NULL' && typeof(idSuspect) != 'undefined') {
        
        const update = [name,naturality,phone_number,genre,cc_number,job,skin_color,eyes_color,hair_color,height,body_shape,active,idSuspect];
        const query = connect.con.query("UPDATE Suspect SET name=?,naturality=?,phone_number=?,genre=?,cc_number=?,job=?,skin_color=?,eyes_color=?,hair_color=?,height=?,body_shape=?,active=? WHERE id_suspect=?", update, function (err, rows, fields){
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

    module.exports = { 
        getSuspects: getSuspects,
        getSuspectId:getSuspectId,
        postSuspect:postSuspect,
        deleteSuspectL: deleteSuspectL,
        deleteSuspectF: deleteSuspectF,
        updateSuspect: updateSuspect
    };