const path = require('path');
const dataPathCaracterizacao = path.resolve(__dirname, "./Caracterizacao.csv");
const dataPathInteracoes = path.resolve(__dirname, "./Interacoes.csv");
const dataPathTabMestre = path.resolve(__dirname, "./Tab_mestre.csv");

const csv = require('csv-parser');
const fs = require('fs');

const MedV = require('../controllers/dataset/activeSubs');
const MestreDCIV = require('../controllers/dataset/dci');
const MestrePharmFormV = require('../controllers/dataset/pharmForm');
const MestreUnitMedV = require('../controllers/dataset/unitMed');
const MestreViaAdminV = require('../controllers/dataset/viaAdmin');
const InteracoesV = require('../controllers/dataset/interactions');
var meds = [];
var mestreDCI = [];
var mestrePharmForm = [];
var mestreUnitMed = [];
var mestreViaAdmin = [];
var interacoes = [];

const readerCaracteizacao =
    fs.createReadStream(dataPathCaracterizacao)
    .pipe(csv())
    .on('data', async(row) => {
        //console.log(JSON.stringify(row));
        let entries = Object.values(row);
        let fields = entries[0].split(";");
        let Med = {
            chnm: fields[0],
            name: fields[3],
            dcd_ID: fields[4],
            farmForm_ID: fields[6],
            containerForm_ID: fields[5],
            capacity: fields[9],
            capacity_unit: fields[10],
            administrationForm_IDs: 0
        }
        meds.push(Med)
    })
    .on('end', () => {
        //console.log('CSV file successfully processed');
        MedV.inserirMts(meds)
            .then(() => console.log('CSV file successfully processed'))
            .catch(e => console.log(e))
    });

module.exports = readerCaracteizacao

const readerTabMestreDCI =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv())
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            var entries = Object.values(row);
            var fields = entries[0].split(";");
            if (fields[0]=="DCI") {
                let DCI = {
                    _id: fields[1],
                    description: fields[2]
                }
                mestreDCI.push(DCI)
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            MestreDCIV.inserirMts(mestreDCI)
                .then(dados => console.log("Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestreDCI

const readerTabMestrePharmForm =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv())
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            var entries = Object.values(row);
            var fields = entries[0].split(";");
            if (fields[0]=="FORMA_FARM"){
                let PharmForm = {
                    _id: fields[1],
                    description: fields[2]
                }
                mestrePharmForm.push(PharmForm)
            }

        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            MestrePharmFormV.inserirMts(mestrePharmForm)
                .then(dados => console.log("Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestrePharmForm

const readerTabMestreUnitMed =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv())
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            var entries = Object.values(row);
            var fields = entries[0].split(";");
            if (fields[0]=="UNID_MED"){
                let unitMed = {
                    _id: fields[1],
                    description: fields[2]
                }
                mestreUnitMed.push(unitMed)
            }

        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            MestreUnitMedV.inserirMts(mestreUnitMed)
                .then(dados => console.log("Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestreUnitMed

const readerTabMestreViaAdmin =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv())
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            var entries = Object.values(row);
            var fields = entries[0].split(";");
            if (fields[0]=="VIA_ADM"){
                let viaAdm = {
                    _id: fields[1],
                    description: fields[2]
                }
                mestreViaAdmin.push(viaAdm)
            }

        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            MestreViaAdminV.inserirMts(mestreViaAdmin)
                .then(dados => console.log("Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestreViaAdmin

const readerInteracoes =
    fs.createReadStream(dataPathInteracoes)
        .pipe(csv())
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            var entries = Object.values(row);
            var fields = entries[0].split(";");
            let inter = {
                chnm1: fields[1],
                chnm2: fields[2],
                descriptionFull: fields[6]
            }
            interacoes.push(inter)
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            InteracoesV.inserirMts(interacoes)
                .then(dados => console.log("Interações Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerInteracoes