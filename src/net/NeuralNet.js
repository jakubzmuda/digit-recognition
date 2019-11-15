const math = require('../math');

class NeuralNet {

  constructor() {
    this.model = require('../model.json');
  }

  evaluateForVector(inputVector) {
    const firstHiddenLayerOutput = this.evaluateLayer(0, inputVector);
    const secondHiddenLayerOutput = this.evaluateLayer(1, firstHiddenLayerOutput);
    return this.evaluateLayer(2, secondHiddenLayerOutput);
  }

  evaluateForVectorWithoutLinearRegressingLastLayer(inputVector) {
    const firstHiddenLayerOutput = this.evaluateLayer(0, inputVector);
    const secondHiddenLayerOutput = this.evaluateLayer(1, firstHiddenLayerOutput);
    return this.evaluateLayer(2, secondHiddenLayerOutput, true);
  }

  evaluateForVectorToThirdLayerOnly(inputVector) {
    const firstHiddenLayerOutput = this.evaluateLayer(0, inputVector);
    return this.evaluateLayer(1, firstHiddenLayerOutput);
  }

  evaluateLayer(layerIndex, inputVector, skipLinearRegression = false) {
    const layer = this.model.layers[layerIndex];
    const output = [];
    for (let i = 0; i < layer.neurons.length; i++) {
      output.push(this.evaluateNeuron(layer.neurons[i], inputVector, skipLinearRegression));
    }
    return output;
  }

  evaluateNeuron(neuron, inputVector, skipLinearRegression) {
    const weights = neuron.weights;
    const bias = neuron.bias;

    if (weights.length !== inputVector.length) {
      throw new Error("bad config");
    }

    let sum = 0;
    for (let i = 0; i < inputVector.length; i++) {
      sum += inputVector[i] * weights[i];
    }

    return skipLinearRegression ? (sum + bias) : math.sigmoid(sum + bias);
  }
}

module.exports = NeuralNet;
