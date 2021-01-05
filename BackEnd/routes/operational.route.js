const router = require('express').Router();
const operationalController = require("../controllers/operational.controller");

router.get('/', function(req, res) {

    res.send('Operational');
    res.end();
});