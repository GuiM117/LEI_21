const path = require('path');
const dataPathCaracterizacao = path.resolve(__dirname, "./Caracterizacao.csv");
const dataPathTabMestre = path.resolve(__dirname, "./Interacoes.csv");
const dataPathInteracoes = path.resolve(__dirname, "./Tab_mestre.csv");

const csv = require('csv-parser');
const fs = require('fs');

const MedV = require('../controllers/activeSubs');
var meds = [];

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

/**const readerTabMestre =
    fs.createReadStream(dataPath)
        .pipe(csv())
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            var entries = Object.values(row);
            var fields = entries[0].split(";");
            let Med = {
                id: fields[2],
                type: fields[1],
                nameAbrev: fields[3]
            }
            meds.push(Med)
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            MedV.inserirMts(meds)
                .then(dados => console.log("Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerTabMestre

const readerInteracoes =
    fs.createReadStream(dataPath)
        .pipe(csv())
        .on('data', async(row) => {
            //console.log(JSON.stringify(row));
            var entries = Object.values(row);
            var fields = entries[0].split(";");
            let Med = {
                idMed1: fields[2],
                idMed2: fields[3],
                interaction: fields[4]
            }
            meds.push(Med)
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            MedV.inserirMts(meds)
                .then(dados => console.log("Data Migration Concluded"))
                .catch(e => console.log(e))
        });

module.exports = readerInteracoes**/