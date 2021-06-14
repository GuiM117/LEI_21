const express = require('express');
const router = express.Router();

const Entry = require('../controllers/entry');



/* GET page Entry */
router.get('/listEntry', (req,res) => {
    Entry.listar()
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})


/* GET prescriptions por id da presc */
router.get('/:id', function(req, res) {
    var id = req.params.id
    //console.log(id);
    Entry.consultar(id)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

/* POST a new Entry */
router.post('/registEntry', function(req,res) {
    if(req.body.name != ""){
        let Presc = {
            chnm: req.body.chnm,
            initDate: req.body.initDate,
            endDate: req.body.endDate,
            description: req.body.description
        }
        Entry.inserir(Presc)
            .then(dados => res.json(dados._id))
            .catch(e => res.json(e))
    }
})

router.post('/registEntries', function(req,res) {
        let entries = req.body.entries


        Entry.inserirMts(entries)
            .then(dados => {
                let idEntries = []
                for (let i = 0; i< dados.length; i++) idEntries.push(dados[i]._id)
                console.log(idEntries)
                res.json({idEntries: idEntries})
            })
            .catch(e => res.json(e))

})

module.exports = router;