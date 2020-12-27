//conectar BD e mensagens
const connect = require('../config/connect.js');
const jsonMessages = require("../assets/jsonMessages/bd");

//Saber os suspeitos de determinada ocorrencia
function getSuspectsInOccurrence(req,res) {
    const query = connect.con.query('SELECT o.id_occurrence, s.* FROM Occurrence o, Suspect s order by s.id_suspect WHERE o.id_occurrence IN (SELECT id_occurrence FROM Participation) AND s.id_suspect IN (SELECT id_suspect FROM Participation) AND s.active=1', function(err, rows, fields){
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


