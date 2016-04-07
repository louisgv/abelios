"use strict";

let fs = require('fs');

let path = require('path');

let inputPath = '../db/nlc';

let dbPath = '../nlcset';

let outputPath = path.join(__dirname, dbPath, 'role.csv');

let inputPath = path.join(__dirname, dbPath, `role.json`);

let buffer = fs.readFileSync(inputPath);

let data = buffer.toString();

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
