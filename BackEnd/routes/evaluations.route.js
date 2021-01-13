const router = require('express').Router();
const evaluationsController = require("../controllers/evaluations.controller");

router.get('/', function(req, res) {

    res.send("Evaluations");
    res.end();
});

//get da equipa de um operacional se ele nao for leader
router.get("/showteamids/:id", evaluationsController.getTeamOfLeader);
//atualiza os creditos de um operacional numa ocorrencia e ainda os creditos totais do mesmo- Um agradecimento especial ao FRONTEND :)
router.put("/occurrences/:id_occu/refresh/:id_op", evaluationsController.updateCreditsOp1);
// atualiza creditos do 2 operacional avaliado
router.put("/occurrences/:id_occu/refresh2/:id_op", evaluationsController.updateCreditsOp2);
// atualiza creditos do 3 operacional avaliado
router.put("/occurrences/:id_occu/refresht3/:id_op", evaluationsController.updateCreditsOp3);
// atualiza creditos do 4 operacional avaliado
router.put("/occurrences/:id_occu/refresht4/:id_op", evaluationsController.updateCreditsOp4);
















module.exports = router ;