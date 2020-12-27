const router = require('express').Router();
const participationsController = require("../controllers/participations.controller");

router.get('/', function(req, res) {

    res.send('Participations');
    res.end();
});

router.get('/all', participationsController.);
router.get('/:id', participantController.getParticipantsId);
router.post('/postParticipants',participantController.postParticipants);
router.put("/del/:id",participantController.deleteParticipantsL);
router.delete("/:id",participantController.deleteParticipantsF);
router.put("/:id",participantController.updatePartcipants);

//No final do DOC
module.exports = router ;