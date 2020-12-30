//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//Saber tudo de todos os suspeitos e de todos os participantes de todas as ocorrencias
function getALL(req,res) {
    const query = connect.con.query("SELECT o.id_occurrence, s.*, p.* FROM Occurrence o, Suspect s , Participant p WHERE o.id_occurrence  IN (SELECT id_occurrence  FROM Participation) AND s.id_suspect IN (SELECT id_suspect FROM Participation)AND p.id_participant IN (SELECT id_participant FROM Participation) AND s.active=1 AND p.active=1 ORDER BY o.id_occurrence", function(err, rows, fields){
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

//Saber tudo dos suspeitos e das ocorrencias
function getALLSuspects(req,res){
    const idOccurrence = req.params.id;
    
    
        update =[idOccurrence];
    const query =connect.con.query ("SELECT o.id_occurrence, s.* FROM Occurrence o, Suspect s, ParticipationS p WHERE s.id_suspect =p.id_suspect AND o.id_occurrence =p.id_occurrence AND o.id_occurrence=? AND s.active=1", update, function(err, rows, fields){
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

//Saber tudo dos participantes das ocorrencias
function getALLParticipants(req,res){
    const idOccurrence = req.params.id_occu;
    const typep=req.params.type;
    
        update =[typep,idOccurrence];
    const query =connect.con.query ("SELECT o.id_occurrence, pa.* FROM Occurrence o, Participant pa, ParticipationP pe WHERE pa.id_participant =pe.id_participant AND pa.participant_type=? AND o.id_occurrence =pe.id_occurrence AND o.id_occurrence=? AND pa.active=1", update, function(err, rows, fields){
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

//Saber tudo de um suspeito numa determinada ocorrencia
function getSuspectOccurrencebyID(req,res){
    const idOccurrence = req.params.id_occu;
    const idSuspect= req.params.id_susp;
    
    //const post ={ id_suspect : idSuspect, 
       // id_occurrence : idOccurrence};
        update =[idSuspect,idOccurrence];
    const query =connect.con.query ("SELECT o.id_occurrence, s.* FROM Occurrence o, Suspect s, ParticipationS p WHERE s.id_suspect =p.id_suspect AND s.id_suspect=? AND o.id_occurrence =p.id_occurrence AND o.id_occurrence=? AND s.active=1", update, function(err, rows, fields){
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
//Saber tudo de um participante numa determinada ocorrencia
function getParticipantOccurrencebyID(req,res){
    const idParticipant= req.params.id_part;
    const idOccurrence = req.params.id_occu;
    const typep = req.params.type; 
   update=[idParticipant,typep,idOccurrence];                          
    const query =connect.con.query ("SELECT o.id_occurrence, pa.* FROM Occurrence o, Participant pa, ParticipationP pe WHERE pa.id_participant =pe.id_participant AND pa.id_participant=? AND pa.participant_type=? AND o.id_occurrence =pe.id_occurrence AND o.id_occurrence=? AND pa.active=1", update, function(err, rows, fields){
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

//fazer update do suspeito
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
     //const active = req.body.active;
     const active = 1;

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

//fazer update de uma testemunha
function updateWit(req,res){
    req.sanitize("id_participant").escape();
    req.sanitize('name').escape();
    req.sanitize('address').escape();
    req.sanitize("genre").escape();
    req.sanitize('cc_number').escape();
    req.sanitize('naturality').escape();
    req.sanitize('phone_number').escape();
    req.sanitize('email').escape();
    req.sanitize('job').escape();
    req.sanitize('birth_date').escape();
    req.sanitize('participant_type').escape();
    req.sanitize('city').escape();
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
     const idParticipant = req.params.id;  
     const name = req.body.name;
     const address =req.body.address;
     const genre = req.body.genre;
     const cc_number = req.body.cc_number;
     const naturality = req.body.naturality;
     const phone_number = req.body.phone_number;
     const email = req.body.email;
     const job = req.body.job;
     const birth_date = req.body.birth_date;
     //const typep = req.body.participant_type;
     const city = req.body.city;
     const active = 1;
        
     if (idParticipant !='NULL' && typeof(idParticipant != 'undefined')) {
        
        const update = [name,address,genre,cc_number,naturality,phone_number,email,job,birth_date,"Testemunha",city,active,idParticipant];
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

//fazer update de uma Vitima

function updateVictim(req,res){
    req.sanitize("id_participant").escape();
    req.sanitize('name').escape();
    req.sanitize('address').escape();
    req.sanitize("genre").escape();
    req.sanitize('cc_number').escape();
    req.sanitize('naturality').escape();
    req.sanitize('phone_number').escape();
    req.sanitize('email').escape();
    req.sanitize('job').escape();
    req.sanitize('birth_date').escape();
    req.sanitize('participant_type').escape();
    req.sanitize('city').escape();
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
     const idParticipant = req.params.id;  
     const name = req.body.name;
     const address =req.body.address;
     const genre = req.body.genre;
     const cc_number = req.body.cc_number;
     const naturality = req.body.naturality;
     const phone_number = req.body.phone_number;
     const email = req.body.email;
     const job = req.body.job;
     const birth_date = req.body.birth_date;
     //const typep = req.body.participant_type;
     const city = req.body.city;
     const active = 1;
        
     if (idParticipant !='NULL' && typeof(idParticipant != 'undefined')) {
        
        const update = [name,address,genre,cc_number,naturality,phone_number,email,job,birth_date,"Vitima",city,active,idParticipant];
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
//eliminar fisico de testemunha 
function deleteTestemunhaF (req , res) {
    const idParticipant =req.params.id;
    const update = [idParticipant,"Testemunha"];

    if (idParticipant !='NULL' && typeof(idParticipant != 'undefined')) {
    const query = connect.con.query("DELETE FROM Participant WHERE id_participant=? AND participant_type=?", update , function (err, rows, fields){
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
//eliminar fisico de vitima
function deleteVitimaF (req , res) {
    const idParticipant =req.params.id;
    const update = [idParticipant,"Vitima"];

    if (idParticipant !='NULL' && typeof(idParticipant != 'undefined')) {
    const query = connect.con.query("DELETE FROM Participant WHERE id_participant=? AND participant_type=?", update , function (err, rows, fields){
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
//eliminar fisico de suspeito
function deleteSuspectF (req , res) {
    const update =req.params.id;

    if (update!='NULL' && typeof(update) != 'undefined') {
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
}


//inserir suspeitos numa determinada ocorrência              
function postSuspect(req,res){
    req.sanitize("id_occurrence").escape();
    req.sanitize('id_suspect').escape();
    req.sanitize("id_participant").escape();
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
    const idOccurrence = req.params.id_occu;
    //const idSuspect= req.params.id_susp;
    //const idParticipant = req.params.id_participant;
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
    

        const update = [name,naturality,phone_number,genre,cc_number,job,skin_color,eyes_color,hair_color,height,body_shape,active,idOccurrence];
           
            /*//id_suspect:idSuspect,
            //id_participant:idParticipant,
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
            active:active,
            id_occurrence:idOccurrence
        }   */ 

       
        const query = connect.con.query ('INSERT INTO Suspect SET name=?,naturality=?,phone_number=? ,genre=? ,cc_number=? ,job=? ,skin_color=? ,eyes_color=? ,hair_color=? ,height=? ,body_shape=? ,active=?',update, function(err, rows, fields){
            console.log(query.sql);
           
            if(!err){
                //insertquery = res.location(rows.insertId);
                //post=[idOccurrence,insertquery];
                post=[idOccurrence];
                const query = connect.con.query ('INSERT INTO ParticipationS SET id_occurrence=?, id_suspect=(SELECT MAX(id_suspect) FROM Suspect)',post, function(err,rows, fields){
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

//inserir participantes numa determinada ocorrência
function Insertparticipant(req,res){
    req.sanitize("id_occurrence").escape();
    req.sanitize("id_participant").escape();
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

    
    const errors = req.validationErrors();
    console.log(errors);
    if(errors){
        res.send(errors);
        return;
    }
    else{
        const idOccurrence = req.params.id;
        const name = req.body.name;
        const address = req.body.address;
        const genre = req.body.genre;
        const cc_number = req.body.cc_number;
        const naturality = req.body.naturality;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        const job = req.body.job;
        const birth_date = req.body.birth_date;
        const participant_type = "Vitima";
        const city = req.body.city;
        const active = 1;
    

        const update = [name,address,genre,cc_number,naturality,phone_number,email,job,birth_date,participant_type,city,active];
           
            /*//id_suspect:idSuspect,
            //id_participant:idParticipant,
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
            active:active,
            id_occurrence:idOccurrence
        }   */ 

       
        const query = connect.con.query ('INSERT INTO Participant SET name=?,address=?,genre=? ,cc_number=? ,naturality=? ,phone_number=? ,email=? ,job=? ,birth_date=? ,participant_type=? ,city=?, active=?',update, function(err, rows, fields){
            console.log(query.sql);
           
            if(!err){
                //insertquery = res.location(rows.insertId);
                //post=[idOccurrence,insertquery];
                post=[idOccurrence];
                const query = connect.con.query ('INSERT INTO ParticipationP SET id_occurrence=?, id_participant=(SELECT MAX(id_participant)FROM Participant)',post, function(err,rows, fields){
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

//Inserir testemunhas numa determinada ocorrência
function Insertwits(req,res){
    req.sanitize("id_occurrence").escape();
    req.sanitize("id_participant").escape();
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

    
    const errors = req.validationErrors();
    console.log(errors);
    if(errors){
        res.send(errors);
        return;
    }
    else{
        const idOccurrence = req.params.id;
        const name = req.body.name;
        const address = req.body.address;
        const genre = req.body.genre;
        const cc_number = req.body.cc_number;
        const naturality = req.body.naturality;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        const job = req.body.job;
        const birth_date = req.body.birth_date;
        const participant_type = "Testemunha";
        const city = req.body.city;
        const active = 1;
    

        const update = [name,address,genre,cc_number,naturality,phone_number,email,job,birth_date,participant_type,city,active];
           
            /*//id_suspect:idSuspect,
            //id_participant:idParticipant,
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
            active:active,
            id_occurrence:idOccurrence
        }   */ 

       
        const query = connect.con.query ('INSERT INTO Participant SET name=?,address=?,genre=? ,cc_number=? ,naturality=? ,phone_number=? ,email=? ,job=? ,birth_date=? ,participant_type=? ,city=?, active=?',update, function(err, rows, fields){
            console.log(query.sql);
           
            if(!err){
                //insertquery = res.location(rows.insertId);
                //post=[idOccurrence,insertquery];
                post=[idOccurrence];
                const query = connect.con.query ('INSERT INTO ParticipationP SET id_occurrence=?, id_participant=(SELECT MAX(id_participant)FROM Participant)',post, function(err,rows, fields){
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

//EXPORTAR AS FUNÇÕES
module.exports={
    getALL:getALL,
    getALLSuspects: getALLSuspects,
    getALLParticipants: getALLParticipants,
    getSuspectOccurrencebyID:getSuspectOccurrencebyID,
    getParticipantOccurrencebyID:getParticipantOccurrencebyID,
    updateSuspect:updateSuspect,
    updateVictim:updateVictim,
    updateWit:updateWit,
    deleteTestemunhaF:deleteTestemunhaF,
    deleteVitimaF:deleteVitimaF,
    deleteSuspectF:deleteSuspectF,
    postSuspect:postSuspect,
    Insertparticipant:Insertparticipant,
    Insertwits:Insertwits   
};