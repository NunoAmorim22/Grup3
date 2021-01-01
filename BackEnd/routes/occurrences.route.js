const router = require('express').Router();
const occurrencesController = require("../controllers/occurrences.controller");

router.get('/', function(req, res) {

    res.send('Occurrences');
    res.end();
});

router.get("/allActive",occurrencesController.getAllActiveOccurrences);
router.get("/allEnded",occurrencesController.getAllEndedOccurrences);
router.get("/allPart",occurrencesController.getAllParticipations);
router.get("/allPres",occurrencesController.getAllPresences);

//No final do DOC
module.exports = router ;