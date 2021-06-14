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
    .pipe(csv({separator:";"}))
    .on('data', async(row) => {

        let entries = Object.values(row);
        let adminForm_IDS = []

        for (let i = 11; i<21; i++ ) {
            if (entries[i]) adminForm_IDS.push(entries[i])
        }


        let Med = {
            chnm: entries[0],
            name: entries[3],
            dci_ID: entries[4],
            farmForm_ID: entries[6],
            containerForm_ID: entries[5],
            capacity: entries[9],
            capacityUnit_ID: entries[10],
            administrationForm_IDs: adminForm_IDS
        }
        meds.push(Med)
    })
    .on('end', () => {
        console.log('TabMestre_DCI file successfully processed');
        MedV.inserirMts(meds)
            .then(() => console.log('[Caracterização] Data Migration Concluded'))
            .catch(e => console.log(e))
    });

module.exports = readerCaracteizacao


const readerTabMestreDCI =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv({separator:";"}))
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            let entries = Object.values(row);

            if (entries[0]==="DCI") {
                let DCI = {
                    _id: entries[1],
                    description: entries[2]
                }
                mestreDCI.push(DCI)
            }
        })
        .on('end', () => {
            console.log('TabMestre_DCI file successfully processed');
            MestreDCIV.inserirMts(mestreDCI)
                .then(dados => console.log("[TabMestre_DCI] Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestreDCI

const readerTabMestrePharmForm =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv({separator:";"}))
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            let entries = Object.values(row);

            if (entries[0]==="FORMA_FARM"){
                let PharmForm = {
                    _id: entries[1],
                    description: entries[2]
                }
                mestrePharmForm.push(PharmForm)
            }

        })
        .on('end', () => {
            console.log('TabMestre_PharmaForm file successfully processed');
            MestrePharmFormV.inserirMts(mestrePharmForm)
                .then(dados => console.log("[TabMestre_PharmaForm] Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestrePharmForm

const readerTabMestreUnitMed =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv({separator:";"}))
        .on('data', async(row) => {
            let entries = Object.values(row);

            if (entries[0]==="UNID_MED"){
                let unitMed = {
                    _id: entries[1],
                    description: entries[2]
                }
                mestreUnitMed.push(unitMed)
            }

        })
        .on('end', () => {
            console.log('TabMestre_UnitMed file successfully processed');
            MestreUnitMedV.inserirMts(mestreUnitMed)
                .then(dados => console.log("[TabMestre_UnitMed] Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestreUnitMed

const readerTabMestreViaAdmin =
    fs.createReadStream(dataPathTabMestre)
        .pipe(csv({separator:";"}))
        .on('data', async(row) => {
            let entries = Object.values(row);

            if (entries[0]==="VIA_ADM"){
                let viaAdm = {
                    _id: entries[1],
                    description: entries[2]
                }
                mestreViaAdmin.push(viaAdm)
            }

        })
        .on('end', () => {
            console.log('TabMestre_ViaAdmin file successfully processed');
            MestreViaAdminV.inserirMts(mestreViaAdmin)
                .then(dados => console.log("[TabMestre_ViaAdmin] Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestreViaAdmin

const readerInteracoes =
    fs.createReadStream(dataPathInteracoes)
        .pipe(csv({separator:";"}))
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            let entries = Object.values(row);

            let inter = {
                chnm1: entries[1],
                chnm2: entries[2],
                descriptionFull: entries[6]
            }
            interacoes.push(inter)
        })
        .on('end', () => {
            console.log('Interações file successfully processed');
            InteracoesV.inserirMts(interacoes)
                .then(dados => console.log("[Interações] Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerInteracoes
