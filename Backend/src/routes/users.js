const express = require('express');
const router = express.Router();

const User = require('../controllers/users');

/* GET page Users */
router.get('/listUsers', (req,res) => {
    User.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})

/* POST a new User */
router.post('/registUser', function(req,res) {
    if(req.body.name != ""){
        let UserV = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            role: req.body.role,
        }
        User.inserir(UserV)
            .then(dados => res.json(UserV))
            .catch(e => res.json(error))
    }
})

/* LOGIN */
router.get('/login', ((req, res) => {
    const user = {
        email: req.query.email,
        password: req.query.password
    }
    User.findEmail(user.email)
        .then(dados => {
            if ( user.password === dados.password) res.json({response: true, id: dados._id})
            else res.json({response: false})
        })
        .catch(error => {
            res.json({response: false})
        })
}))


module.exports = router;
