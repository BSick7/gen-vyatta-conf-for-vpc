var VPCConfigParser = require('./VPCConfigParser');

exports.build = function (input) {
    var parser = new VPCConfigParser(input.config_from_vpc);
    var replacements = parser.parse();
    replacements['VYATTA_IPSEC_INTERFACE'] = input.interface;
    replacements['LOCAL_SUBNET'] = input.local_subnet;
    replacements['VPC_REMOTE_SUBNET'] = input.remote_subnet;
    return replacements;
};