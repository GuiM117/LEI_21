const Med = require ('../models/meds');

//Devolve a lista de meds
module.exports.listar = () => {
    return Med
        .find()
        .exec()
}
//Consulta um med especifico por id
module.exports.consultar = id => {
    return Med
        .findOne({_id: id})
        .exec()
}
//Insere um med
module.exports.inserir = m => {
    let newMed = new Med(m)
    return newMed.save()
}

//Remove um med
module.exports.remover = id => {
    return Med
        .deleteOne({_id: id})
}

//Inserir muitos
module.exports.inserirMts = meds => {
    return Med
        .insertMany(meds)
}