const UnitMed = require ('../../models/dataset/unitMed');

//Devolve a lista de unidades medicas
module.exports.listar = () => {
    return UnitMed
        .find()
        .exec()
}

//Consulta um Entry especifico por id
module.exports.consultar = id => {
    return UnitMed
        .findOne({_id: id})
        .exec()
}

//Insere um unitMed
module.exports.inserir = p => {
    let dci = new UnitMed(p)
    return dci.save()
}

//Insere várias Entries
module.exports.inserirMts = uMeds => {
    return UnitMed
        .insertMany(uMeds)
}

//Remove um unitMed
module.exports.remover = id => {
    return UnitMed.deleteOne({_id: id})
}