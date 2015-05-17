var net = require('net');
var http = require('http'),
    faye = require('faye');


var LOCAL_PORT = 6512;
var REMOTE_PORT = 11000;
var REMOTE_ADDR = "192.168.1.250";


var server = http.createServer();
var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45,
});

var gracefulShutdown = function () {
    console.log("Received kill signal, shutting down gracefully.");
    server.close(function () {
        console.log("Closing out open connections.");
        // Destroy all open sockets
        for (var socketId in sockets) {
            console.log('socket', socketId, 'destroyed');
            sockets[socketId].destroy();
        }
        process.exit()
    });
}

if (process.argv[3]) {
    LOCAL_PORT = process.argv[3];
}

try {
    if (process.argv.length == 2 || !ValidateIPaddress(process.argv[2]))
        throw "Please provide a valid IP address to your HomeSeer Server."
    else {
        REMOTE_ADDR = process.argv[2];
        var serviceSocket = new net.Socket();
        
        try {
            serviceSocket.connect(parseInt(REMOTE_PORT), REMOTE_ADDR);
        }
        catch(err) {
            throw err.message;
        }

        // Maintain a hash of all connected sockets
        var sockets = {},
            nextSocketId = 0;
        serviceSocket.on('connect', function (socket) {
            console.log("Proxy server connected to remote host: " + REMOTE_ADDR + ":" + REMOTE_PORT);
            // Add a newly connected socket
            var socketId = nextSocketId++;

            sockets[socketId] = serviceSocket;
            console.log('socket', socketId, 'opened');
        });

        serviceSocket.on('error', function (e) {
            if (e.code == 'EADDRINUSE') {
                console.log('Address in use.');
            } else if (e.code == 'ECONNREFUSED') {
                console.log('Unable to connect to server. Connection Refused');
            } else if (e.code == 'ETIMEDOUT') {
                console.log("Timed out trying to connect to remote host.");
            } else {
                console.log(e.code);
            }
            console.log("Shutting down");
            server.close();
        });

        serviceSocket.on("data", function (data) {
            console.log('<< From remote to proxy', data.toString());

            bayeux.getClient().publish('/homeseer/statuschange', data.toString());
            console.log('>> From proxy to client', data.toString());
        });

        //Attach to the HTTP server instance--the proxy--and begin listening on specified local port
        bayeux.attach(server);
        server.listen(LOCAL_PORT);
        console.log("Proxy server running and broadcasting on port " + LOCAL_PORT);


        process.on('SIGTERM', gracefulShutdown);
        // listen for INT signal e.g. Ctrl-C
        process.on('SIGINT', gracefulShutdown);
    }
} catch (err) {
    console.log(err);
}


function ValidateIPaddress(ipaddress) {
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipaddress.match(ipformat)) {
        return (true);
    }
    return false;
}