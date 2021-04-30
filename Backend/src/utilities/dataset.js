const path = require('path');
const dataPathCaracterizacao = path.resolve(__dirname, "./Caracterizacao.csv");
const dataPathTabMestre = path.resolve(__dirname, "./medicamentos.csv");
const dataPathInteracoes = path.resolve(__dirname, "./medicamentos.csv");

const csv = require('csv-parser');
const fs = require('fs');

const MedV = require('../controllers/meds');
var meds = [];

const readerCaracteizacao =
    fs.createReadStream(dataPath)
    .pipe(csv())
    .on('data', async(row) => {
        //console.log(JSON.stringify(row));
        var entries = Object.values(row);
        var fields = entries[0].split(";");
        let Med = {
            id: fields[1]
            name: fields[4],
            nameAbrev: fields[5],
            container: fields[6],
            medForm: fields[7],
            containerCapacity: fields[10] fields[11],
            administration:  fields[12] fields[13] fields[14] fields[15] fields[16] fields[17] fields[18] fields[19] fields[20] fields[21]
        }
        meds.push(Med)
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        MedV.inserirMts(meds)
            .then(dados => console.log("Data Migration Concluded"))
            .catch(e => console.log(e))
    });

module.exports = readerCaracteizacao

const readerTabMestre =
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

module.exports = readerInteracoes