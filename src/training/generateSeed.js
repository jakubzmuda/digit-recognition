const ModelSeedGenerator = require('./ModelSeedGenerator');
const fs = require('fs');

const model = new ModelSeedGenerator().generate(28 * 28);

let data = JSON.stringify(model);
fs.writeFileSync('./src/model.json', data);

console.log('model seed generated');
