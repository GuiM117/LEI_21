const Entry = require ('../models/entry');

//Devolve a lista de pacientes
module.exports.listar = () => {
    return Entry
        .find()
        .exec()
}

//Consulta um Entry especifico por id
module.exports.consultar = id => {
    return Entry
        .findOne({_id: id})
        .exec()
}

//Insere um Entry
module.exports.inserir = p => {
    let newPatient = new Entry(p)
    return newPatient.save()
}

module.exports.inserirMts = entries => {
    return Entry
        .insertMany(entries)
}

//Remove um Entry
module.exports.remover = id => {
    return Entry.deleteOne({_id: id})
}