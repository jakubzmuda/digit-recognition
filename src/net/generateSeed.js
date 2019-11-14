const ModelSeedGenerator = require('./ModelSeedGenerator');
const fs = require('fs');

const model = new ModelSeedGenerator().generate(28 * 28);

let data = JSON.stringify(model);
fs.writeFileSync('model.json', data);
