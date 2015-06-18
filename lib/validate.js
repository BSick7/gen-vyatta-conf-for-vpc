module.exports = function (input) {
    var errs = [];
    if (!input.interface) {
        errs.push("Network interface to use IPSec in Vyatta side has not been entered/");
    }
    if (!input.local_subnet) {
        errs.push("Vyatta side of the network information has not been entered.");
    }
    if (!input.remote_subnet) {
        errs.push("Amazon VPC side of the network information has not been entered.");
    }
    if (!input.config_from_vpc) {
        errs.push("Configuration information downloaded from Amazon VPC has not been entered.");
    }

    if (errs.length > 0) {
        throw errs.join('\n');
    }
};