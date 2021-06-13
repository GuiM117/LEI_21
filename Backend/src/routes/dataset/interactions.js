const express = require('express');
const router = express.Router();

const Interactions = require('../../controllers/dataset/interactions');



/* GET list Interactions */
router.get('/listInteractions', (req,res) => {
    Interactions.listar()
        .then(dados => res.json(dados))
        .catch(e => res.send('error'))
})


/* POST a new Interactions */
router.post('/registInteractions', function(req,res) {
    let interactions = {
        chnm1 : req.body.chnm1,
        chnm2 : req.body.chnm2,
        descriptionMed: req.body.descriptionMed,
        descriptionPharm: req.body.descriptionPharm,
        descriptionEnf: req.body.descriptionEnf,
        descriptionFull: req.body.descriptionFull
    }

    Interactions.inserir(interactions)
        .then(dados => res.json(dados))
        .catch(e => res.json(e))
})

router.get("/interaction", (req,res) => {
    let chnms = req.query.chnms.split(',')
    let interactions = []

    for(let i=0; i < chnms.length; i++) {
        let chnm1 = chnms[i]
        for (let j = i + 1; j < chnms.length; j++){
            let chnm2 = chnms[j]
            let interac = Interactions.findInteraction(chnm1,chnm2)
            interactions.push(interac)
        }
    }

    Promise.all(interactions)
        .then(dados => {
            let response = []
            for (let i=0;i<dados.length;i++){
                if (dados[i].length !== 0){
                   if (dados[i][0].descriptionFull !== "") {
                        let entry = {
                            chnm1: dados[i][0].chnm1,
                            chnm2: dados[i][0].chnm2,
                            description: dados[i][0].descriptionFull
                        }
                        response.push(entry)
                    }
                }
            }

            res.json(response)

        })
        .catch(error => res.json("false"))


})

module.exports = router;
