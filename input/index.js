var fs = require('fs'),
    path = require('path');

exports.get = function () {
    return {
        interface: "eth0",
        local_subnet: "10.208.231.70/19",
        remote_subnet: "10.0.0.0/16",
        config_from_vpc: fs.readFileSync(path.join(__dirname, "config.txt"), { encoding: 'utf-8' })
    };
};