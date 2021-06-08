const express = require('express');
const router = express.Router();

const Prescription = require('../controllers/prescription');



/* GET page Prescription */
router.get('/listPrescriptions', (req,res) => {
    Prescription.listar()
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

/* POST a new Prescription */
router.post('/registPrescription', function(req,res) {
    if(req.body.name != ""){
        let Presc = {
            patientNumber: req.body.patientNumber,
            entryID: req.body.entryID,
            doctorID: req.body.doctorID
        }

        console.log(Presc)

        Prescription.inserir(Presc)
            .then(dados => res.json(Presc))
            .catch(e => res.json(e))
    }
})

router.post('/registEntry', function(req,res) {
        Prescription.addMed(req.body.id, req.body.entryMed)
            .then(dados => res.json(Presc))
            .catch(e => res.json(e))
})

module.exports = router;