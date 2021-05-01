const express = require('express');
const router = express.Router();

const Interactions = require('../../controllers/dataset/interactions');



/* GET list Interactions */
router.get('/listInteractions', (req,res) => {
    Interactions.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})


/* POST a new Interactions */
router.post('/registInteractions', function(req,res) {
    let interactions = {
        chnm1 : req.body.chnm1,
        chnm2 : req.body.chnm2,
        descriptionMed: req.body.descriptionMed,
        descriptionPharm: req.body.descriptionPharm,
        descriptionEnf: req.body.descriptionEnf,
        descriptionFull: req.body.descriptionFull
    }

    Interactions.inserir(interactions)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

module.exports = router;
