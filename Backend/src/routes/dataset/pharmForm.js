const express = require('express');
const router = express.Router();

const PharmForm = require('../../controllers/dataset/pharmForm');



/* GET list PharmForm */
router.get('/listPharmForm', (req,res) => {
    PharmForm.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})


/* POST a new PharmForm */
router.post('/registPharmForm', function(req,res) {
    let pharmForm = {
        _id : req.body.id,
        description: req.body.description
    }

    PharmForm.inserir(pharmForm)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

router.get('/getPharmForm', (req,res) => {
    let idPharmForm = req.query.id

    PharmForm.consultar(idPharmForm)
        .then (dados => res.json(dados.description))
})

module.exports = router;
