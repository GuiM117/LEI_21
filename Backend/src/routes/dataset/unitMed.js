const express = require('express');
const router = express.Router();

const UnitMed = require('../../controllers/dataset/unitMed');



/* GET list UnitMed */
router.get('/listUnitMed', (req,res) => {
    UnitMed.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})


/* POST a new UnitMed */
router.post('/registUnitMed', function(req,res) {
    let unitMed = {
        _id : req.body.id,
        description: req.body.description
    }

    UnitMed.inserir(unitMed)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

router.get('/getUnitMed', (req,res) => {
    let idUnitMedic = req.query.id

    UnitMed.consultar(idUnitMedic)
           .then(dados => res.json(dados.description))
           .catch(e => res.json(e))
})

module.exports = router;
