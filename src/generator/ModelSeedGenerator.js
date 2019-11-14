const numberOfFirstLayerNeurons = 16;
const numberOfSecondLayerNeurons = 16;

class ModelSeedGenerator {
  generate(inputVectorLength) {
    return {
      layers: [
        this.generateFirstHiddenLayerValues(inputVectorLength),
        this.generateSecondHiddenLayerValues(numberOfFirstLayerNeurons),
      ]
    }
  }

  generateFirstHiddenLayerValues(inputVectorLength) {
    return {
      neurons: [...Array(numberOfFirstLayerNeurons).keys()].map(() => this.generateNeuron(inputVectorLength))
    }
  }

  generateSecondHiddenLayerValues(inputVectorLength) {
    return {
      neurons: [...Array(numberOfSecondLayerNeurons).keys()].map(() => this.generateNeuron(inputVectorLength))
    }
  }

  generateNeuron(inputVectorLength) {
    return {
      weights: [...Array(inputVectorLength).keys()].map(() => this.randomBetween(-1, 1)),
      bias: this.randomBetween(-inputVectorLength, inputVectorLength)
    }
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min
  }
}

module.exports = ModelSeedGenerator;
