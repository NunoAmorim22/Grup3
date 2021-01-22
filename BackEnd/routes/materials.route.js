const router = require('express').Router();
const materialsControllers = require("../controllers/materials.controller");

router.get('/', function(req, res) {

    res.send("Materials");
    res.end();
});

//GET DO TIPO DE MATERIAL
router.get("/allmaterials/:id",materialsControllers.getMaterialtype);
//CONFIRMAR MATERIAL UTILIZADO
router.put("/confirmations/:id_req/materials/:id_mat", materialsControllers.UpdateUsedMaterial);
//REPOR MATERIAL DEPOIS DE USADO
router.put("/resets/:id_req/materials/:id_mat", materialsControllers.UpdateUsedMaterial);







//No final do DOC
module.exports = router ;