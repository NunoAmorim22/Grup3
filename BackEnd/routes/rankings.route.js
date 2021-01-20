const router = require('express').Router();
const rankingsController = require("../controllers/rankings.controller");


router.get('/', function(req, res) {

    res.send("Rankings");
    res.end();
});


//ranking por equipa
router.get("/teams", rankingsController.getTeamAndCredits);
//ranking por operational
router.get("/operationals", rankingsController.getOperationalRanking);

module.exports = router ;