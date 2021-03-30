const express = require('express');
const router = express.Router();

const Patient = require('../controllers/patients');

/* GET page Users */
router.get('/listPatients', (req,res) => {
    Patient.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})

/* POST a new Patient */
router.post('/registPatient', function(req,res) {
    if(req.body.name != ""){
        let PatientV = {
            email: req.body.email,
            name: req.body.name,
            sex: req.body.sex,
            birth_date: req.body.birth_date,
            episode_number: req.body.episode_number
        }
        Patient.inserir(PatientV)
            .then(dados => res.json(PatientV))
            .catch(e => res.send('error'))
    }
})


module.exports = router;
