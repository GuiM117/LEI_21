const PharmForm = require ('../../models/dataset/pharmForm');

//Devolve a lista de forma farmaceuticas
module.exports.listar = () => {
    return PharmForm
        .find()
        .exec()
}

//Consulta um Entry especifico por id
module.exports.consultar = id => {
    return PharmForm
        .findOne({_id: id})
        .exec()
}

//Insere um Entry
module.exports.inserir = p => {
    let dci = new PharmForm(p)
    return dci.save()
}

//Insere várias Entries
module.exports.inserirMts = pForms => {
    return PharmForm
        .insertMany(pForms)
}

//Remove um Entry
module.exports.remover = id => {
    return PharmForm.deleteOne({_id: id})
}