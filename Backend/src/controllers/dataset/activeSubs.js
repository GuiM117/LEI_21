const Med = require ('../../models/dataset/activeSubs');

//Devolve a lista de meds
module.exports.listar = () => {
    return Med
        .find()
        .exec()
}

//Consulta um med especifico por id
module.exports.consultar = chmd => {
    return Med
        .findOne({chmd: chmd})
        .exec()
}

//Insere um med
module.exports.inserir = m => {
    let newMed = new Med(m)
    return newMed.save()
}

//Remove um med
module.exports.remover = chmd => {
    return Med
        .deleteOne({chmd: chmd})
}

//Inserir muitos
module.exports.inserirMts = meds => {
    return Med
        .insertMany(meds)
}

// Insert new entry for medication
module.exports.addAdministrationFormID = (chnm,id) => {
    return Med.findOneAndUpdate({chnm: chnm}, {$addToSet: {administrationForm_IDs: id}}, {new: true})
}