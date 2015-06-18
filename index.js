var fs = require('fs'),
    path = require('path'),
    input = require('./input'),
    lib = require('./lib');

var inputs = input.get();
var result = lib.generate(inputs);
fs.writeFileSync(path.join('out', 'vyatta.config'), result.config);
fs.writeFileSync(path.join('out', 'setup.sh'), result.setup);