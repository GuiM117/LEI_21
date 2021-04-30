const Patient = require ('../models/patient');

//Devolve a lista de pacientes
module.exports.listar = () => {
    return Patient
        .find()
        .exec()
}

//Consulta um Patient especifico por id
module.exports.consultar = id => {
    return Patient
        .findOne({_id: id})
        .exec()
}
//Insere um Patient
module.exports.inserir = p => {
    let newPatient = new Patient(p)
    return newPatient.save()
}

//Remove um Patient
module.exports.remover = id => {
    return Patient.deleteOne({_id: id})
}