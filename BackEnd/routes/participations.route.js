const router = require('express').Router();
const participationsController = require("../controllers/participations.controller");

router.get('/', function(req, res) {

    res.send('Participations');
    res.end();
});

router.get('/all', participationsController.getALL);
router.get('/allsuspects', participationsController.getALLSuspects);
router.get("/allparticipants",participationsController.getALLParticipants);
router.get("/suspectsoccurrences/occurrences/:id/suspects/:id",participationsController.getSuspectOccurrencebyID);
router.get("/participantsocurrences/:id_occu/:id_par",participationsController.getParticipantOccurrencebyID);
/*
router.post('/postParticipants',participantController.postParticipants);
router.put("/del/:id",participantController.deleteParticipantsL);
router.delete("/:id",participantController.deleteParticipantsF);
router.put("/:id",participantController.updatePartcipants);*/

//No final do DOC
module.exports = router ;