const path = require('path');
const fs = require('fs');

console.log('training');

for(let i=0;i<=9;i++) {
  learnDigit(i);
}

function learnDigit(digit) {
  const directoryPath = `./src/data/training/${digit}`;
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      console.log(file);
    });
  });
}
