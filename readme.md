# Introduction

A real time bot for your micro-farming need.

# Setup

Setup your service in `manifest.yml` to match your services on Bluemix

`node tools/trainnlc`

Setup your nlc classifier with trainnlc.js and change the nlcID in modules/ibm/nlc.js to the one you got.

`echo "" > key.json` or `cp sample-key.json key.json`

Create a `key.json` file at the root of this repository (Either command above does the job). Refer to `sample-key.json` for a sample of the key file.

`npm i`

Install dependencies.

`sudo npm i -g nodemon`

I like `nodemon` and `supervisor`.

# Run

`nodemon lab`
