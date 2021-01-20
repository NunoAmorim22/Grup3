const router = require('express').Router();
const rankingsController = require("../controllers/rankings.controller");


router.get('/', function(req, res) {

    res.send("Rankings");
    res.end();
});


module.exports = router ;