const Med = require ('../models/users');

//Devolve a lista de users
module.exports.listar = () => {
    return User
        .find()
        .exec()
}
//Consulta um user especifico por id
module.exports.consultar = id => {
    return User
        .findOne({_id: id})
        .exec()
}
//Insere um user
module.exports.inserir = u => {
    let newUser = new User(u)
    return newUser.save()
}

//Remove um user
module.exports.remover = id => {
    return User
        .deleteOne({_id: id})
}