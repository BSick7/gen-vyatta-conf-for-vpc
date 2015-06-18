var stdio = require('stdio'),
    fs = require('fs'),
    path = require('path'),
    input = require('./input'),
    lib = require('./lib');

var ops = stdio.getopt({
    "local_subnet": {key: "l", args: 1, mandatory: true, description: "Vyatta Local subnet"},
    "remote_subnet": {key: "r", args: 1, mandatory: true, description: "Vyatta Remote subnet"},
    "interface": {key: "f", args: 1, description: "Vyatta Interface device"},
    "input": {key: "i", args: 1, description: "Input filepath"},
    "output": {key: "o", args: 1, description: "Output filepath"}
});

var inputs = input.get(ops);
var result = lib.generate(inputs);

var outDir = ops.output || path.join(__dirname, 'out');
if (!fs.existsSync(outDir))
    fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir, 'vyatta.config'), result.config);
fs.writeFileSync(path.join(outDir, 'setup.sh'), result.setup);