const express = require('express');
const router = express.Router();

const Med = require('../controllers/meds');

/* GET page Meds */
router.get('/listMeds', (req,res) => {
    Med.listar()
        .then(dados => res.send('meds'))
        .catch(e => res.send('error'))
})

/* POST a new Med */
router.post('/registMed', function(req,res) {
    console.log("Aqui")
    if(req.body.name != ""){
        let MedV = {
            name: req.body.name,
            description: req.body.description,
            medType: req.body.medType
        }
        Med.inserir(MedV)
            .then(dados => res.send('/meds'))
            .catch(e => res.send('error'))
    }
})
module.exports = router;
