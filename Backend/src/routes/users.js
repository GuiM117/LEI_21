const express = require('express');
const router = express.Router();

const User = require('../controllers/users');

/* GET page Users */
router.get('/listUsers', (req,res) => {
    User.listar()
        .then(dados => res.send('users'))
        .catch(e => res.send('error'))
})

/* POST a new User */
router.post('/registUser', function(req,res) {
    console.log("AquiUser")
    if(req.body.name != ""){
        let UserV = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            role: req.body.role,
            birth_date: req.body.birth_date
        }
        User.inserir(UserV)
            .then(dados => res.send('/users'))
            .catch(e => res.send('error'))
    }
})


module.exports = router;