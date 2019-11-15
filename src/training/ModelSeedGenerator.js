const numberOfFirstLayerNeurons = 16;
const numberOfSecondLayerNeurons = 16;
const numberOfOutputLayerNeurons = 10;

class ModelSeedGenerator {
  generate(inputVectorLength) {
    return {
      layers: [
        this.generateLayerValues(inputVectorLength, numberOfFirstLayerNeurons),
        this.generateLayerValues(numberOfFirstLayerNeurons, numberOfSecondLayerNeurons),
        this.generateLayerValues(numberOfSecondLayerNeurons, numberOfOutputLayerNeurons),
      ]
    }
  }

  generateLayerValues(inputVectorLength, numberOfNeurons) {
    return {
      neurons: [...Array(numberOfNeurons).keys()].map(() => this.generateNeuron(inputVectorLength))
    }
  }

  generateNeuron(inputVectorLength) {
    return {
      weights: [...Array(inputVectorLength).keys()].map(() => this.randomBetween(0, 1)),
      bias: this.randomBetween(-2*inputVectorLength/3, 0) // todo remove *2/3
    }
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min
  }
}

module.exports = ModelSeedGenerator;
