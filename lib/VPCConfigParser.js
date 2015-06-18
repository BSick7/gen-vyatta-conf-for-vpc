function VPCConfigParser(config) {
    this.config = config.split("\n");
    this.currentLine = 0;
    this.currentTunnelPrefix = "";
    this.replaceTable = {};
}

VPCConfigParser.prototype.parse = function () {
    var regForTunnel = new RegExp("^IPSec Tunnel #([0-9]+)");
    var len = this.config.length;

    for (; this.currentLine < len; this.currentLine++) {
        var line = this.config[this.currentLine];
        if (line.match(regForTunnel)) {
            var tunnelID = RegExp.$1;
            this.parseTunnel(tunnelID);
        }
    }

    return this.replaceTable;
};

VPCConfigParser.prototype.parseTunnel = function (tunnelID) {
    this.currentTunnelPrefix = "TUNNEL" + tunnelID + "_";
    this.currentLine++;

    var len = this.config.length;
    for (; this.currentLine < len; this.currentLine++) {
        var line = this.config[this.currentLine];
        line = (line || "").replace('\r', '');
        if (line) {
            if (line.match(/^Configure the IKE SA/)) {
                this.parseIKESA();
            } else if (line.match(/^Outside IP Addresses/)) {
                this.parseOutsideIP();
            } else if (line.match(/^Inside IP Addresses/)) {
                this.parseInsideIP();
            } else if (line.match(/^BGP Configuration Options/)) {
                this.parseBGP();
            } else if (line.match(/^IPSec Tunnel #/)) {
                this.currentLine--;
                break;
            }
        }
    }
};

VPCConfigParser.prototype.parseIKESA = function () {
    var len = this.config.length;
    for (; this.currentLine < len; this.currentLine++) {
        var line = this.config[this.currentLine];
        line = (line || "").replace('\r', '');
        if (!line)
            break;
        if (line.match(/- Pre-Shared Key\s+: ([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "PSK"] = RegExp.$1;
        }
    }
};

VPCConfigParser.prototype.parseOutsideIP = function () {
    var len = this.config.length;
    for (; this.currentLine < len; this.currentLine++) {
        var line = this.config[this.currentLine];
        line = (line || "").replace('\r', '');
        if (!line)
            break;
        if (line.match(/- Customer Gateway\s+: ([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "OUTSIDE_CGW_IP"] = RegExp.$1;
        } else if (line.match(/- Virtual Private Gateway\s+: ([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "OUTSIDE_VPGW_IP"] = RegExp.$1;
        }
    }
};

VPCConfigParser.prototype.parseInsideIP = function () {
    var len = this.config.length;
    for (; this.currentLine < len; this.currentLine++) {
        var line = this.config[this.currentLine];
        line = (line || "").replace('\r', '');
        if (!line)
            break;
        if (line.match(/- Customer Gateway\s+: ([^\s\/]+)\/([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "INSIDE_CGW_IP"] = RegExp.$1;
            this.replaceTable[this.currentTunnelPrefix + "INSIDE_CGW_NETMASK"] = RegExp.$2;
        } else if (line.match(/- Virtual Private Gateway\s+: ([^\s\/]+)\/([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "INSIDE_VPGW_IP"] = RegExp.$1;
            this.replaceTable[this.currentTunnelPrefix + "INSIDE_VPGW_NETMASK"] = RegExp.$2;
        }
    }
};

VPCConfigParser.prototype.parseBGP = function () {
    var len = this.config.length;
    for (; this.currentLine < len; this.currentLine++) {
        var line = this.config[this.currentLine];
        line = (line || "").replace('\r', '');
        if (!line)
            break;
        if (line.match(/- Customer Gateway ASN\s+: ([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "BGP_CONFIG_CGW_ASN"] = RegExp.$1;
        } else if (line.match(/- Virtual Private  Gateway ASN\s+: ([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "BGP_CONFIG_VPGW_ASN"] = RegExp.$1;
        } else if (line.match(/- Neighbor IP Address\s+: ([^\s]+)/)) {
            this.replaceTable[this.currentTunnelPrefix + "BGP_CONFIG_NEIGHBOR"] = RegExp.$1;
        }
    }
};

module.exports = VPCConfigParser;