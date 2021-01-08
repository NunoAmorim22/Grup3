const router = require('express').Router();
const evaluationsController = require("../controllers/evaluations.controller");

router.get('/', function(req, res) {

    res.send("Evaluations");
    res.end();
});

//get da equipa de um operacional se ele nao for leader
router.get("/showteamids/:id", evaluationsController.getTeamOfLeader);
//atualiza os creditos de um operacional numa ocorrencia e ainda os creditos totais do mesmo
router.put("/occurrences/id_occu/refresh/:id_op", evaluationsController.updateCreditsOp1);















module.exports = router ;