var fs = require('fs'),
    path = require('path'),
    input = require('./input'),
    lib = require('./lib');

var inputs = input.get();
var result = lib.generate(inputs);

var outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir))
    fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir, 'vyatta.config'), result.config);
fs.writeFileSync(path.join(outDir, 'setup.sh'), result.setup);