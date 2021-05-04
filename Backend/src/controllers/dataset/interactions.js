const Interactions = require ('../../models/dataset/interactions');


module.exports.listar = () => {
    return Interactions
        .find()
        .exec()
}


/*module.exports.consultar =  => {
    return Interactions
        .findOne({_id: id})
        .exec()
}*/

//Insere um Entry
module.exports.inserir = p => {
    let dci = new Interactions(p)
    return dci.save()
}

/*
//Remove um Entry
module.exports.remover = id => {
    return Interactions.deleteOne({_id: id})
}*/
