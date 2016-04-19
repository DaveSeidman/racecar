'use strict';

//var app = require('http').createServer(handleRequest);
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var gpio = require("gpio");

var      gpio13,gpio19,gpio26,gpio16,gpio20,gpio21,
gpios = [gpio13,gpio19,gpio26,gpio16,gpio20,gpio21],
indexes =   [13,    19,    26,    16,    20,    21];

setupServer();
setupSocket();
setupGPIO(0);


function setupServer() {

    console.log("server running on port 8888");
    server.listen(8888);
    app.use(express.static('html'));

}

function setupSocket() {

    io.on('connection', function (socket) {

        console.log("incoming connection", socket.id);

        socket.emit("welcome");

        socket.on("btnpressed", function(data) {

            switch(data) {

                case 'frwd':
                    console.log('forward');
                    gpios[1].set(1);
                    gpios[2].set(0);
                    socket.emit('echo', 'going forward');
                    break;

                case 'back':
                    console.log('backward');
                    gpios[1].set(0);
                    gpios[2].set(1);
                    socket.emit('echo', 'going backward');
                    break;

                case 'rght':
                    console.log('left');
                    gpios[4].set(0);
                    gpios[5].set(1);
                    socket.emit('echo', 'going right');
                    break;

                case 'left':
                    console.log('right');
                    gpios[4].set(1);
                    gpios[5].set(0);
                    socket.emit('echo', 'going left');
                    break;

            }

        });

        socket.on("btnreleased", function(data) {

            switch(data) {

                case 'frwd':
                case 'back':
                    console.log('stop');
                    gpios[1].set(0);
                    gpios[2].set(0);
                    socket.emit('echo', 'stopping');
                    break;

                case 'rght':
                case 'left':
                    console.log('center');
                    gpios[4].set(0);
                    gpios[5].set(0);
                    socket.emit('echo', 'centering');
                    break;
            }
        })

    });
}


function setupGPIO(index) {

    if(index < gpios.length) {

        gpios[index] = gpio.export(indexes[index], {
            direction: 'out',
            ready: function() {
                console.log("gpio" + indexes[index] + " ready");
                setupGPIO(index + 1);
            }
        });
    }
    else {

        gpios[0].set(1);
        gpios[1].set(0);
        gpios[2].set(0);
        gpios[3].set(1);
        gpios[4].set(0);
        gpios[5].set(0);
        console.log("done");
    }
}
