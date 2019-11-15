function sigmoid(input) {
  return 1 / (1 + Math.exp(-input));
}

function sigmoidDerivative(input) {
  const f = sigmoid(input);
  return f * (1 - f);
}

module.exports = {
  sigmoid
};
