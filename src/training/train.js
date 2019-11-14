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
      console.log(png);
    });
  });
}
