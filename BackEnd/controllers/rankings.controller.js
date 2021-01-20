
const connect = require('../config/connect.js');

// GET DOS CREDITOS DAS EQUIPAS

function getTeamAndCredits(req,res){
    
    const query =connect.con.query ("SELECT t.team_indicative, SUM(op.total_credits)  FROM Team t, Team_Inscription ti, Operational op WHERE t.id_team=ti.id_team AND op.id_operational=ti.id_operational GROUP BY t.team_indicative desc", function(err, rows, fields){
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

// GET DOS CREDITOS DOS OPERACIONAIS

function getOperationalRanking(req,res){
    
    const query =connect.con.query ("SELECT op.id_operational, op.total_credits FROM Operational op Order By op.total_credits desc;", function(err, rows, fields){
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

module.exports={
    getTeamAndCredits:getTeamAndCredits,
    getOperationalRanking

}