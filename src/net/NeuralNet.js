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

  evaluateLayer(layerIndex, inputVector) {
    const layer = this.model.layers[layerIndex];
    const output = [];
    for (let i = 0; i < layer.neurons.length; i++) {
      output.push(this.evaluateNeuron(layer.neurons[i], inputVector));
    }
    return output;
  }

  evaluateNeuron(neuron, inputVector) {
    const weights = neuron.weights;
    const bias = neuron.bias;

    if (weights.length !== inputVector.length) {
      throw new Error("bad config");
    }

    let sum = 0;
    for (let i = 0; i < inputVector.length; i++) {
      sum += inputVector[i] * weights[i];
    }

    return math.sigmoid(sum + bias);
  }
}

module.exports = NeuralNet;
