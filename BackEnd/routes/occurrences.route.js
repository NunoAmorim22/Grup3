const router = require('express').Router();
const occurrencesController = require("../controllers/occurrences.controller");

router.get('/', function(req, res) {

    res.send('Occurrences');
    res.end();
});

