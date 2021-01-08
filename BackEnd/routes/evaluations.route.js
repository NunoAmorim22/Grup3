const router = require('express').Router();
const evaluationsController = require("../controllers/evaluations.controller");

router.get('/', function(req, res) {

    res.send("Evaluations");
    res.end();
});


router.get("/showteamids/:id", evaluationsController.getTeamOfLeader);















module.exports = router ;