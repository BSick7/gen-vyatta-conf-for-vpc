var fs = require('fs'),
    path = require('path'),
    VYATTA_TEMPLATE_FILE = path.join(__dirname, "../templates/vyatta.config"),
    SETUP_TEMPLATE_FILE = path.join(__dirname, "../templates/setup.sh");

exports.generate = function (replacements) {
    return {
        config: genConfig(replacements),
        setup: genSetupScript(replacements)
    };
};

function genConfig(replacements) {
    return replaceAll(replacements, fs.readFileSync(VYATTA_TEMPLATE_FILE, { encoding: 'utf-8' }));
}

function genSetupScript(replacements) {
    return replaceAll(replacements, fs.readFileSync(SETUP_TEMPLATE_FILE, { encoding: 'utf-8' }));
}

function replaceAll(replacements, str) {
    for (var key in replacements) {
        var pattern = new RegExp(key, "g");
        str = str.replace(pattern, replacements[key]);
    }
    return str;
}