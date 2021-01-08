const router = require('express').Router();
const materialsControllers = require("../controllers/materials.controller");

router.get('/', function(req, res) {

    res.send("Materials");
    res.end();
});










//No final do DOC
module.exports = router ;