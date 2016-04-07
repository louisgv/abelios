"use strict";

let fs = require('fs');

let path = require('path');

let jsonPath = '../db/nlc';

let trainsetPath = '../nlcset';

let outputPath = path.join(__dirname, trainsetPath, 'role.csv');

let inputPath = path.join(__dirname, jsonPath, `role.json`);

let buffer = fs.readFileSync(inputPath);

let data = JSON.parse(buffer.toString());

let outputCSV = "";

for (let classifier in data) {
  if (data.hasOwnProperty(classifier)) {
    for (let i = 0; i < data[classifier].length; i++) {
      outputCSV += `${data[classifier][i]},${classifier}\n`
    }
  }
}

fs.writeFile(outputPath, outputCSV, (err) => {
  if(err) {
    throw err;
  }
  console.log('It\'s saved!');
});
