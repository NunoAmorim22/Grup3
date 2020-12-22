const router = require('express').Router();
const participantController = require("../controllers/participant.controller");

router.get('/', function(req, res) {

    res.send('Participants');
    res.end();
});

router.get('/all', participantController.getParticipants);
router.get('/:id', participantController.getParticipantsId);
router.post('/postParticipants',participantController.postParticipants);
router.put("/del/:id",participantController.deleteParticipantsL);
router.delete("/:id",participantController.deleteParticipantsF);
router.put("/:id",participantController.updatePartcipants);

//No final do DOC
module.exports = router ;