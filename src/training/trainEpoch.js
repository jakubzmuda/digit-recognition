const fs = require('fs');
const PNG = require('pngjs').PNG;
const NeuralNetwork = require('../net/NeuralNet.js');
const math = require('../math');

console.log('started training an epoch');

const trainingData = assembleTrainingData();

console.log('converted', trainingData.length, 'png images to input vector, now calculating average cost');

const averageCost = calculateAverageCost(trainingData);

console.log('average cost =', averageCost, 'now calculating average gradient descent');

const { weightsAverageNegativeGradientDescent, biasesAverageNegativeGradientDescent } = calculateWeightAverageNegativeGradientDescent(trainingData);

console.log('calculated average negative gradient descent, now training new model');

trainLastLayer(weightsAverageNegativeGradientDescent, biasesAverageNegativeGradientDescent);

console.log('model trained');

function calculateWeightAverageNegativeGradientDescent(trainingData) {
  // calculate for biases

  let allWeightsInputVectorGradients = [];
  let allBiasesInputVectorGradients = [];

  trainingData.forEach((trainingEntry, i) => {
    const neuralNetOutput = new NeuralNetwork().evaluateForVector(trainingEntry.inputVector);

    let weightGradientsForConnections = [];
    let biasGradientsForConnections = [];

    for (let i = 0; i <= 9; i++) { // for every neuron in the last layer
      const thirdLayerActivationValues = new NeuralNetwork().evaluateForVectorToThirdLayerOnly(trainingEntry.inputVector);
      weightGradientsForConnections.push([]);

      const desiredProbability = trainingEntry.desiredOutput === i ? 1 : 0;
      const derivative2 = math.sigmoidDerivative(new NeuralNetwork().evaluateForVectorWithoutLinearRegressingLastLayer(trainingEntry.inputVector)[i]);
      const derivative1 = 2 * (neuralNetOutput[i] - desiredProbability);
      const biasGradient = derivative1 * derivative2;
      biasGradientsForConnections.push(biasGradient);
      for (let j = 0; j < 16; j++) { // for every neuron in the second last layer
        const derivative3 = thirdLayerActivationValues[j];
        const weightGradient = derivative1 * derivative2 * derivative3;
        weightGradientsForConnections[i].push(weightGradient);
      }
    }

    allWeightsInputVectorGradients.push(weightGradientsForConnections);
    allBiasesInputVectorGradients.push(biasGradientsForConnections);
  });

  let weightsAverageGradient = [...Array(10).keys()].map(() => [...Array(16).keys()].map(() => 0));
  let biasesAverageGradient = [...Array(10).keys()].map(() => 0);

  //accumulating
  for (let i = 0; i < allWeightsInputVectorGradients.length; i++) { //files
    for (let j = 0; j < allWeightsInputVectorGradients[i].length; j++) { // last layer neurons
      biasesAverageGradient[j] +=  allBiasesInputVectorGradients[i][j];
      for (let k = 0; k < allWeightsInputVectorGradients[i][j].length; k++) { // fourth - third layer connection gradients
        weightsAverageGradient[j][k] +=  allWeightsInputVectorGradients[i][j][k];
      }
    }
  }

  // console.log('sum', biasesAverageGradient);

  //finding average and flip sign
  for (let i = 0; i < weightsAverageGradient.length; i++) {
    biasesAverageGradient[i] = -(biasesAverageGradient[i] / allWeightsInputVectorGradients.length); // todo check if + or -
    for (let j = 0; j < weightsAverageGradient[i].length; j++) {
      weightsAverageGradient[i][j] = -(weightsAverageGradient[i][j] / allWeightsInputVectorGradients.length);
    }
  }


  return { weightsAverageNegativeGradientDescent: weightsAverageGradient, biasesAverageNegativeGradientDescent: biasesAverageGradient };
}

function calculateAverageCost(trainingData) {
  let sum = 0;
  trainingData.forEach(trainingEntry => {
    const actualOutput = new NeuralNetwork().evaluateForVector(trainingEntry.inputVector);
    const cost = calculateCostForSingleInputVector(actualOutput, trainingEntry.desiredOutput);
    sum += cost;
  });
  const denominator = trainingData.length;
  return sum / denominator;
}

function calculateCostForSingleInputVector(actualOutput, desiredOutput) {
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

  for (let i = 0; i < files.length; i++) {

    if (i > 2000) { // TODO data load cap
      break;
    }

    const filePath = `${directoryPath}/${files[i]}`;
    output.push({ inputVector: convertDigitFromPngToInputVector(filePath), desiredOutput: digit });
  }

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

function trainLastLayer(negativeWeightGradientDescent, negativeBiasGradientDescent) {
  const model = loadModel();

  const neurons = model.layers[2].neurons;

  for (let neuronIndex = 0; neuronIndex <= 9; neuronIndex++) {
    for (let weightIndex = 0; weightIndex < neurons[neuronIndex].weights.length; weightIndex++) {
      neurons[neuronIndex].weights[weightIndex] = neurons[neuronIndex].weights[weightIndex] + negativeWeightGradientDescent[neuronIndex][weightIndex];
    }
    neurons[neuronIndex].bias += negativeBiasGradientDescent[neuronIndex];
  }

  serializeModel(model);
}

function loadModel() {
  return require('../model.json');
}

function serializeModel(model) {
  let data = JSON.stringify(model);
  fs.writeFileSync('./src/model.json', data);
}
