const Users = require ('../models/users');

//Devolve a lista de users
module.exports.listar = () => {
    return Users
        .find()
        .exec()
}
//Consulta um user especifico por id
module.exports.consultar = id => {
    return Users
        .findOne({_id: id})
        .exec()
}
//Insere um user
module.exports.inserir = u => {
    let newUser = new Users(u)
    return newUser.save()
}

//Remove um user
module.exports.remover = id => {
    return Users
        .deleteOne({_id: id})
}

module.exports.findEmail = email => {
    return Users.findOne({email: email})
}