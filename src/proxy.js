var net = require('net');
var sys = require("sys");
var http = require('http'),
    faye = require('faye');


var LOCAL_PORT = 6512;
var REMOTE_PORT = 11000;
var REMOTE_ADDR = "192.168.1.250";


var server = http.createServer(),
    bayeux = new faye.NodeAdapter({
        mount: '/faye',
        timeout: 45,
    });

var gracefulShutdown = function () {
    console.log("Received kill signal, shutting down gracefully.");
    server.close(function () {
        console.log("Closed out remaining connections.");
        process.exit()
    });
}

if (process.argv[3]) {
    LOCAL_PORT = process.argv[3];
}

try {
    if (process.argv.length==2 || !ValidateIPaddress(process.argv[2]))
        throw "Please provide a valid IP address to your HomeSeer Server."
    else {
        REMOTE_ADDR = process.argv[2];
        var serviceSocket = new net.Socket();

        serviceSocket.connect(parseInt(REMOTE_PORT), REMOTE_ADDR, function () {

        });

        // Maintain a hash of all connected sockets
        var sockets = {},
            nextSocketId = 0;
        serviceSocket.on('connection', function (socket) {
            // Add a newly connected socket
            var socketId = nextSocketId++;
            sockets[socketId] = serviceSocket;
            console.log('socket', socketId, 'opened');
        });

        // Remove the socket when it closes
        serviceSocket.on('close', function () {
            console.log('socket', socketId, 'closed');
            delete sockets[socketId];
        });

        serviceSocket.on("data", function (data) {
            console.log('<< From remote to proxy', data.toString());

            bayeux.getClient().publish('/chat/tick', data.toString());
            console.log('>> From proxy to client', data.toString());
        });

        bayeux.attach(server);

        server.listen(LOCAL_PORT);
        console.log("server running at port " + LOCAL_PORT);

       /* server.close(function () {
            console.log('Server closed!');
        });
        // Destroy all open sockets
        for (var socketId in sockets) {
            console.log('socket', socketId, 'destroyed');
            sockets[socketId].destroy();
        }*/

        process.on('SIGTERM', function () {
            server.close(function () {
                console.log("Closing out all connections.");
                process.exit(0);
            });
        });
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