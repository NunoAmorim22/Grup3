const router = require('express').Router();
const occurrencesController = require("../controllers/occurrences.controller");

router.get('/', function(req, res) {

    res.send('Occurrences');
    res.end();
});

router.get("/allActive",occurrencesController.getAllActiveOccurrences);
router.get("/allEnded",occurrencesController.getAllEndedOccurrences);
router.get("/allPart/:id",occurrencesController.getAllParticipations);
router.get("/allPres/:id",occurrencesController.getAllPresences);
router.get("/allActiveTeamOccurrence/:id", occurrencesController.getAllActiveTeamOccurrences);
router.get("/occurrenceData/:id", occurrencesController.getClickedOccurrenceData);
router.put("/closeOccurrence/:id", occurrencesController.CloseOccurrence);
router.put("/arriveOccurrence/:id", occurrencesController.ConfirmArrived);


//No final do DOC
module.exports = router ;