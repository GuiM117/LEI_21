const Dci = require ('../../models/dataset/dci');

//Devolve a lista de pacientes
module.exports.listar = () => {
    return Dci
        .find()
        .exec()
}

//Consulta um Entry especifico por id
module.exports.consultar = id => {
    return Dci
        .findOne({_id: id})
        .exec()
}

//Insere um Entry
module.exports.inserir = p => {
    let dci = new Dci(p)
    return dci.save()
}

//Insere várias Entries
module.exports.inserirMts = dcis => {
    return Dci
        .insertMany(dcis)
}

//Remove um Entry
module.exports.remover = id => {
    return Dci.deleteOne({_id: id})
}