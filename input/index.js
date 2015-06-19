var fs = require('fs'),
    path = require('path');

exports.get = function (ops) {
    return {
        interface: ops.interface || "eth0",
        local_subnet: ops.local_subnet,
        remote_subnet: ops.remote_subnet,
        config_from_vpc: fs.readFileSync(ops.input || path.join(__dirname, "config.txt"), {encoding: 'utf-8'})
    };
};