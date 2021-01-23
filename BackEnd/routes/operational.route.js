const router = require('express').Router();
const operationalController = require("../controllers/operational.controller");

router.get('/', function(req, res) {

    res.send('Operational');
    res.end();
});

//No final do Doc
module.exports = router;

router.get ("/all" , operationalController.getAllOperationals);
router.delete("/deletes/:id" , operationalController.deleteOperationals);
//dados do operacinal - rota para equipa , e resto
router.get("/getOperationalTeam/:id", operationalController.getOprationalDataTeam);
router.get("/rest/:id", operationalController.getOprationalDataRest);
//editar os dados do operacional e altera automaticamente os dados do utilizador- email e password
router.put("/edits/:id", operationalController.EditOperationalData);
//inserir novo user/candidato
router.post("/adminsInserts", operationalController.InsertNewUserAdmin);
//apagar operacionais pelo admin
router.delete("/deletesAd/:id", operationalController.deleteOpByAdmin);
//MARCAR PRESENÇA POR CADA OPERATIONAL
router.put("/checkins/:id", operationalController.checkedPresence);
//RETIRAR PRESENÇA
router.put("/checkouts/:id", operationalController.PresenceReset);

//---------------------------------------------------------------------------
//GET DOS DADOS DE QUEM ESTÁ LOGADO- ID E LOGIN TYPE
router.post("/infologins", operationalController.loginInfo);

//GET DOS DADOS DE ADMIN ID E LOGIN TYPE
router.post("/infologinsadmin", operationalController.AdminloginInfo);

