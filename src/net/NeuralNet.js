const model = require('./model.json');

export default class NeuralNet {

  evaluateForVector(inputVector) {
    const firstHiddenLayerOutput = this.evaluateFirstHiddenLayer(inputVector);
    console.log(firstHiddenLayerOutput);
    return 5;
  }

  evaluateFirstHiddenLayer(inputVector) {
    const layer = model.layers[0];
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

    return Math.tanh(sum + bias);
  }

  sigmoid(input) {
    return 1 / (1 + Math.exp(-input));
  }
}
