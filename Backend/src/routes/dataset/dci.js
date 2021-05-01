const express = require('express');
const router = express.Router();

const Dci = require('../../controllers/dataset/dci');



/* GET list DCI */
router.get('/listDci', (req,res) => {
    Dci.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})


/* POST a new DCI */
router.post('/registDci', function(req,res) {
    let DCI = {
        _id : req.body.id,
        description: req.body.description
    }

    Dci.inserir(DCI)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

module.exports = router;
