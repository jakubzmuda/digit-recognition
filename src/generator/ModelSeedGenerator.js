class ModelSeedGenerator {
  generate(inputVectorLength) {
    return {
      layers: [
        this.generateFirstHiddenLayerValues(inputVectorLength)
      ]
    }
  }

  generateFirstHiddenLayerValues(inputVectorLength) {
    return {
      neurons: [
        [...Array(16).keys()].map(() => this.generateNeuron(inputVectorLength))
      ]
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
