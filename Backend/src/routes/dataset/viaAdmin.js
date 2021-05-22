const express = require('express');
const router = express.Router();

const Admin = require('../../controllers/dataset/viaAdmin');



/* GET list Admin */
router.get('/listAdmin', (req,res) => {
    Admin.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})


/* POST a new Admin */
router.post('/registAdmin', function(req,res) {
    let ADMIN = {
        _id : req.body.id,
        description: req.body.description
    }

    Admin.inserir(ADMIN)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

router.get('/getViaAdmins', (req,res) => {
    let arrayIds = req.query.ids

    Admin.consultarMts(arrayIds)
         .then(dados => res.json(dados))
         .catch( e => res.json(e))
})

module.exports = router;
