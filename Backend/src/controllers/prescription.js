const Prescription = require ('../models/prescription');

//Devolve a lista de pacientes
module.exports.listar = () => {
    return Prescription
        .find()
        .exec()
}
//Consulta um Prescription especifico por id
module.exports.consultar = id => {
    return Prescription
        .findOne({_id: id})
        .exec()
}

//Consulta um Prescription especifico por id do Med
module.exports.consultarIDMed = id => {
    return Prescription
        .find({doctorID: id})
        .exec()
}

//Insere um Prescription
module.exports.inserir = p => {
    let newPatient = new Prescription(p)
    return newPatient.save()
}

//Remove um Prescription
module.exports.remover = id => {
    return Prescription.deleteOne({_id: id})
}

// Insert new entry for medication
module.exports.addMed = (id,med) => {
    return Prescription.findByIdAndUpdate(id, {$addToSet: {meds: med}}, {new: true})
}