const fs = require('fs');
const PNG = require('pngjs').PNG;

console.log('started training an epoch');

const trainingData = assembleTrainingData(); // [{inputVector: [], desiredOutput: 1}]
// const averageCost = calculateAverageCost();

console.log('training using', trainingData.length, 'examples');

function assembleTrainingData() {
  let trainingData = [];

  for (let i = 0; i <= 9; i++) {
    trainingData = trainingData.concat(convertDigitToInputVector(i));
  }

  return trainingData;
}

function convertDigitToInputVector(digit) {
  const directoryPath = `./src/data/training/${digit}`;
  const output = [];

  const files = fs.readdirSync(directoryPath);

  files.forEach(function (file) {
    const filePath = `${directoryPath}/${file}`;
    output.push({ inputVector: convertDigitFromPngToInputVector(filePath), desiredOutput: digit });
  });

  return output;
}

function convertDigitFromPngToInputVector(filePath) {
  const data = fs.readFileSync(filePath);
  const png = PNG.sync.read(data);

  const inputVector = [];
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2;
      inputVector.push(255 - png.data[idx]);
    }
  }
  return inputVector;
}
