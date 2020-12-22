//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//funcao para ir buscar tudo de todos os suspeitos 
function getParticipants(req,res) {
    const query = connect.con.query ('SELECT * FROM Participant WHERE active = 1 order by id_participant', function(err, rows, fields){
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
    function getParticipantsId (req,res) {
    const idParticipant = req.params.id;
    const post = {id_participant:idParticipant};
    const query =connect.con.query ('SELECT * FROM Participant WHERE ? AND active = 1 order by id_participant', post, function(err, rows, fields){
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
    
    function postParticipants(req,res){
        req.sanitize('id_participant').escape();
        req.sanitize('name').escape();
        req.sanitize('address').escape();
        req.sanitize("genre").escape();
        req.sanitize("cc_number").escape();
        req.sanitize('naturality').escape();
        req.sanitize('phone_number').escape();
        req.sanitize('email').escape();
        req.sanitize('job').escape();
        req.sanitize('birth_date').escape();
        req.sanitize('participant_type').escape();
        req.sanitize('city').escape();
        
       const errors = req.validationErrors();
       if(errors){
           res.send(errors);
           return;
       }
       else{
        //const idParticipant = req.body.id_participant;
        const name = req.body.name;
        const address = req.body.address;
        const genre = req.body.genre;
        const cc_number = req.body.cc_number;
        const naturality = req.body.naturality;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        const job = req.body.job;
        const birth_date = req.body.birth_date;
        const participant_type = req.body.participant_type;
        const city = req.body.city;
        const active = 1;
        
        if  (participant_type!='NULL' && typeof(participant_type) != 'undefined' ) {
            const post = {
                //idParticipant:id_participant,
                name : name,
                address: address,
                genre:genre,
                cc_number: cc_number,
                naturality: naturality,
                phone_number:phone_number,
                email:email,
                job : job,
                birth_date:birth_date,
                participant_type:participant_type,
                city:city,
                active:active
            };
            const query = connect.con.query ('INSERT INTO Participant SET ?',post, function(err, post, fields){
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
            }  else
                res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData.msg);
            }
        }
    
    // funcao para eliminar lógicamente um determinado suspeito na base de dados
    function deleteParticipantsL (req , res) {
        const update = [0,req.params.id];
        const query = connect.con.query("UPDATE Participant SET active = ? WHERE id_participant=?", update , function (err, rows, fields){
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
    function deleteParticipantsF (req , res) {
        const update =req.params.id;
        const query = connect.con.query("DELETE FROM Participant WHERE id_participant = ?", update , function (err, rows, fields){
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
    function updatePartcipants(req,res){
        req.sanitize('id_participant').escape();
        req.sanitize('name').escape();
        req.sanitize('address').escape();
        req.sanitize("genre").escape();
        req.sanitize("cc_number").escape();
        req.sanitize('naturality').escape();
        req.sanitize('phone_number').escape();
        req.sanitize('email').escape();
        req.sanitize('job').escape();
        req.sanitize('birth_date').escape();
        req.sanitize('participant_type').escape();
        req.sanitize('city').escape();
        req.sanitize("active").escape();
    
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
            const idParticipant = req.params.id;
            const name = req.body.name;
            const address = req.body.address;
            const genre = req.body.genre;
            const cc_number = req.body.cc_number;
            const naturality = req.body.naturality;
            const phone_number = req.body.phone_number;
            const email = req.body.email;
            const job = req.body.job;
            const birth_date = req.body.birth_date;
            const participant_type = req.body.participant_type;
            const city = req.body.city;
            const active = 1;


         if (idParticipant !='NULL' && typeof(idParticipant) != 'undefined' &&  participant_type!='NULL' && typeof(participant_type) != 'undefined' ) {
            const update = [name,address,genre,cc_number,naturality,phone_number,email,job,birth_date,participant_type,city,active,idParticipant];
            const query = connect.con.query("UPDATE Participant SET name=?,address=?,genre=?,cc_number=?,naturality=?,phone_number=?,email=?,job=?,birth_date=?,participant_type=?,city=?,active=? WHERE id_participant=?", update, function (err, rows, fields){
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
            getParticipants: getParticipants,
            getParticipantsId:getParticipantsId,
            postParticipants:postParticipants,
            deleteParticipantsL: deleteParticipantsL,
            deleteParticipantsF: deleteParticipantsF,
            updatePartcipants: updatePartcipants
        };