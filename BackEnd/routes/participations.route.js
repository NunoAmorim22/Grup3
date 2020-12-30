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
router.put("/suspects/:id", participationsController.updateSuspect);
router.put("/victims/:id", participationsController.updateVictim);
router.put("/wits/:id", participationsController.updateWit);
router.delete("/deletewits/:id",participationsController.deleteTestemunhaF);
router.delete("/deleteVictims/:id",participationsController.deleteVitimaF);
router.delete("/deletesuspects/:id",participationsController.deleteSuspectF);
router.post("/occurrences/:id_occu",participationsController.postSuspect);
router.post("/occurrence/:id",participationsController.postParticipant);

//No final do DOC
module.exports = router ;
