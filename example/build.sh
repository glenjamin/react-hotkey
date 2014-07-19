#!/bin/sh

cd `dirname $0`

../node_modules/.bin/browserify --debug index.js > built.js
