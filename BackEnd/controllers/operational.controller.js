//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");
var bCrypt = require('bcrypt-nodejs');


//get de todos os operacionais
//id e nome

function getAllOperationals(req,res){
    
    

    const query =connect.con.query ("SELECT o.id_operational, c.name FROM Operational o, Candidate c WHERE o.id_candidate=c.id_candidate", function(err, rows, fields){
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

//delete operacionais 
// id_operational
function deleteOperationals (req , res) {
    const idOperational =req.params.id;

    if (idOperational!='NULL' && typeof(idOperational) != 'undefined') {
    const query = connect.con.query("DELETE FROM Operational WHERE id_operational = ?", idOperational , function (err, rows, fields){
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
}

//get dos dados de operacional para o perfil
//levar id de operacional
// vai buscar a equipa


function getOprationalDataTeam(req,res){
    
    idOperational=req.params.id;

    const query =connect.con.query ("SELECT   DISTINCT  t.team_indicative FROM Team_Inscription ti, Team t WHERE t.id_team=ti.id_team AND ti.id_team IN (SELECT t.id_team FROM Team_Inscription ti, Operational op, Team t, Occurrence o WHERE op.id_operational=ti.id_operational AND ti.id_team=t.id_team AND op.id_operational=?)",idOperational, function(err, rows, fields){
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



// vai buscar o resto dos dados do operacional quando se clica
//aparecer Email,id,nome,equipa , creditos e pass
function getOprationalDataRest(req,res){
    
    idOperational=req.params.id;

    const query =connect.con.query ("SELECT c.email, op.id_operational, c.name, op.total_credits, u.password  FROM Candidate c, Operational op, User_old u WHERE op.id_user=u.id_user AND op.id_candidate=c.id_candidate AND op.id_operational =?",idOperational, function(err, rows, fields){
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

// editar um operacional
// vai alterar email, nome, password e confirmar password
// vai receber id_operacional


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
    var password= req.body.password;
    

        const update = [name,email,idOperational];
           
        
        const query = connect.con.query ('UPDATE Candidate SET name=?, email=? WHERE id_candidate=(SELECT id_candidate FROM Operational WHERE id_operational=?)',update, function(err, rows, fields){
            console.log(query.sql);
           
            if(!err){
                //insertquery = res.location(rows.insertId);
                //post=[idOccurrence,insertquery];
                post=[email, password, idOperational];
                const query = connect.con.query ('UPDATE User_old SET email=?, password=? WHERE id_user=(SELECT id_user FROM Operational WHERE id_operational=?)',post, function(err,rows, fields){
                    console.log(query.sql);
                    //res.status(jsonMessages.db.successInsert.status).send (jsonMessages.db.successInsert);
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

                if(!err){
                    
                    var generateHash = function(password) { 
                        console.log(password);
                
                        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                      };

                      var userPassword = generateHash(password);

                     var post=[email, userPassword, idOperational];

                const query = connect.con.query ('UPDATE users SET email=?, password=? WHERE id=(SELECT id_user FROM Operational WHERE id_operational=?)',post, function(err,rows, fields){
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


// post para  o admin inserir novos operacionais e criar automaticamente conta
// 1 - criar user
// 2 - criar candidato
// 3 - criar operacional :: só quando sit = "ACEITE"

function InsertNewUserAdmin(req,res){
    req.sanitize("name").escape();
    req.sanitize("email").escape();
    req.sanitize('password').escape();

    
    const errors = req.validationErrors();
    console.log(errors);
    if(errors){
        res.send(errors);
        return;
    }
    else{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const candidateType= "Operador";
        const candidateSit="Pendente";

    

        const update = [email, password];
           
            
       
        const query = connect.con.query ('INSERT INTO User_old SET email=?, password=?',update, function(err, rows, fields){
            console.log(query.sql);
           
            if(!err){

              //inserir candidato com situação "pendente"
                post=[name, email, candidateType, candidateSit];
                const query = connect.con.query ('INSERT INTO Candidate SET name=?, email=?, candidate_type= ?, candidate_situation=?',post, function(err,rows, fields){
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

// delete operacionais pelo admin 

function deleteOpByAdmin(req , res) {
    const idOperacional=req.params.id;
    const update = [idOperacional];

    if (update !='NULL' && typeof(update != 'undefined')) {
    const query = connect.con.query("DELETE FROM User_old WHERE id_user=(SELECT id_user FROM  Operational WHERE id_operational=?)", update , function (err, rows, fields){
        console.log(query.sql);
        if (!err){
            //res.status(jsonMessages.db.successDeleteU.status).send (jsonMessages.db.successDeleteU);

            const query = connect.con.query("DELETE FROM Candidate WHERE id_candidate=(SELECT id_candidate FROM Operational WHERE id_operational=?)" , update , function (err, rows, fields){
                console.log(query.sql);
                if (!err){
                    const query = connect.con.query("DELETE FROM Operational WHERE id_operational=?" , update , function (err, rows, fields){
                        console.log(query.sql);
                        if (!err){
                            res.status(jsonMessages.db.successDeleteU.status).send (jsonMessages.db.successDeleteU);
                                }
                                else{
                                    console.log(err);
                                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                                }
                    });
                    //res.status(jsonMessages.db.successDeleteU.status).send (jsonMessages.db.successDeleteU);
                        }
                        else{
                            console.log(err);
                            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        }
            });
                }
                else{
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
    });
    }
}

function checkedPresence(req,res){
    req.sanitize("operational_presenc_conf").escape();
    req.sanitize("id_operational").escape();

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
     const idPresence="1"; 
     const idOccurrence=req.params.id;
        
     if (idOccurrence!='NULL' && typeof(idOccurrence!= 'undefined')) {
        
        const update = [idPresence,idOccurrence];
        const query = connect.con.query("UPDATE Operational_evaluation SET operational_presence_conf=? WHERE id_operational=?", update, function (err, rows, fields){
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


//GET DE DADOS DO USER QUE ESTÁ LOGADO
//SELECT DE ID_OPERATIONAL
//SELECT DE LOGIN TYPE

function loginInfo(req,res){
    
    const email=req.body.email;
    const post=[email];
    const query =connect.con.query ("SELECT op.id_operational, uso.login_type FROM users us, User_old uso, Operational op  WHERE us.email=uso.email  AND us.email=? AND op.id_user=uso.id_user ",post, function(err, rows, fields){
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



//login info admin
//tabela users
// retorna nome , email e login_type

function AdminloginInfo(req,res){
    
   const email=req.body.email;
   const typeL= "Admin";

   const post=[email, typeL];
    const query =connect.con.query ("SELECT  us.tipo FROM users us WHERE  us.email=? AND us.tipo=?", post, function(err, rows, fields){
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

//reset presença
//tabela operational_evaluations

function PresenceReset(req,res){
    req.sanitize("operational_presenc_conf").escape();
    req.sanitize("id_operational").escape();

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
     const idPresence="0"; 
     const idOccurrence=req.params.id;
        
     if (idOccurrence!='NULL' && typeof(idOccurrence!= 'undefined')) {
        
        const update = [idPresence,idOccurrence];
        const query = connect.con.query("UPDATE Operational_evaluation SET operational_presence_conf=? WHERE id_operational=?", update, function (err, rows, fields){
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

//altera password
//altera tabela users
//put

function changePassword(req,res){
    req.sanitize("email").escape();
    req.sanitize("password").escape();


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
        const email=req.body.email;
        var password =req.body.password;
         var generateHash = function(password) { 
            console.log(password);
    
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
          };
        //encriptada
        var userPassword = generateHash(password);
        
       
     if (email!='NULL' && typeof(email!= 'undefined')) {


          var post=[userPassword, email];
        
        const query = connect.con.query("UPDATE users AS us INNER JOIN User_old AS uso ON us.email=uso.email SET us.password=? WHERE us.email=?", post, function (err, rows, fields){
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
    getAllOperationals:getAllOperationals,
    deleteOperationals:deleteOperationals,
    getOprationalDataTeam:getOprationalDataTeam,
    getOprationalDataRest:getOprationalDataRest,
    EditOperationalData:EditOperationalData,
    InsertNewUserAdmin:InsertNewUserAdmin,
    deleteOpByAdmin:deleteOpByAdmin,
    checkedPresence:checkedPresence,
    loginInfo:loginInfo,
    AdminloginInfo:AdminloginInfo,
    PresenceReset:PresenceReset,
    changePassword:changePassword
};