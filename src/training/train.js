const path = require('path');
const fs = require('fs');

console.log('training');

const directoryPath = './src/data/training/0';
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    console.log(file);
  });
});
