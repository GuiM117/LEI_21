const ViaAdmin = require ('../../models/dataset/viaAdmin');

//Devolve a lista de unidades medicas
module.exports.listar = () => {
    return ViaAdmin
        .find()
        .exec()
}

//Consulta um Entry especifico por id
module.exports.consultar = id => {
    return ViaAdmin
        .findOne({_id: id})
        .exec()
}

//
module.exports.consultarMts = ids => {
    return ViaAdmin.find({_id: { $in : ids}})
}

//Insere um unitMed
module.exports.inserir = p => {
    let via = new ViaAdmin(p)
    return via.save()
}
//Insere várias Entries
module.exports.inserirMts = vAdmin => {
    return ViaAdmin
        .insertMany(vAdmin)
}


//Remove um unitMed
module.exports.remover = id => {
    return ViaAdmin.deleteOne({_id: id})
}