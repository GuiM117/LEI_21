const Interactions = require ('../../models/dataset/interactions');


module.exports.listar = () => {
    return Interactions
        .find()
        .exec()
}

module.exports.findInteraction = (chnm1,chnm2) => {
    return Interactions.find({$or: [{chnm1: chnm1, chnm2: chnm2}, {chnm1:chnm2, chnm2:chnm1}]})
}

//Insere um Entry
module.exports.inserir = p => {
    let dci = new Interactions(p)
    return dci.save()
}
//Insere várias Entries
module.exports.inserirMts = ints => {
    return Interactions
        .insertMany(ints)
}

