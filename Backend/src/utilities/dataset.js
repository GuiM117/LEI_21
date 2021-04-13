const path = require('path');
const dataPath = path.resolve(__dirname, "./medicamentos.csv");
const csv = require('csv-parser');
const fs = require('fs');
const MedV = require('../controllers/meds');
const mongoose = require('mongoose')
var meds = [];

fs.createReadStream(dataPath)
    .pipe(csv())
    .on('data', async(row) => {
        //console.log(JSON.stringify(row));
        var entries = Object.values(row);
        var fields = entries[0].split(";");
        let Med = {
            name: fields[3],
            description: fields[1],
            medType: "default"
        }
        meds.push(Med)
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        MedV.inserirMts(meds)
            .then(dados => console.log("Success"))
            .catch(e => console.log(e))
    });