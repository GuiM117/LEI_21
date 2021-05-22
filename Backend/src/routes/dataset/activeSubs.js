const express = require('express');
const router = express.Router();

const Med = require('../../controllers/dataset/activeSubs');



/* GET page Meds */
router.get('/listMeds', (req,res) => {
    Med.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})

router.post('/registAdministrationFormID', function(req,res) {
    Med.addAdministrationFormID(req.body.chnm, req.body.id)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})



/* POST a new Med */
router.post('/registMed', function(req,res) {
    if(req.body.name != ""){
        let MedV = {
            chnm: req.body.chnm,
            name: req.body.name,
            dci_ID: req.body.dci_ID,
            farmForm_ID : req.body.farmForm_ID,
            containerForm_ID: req.body.containerForm_ID,
            capacity: req.body.capacity,
            capacityUnit_ID: req.body.capacityUnit_ID,
            administrationForm_IDs: req.body.administrationForm_IDs
        }
        console.log(MedV.administrationForm_IDs)


        Med.inserir(MedV)
            .then(dados => res.json(MedV))
            .catch(e => res.json(e))
    }
})

module.exports = router;
