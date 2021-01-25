const router = require('express').Router();
const participationsController = require("../controllers/participations.controller");

router.get('/', function(req, res) {

    res.send('Participations');
    res.end();
});

router.get('/all', participationsController.getALL);
router.get('/allsuspects/occurrence/:id', participationsController.getALLSuspects);
router.get("/allparticipants/occurrence/:id_occu/type/:type",participationsController.getALLParticipants);
router.get("/suspectsoccurrences/occurrences/:id_occu/suspects/:id_susp",participationsController.getSuspectOccurrencebyID);
router.get("/participantsocurrences/occurrences/:id_occu/participants/:id_part/type/:type",participationsController.getParticipantOccurrencebyID);
//PUT- 
router.put("/suspects/:id", participationsController.updateSuspect);
//PUT-
router.put("/victims/:id", participationsController.updateVictim);
//PUT-
router.put("/wits/:id", participationsController.updateWit);
//DELETE-Apagar testemunhas
router.delete("/deletewits/:id",participationsController.deleteTestemunhaF);
//DELETE-Apagar vitimas
router.delete("/deleteVictims/:id",participationsController.deleteVitimaF);
//DELETE-Apagar Suspeitos
router.delete("/deletesuspects/:id",participationsController.deleteSuspectF);
//POST-
router.post("/occurrences/:id_occu",participationsController.postSuspect);
//POST-
router.post("/occurrences/vitima/:id",participationsController.Insertparticipant);
//POST-
router.post("/occurrences/wits/:id",participationsController.Insertwits);

//No final do DOC
module.exports = router ;
