var validate = require('./validate'),
    replacements = require('./replacements'),
    generator = require('./generator');

exports.generate = function (input) {
    validate(input);
    return generator.generate(replacements.build(input));
};