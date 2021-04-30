const path = require('path');
const dataPath = path.resolve(__dirname, "./medicamentos.csv");

const csv = require('csv-parser');
const fs = require('fs');

const MedV = require('../controllers/activeSubs');
var meds = [];

const reader =
    fs.createReadStream(dataPath)
    .pipe(csv())
    .on('data', async(row) => {
        //console.log(JSON.stringify(row));
        let entries = Object.values(row);
        let fields = entries[0].split(";");
        let Med = {
            name: fields[1],
            description: fields[3]
        }
        meds.push(Med)
    })
    .on('end', () => {
        //console.log('CSV file successfully processed');
        MedV.inserirMts(meds)
            .then(() => console.log('CSV file successfully processed'))
            .catch(e => console.log(e))
    });

module.exports = reader