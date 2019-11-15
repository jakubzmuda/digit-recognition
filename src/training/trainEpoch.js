const fs = require('fs');
const PNG = require('pngjs').PNG;
const NeuralNetwork = require('../net/NeuralNet.js');

console.log('started training an epoch');

const trainingData = assembleTrainingData();

console.log('converted', trainingData.length, 'png images to input vector, now calculating average cost');

const averageCost = calculateAverageCost(trainingData);

console.log('average cost =', averageCost);

function calculateAverageCost(trainingData) {
  let sum = 0;
  trainingData.forEach(trainingEntry => {
    const cost = calculateCostForSingleInputVector(trainingEntry.inputVector, trainingEntry.desiredOutput);
    sum += cost;
  });
  const denominator = trainingData.length;
  return sum / denominator;
}

function calculateCostForSingleInputVector(inputVector, desiredOutput) {
  const actualOutput = new NeuralNetwork().evaluateForVector(inputVector);
  let sum = 0;
  for (let i = 0; i <= 9; i++) {
    const desiredProbability = desiredOutput === i ? 1 : 0;
    sum += Math.pow((actualOutput[i] - desiredProbability), 2);
  }
  return sum;
}

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
