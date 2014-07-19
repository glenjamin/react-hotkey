#!/bin/sh

cd `dirname $0`

../node_modules/.bin/browserify index.js > built.js
