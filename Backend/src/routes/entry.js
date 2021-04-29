const express = require('express');
const router = express.Router();

const Entry = require('../controllers/entry');



/* GET page Entry */
router.get('/listEntry', (req,res) => {
    Entry.listar()
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

/* POST a new Entry */
router.post('/registEntry', function(req,res) {
    if(req.body.name != ""){
        let Presc = {
            med: req.body.med,
            initDate: req.body.initDate,
            endDate: req.body.endDate,
            description: req.body.description,
            dosagePerDay: req.body.dosagePerDay
        }
        Entry.inserir(Presc)
            .then(dados => res.json(Presc))
            .catch(e => res.json(e))
    }
})


module.exports = router;