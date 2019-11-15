const fs = require('fs');
const PNG = require('pngjs').PNG;

console.log('training');

for (let i = 0; i <= 9; i++) {
  learnDigit(i);
}

function learnDigit(digit) {
  const directoryPath = `./src/data/training/${digit}`;
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const filePath = `${directoryPath}/${file}`;
      const data = fs.readFileSync(filePath);
      const png = PNG.sync.read(data);

      const inputVector = [];
      for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
          const idx = (png.width * y + x) << 2;
          inputVector.push(png.data[idx]);
        }
      }
      train(inputVector, digit);
    });
  });
}

function train(inputVector, digit) {
}
