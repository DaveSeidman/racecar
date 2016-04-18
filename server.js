'use strict';

//var app = require('http').createServer(handleRequest);
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var gpio = require("gpio");

var gpio10, gpio9, gpio11, gpio25, gpio8, gpio7;
var gpios = [gpio10,gpio9,gpio11,gpio25,gpio8,gpio7];
var indexes = [10,9,11,25,8,7];

setupServer();
setupSocket();
setupGPIO(0);


function setupServer() {

    console.log("server running on port 8888");
    server.listen(8888);
    /*app.get('/', function (req, res) {
      res.sendFile(__dirname + req.url);
    });*/
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
                    gpios[1].set(0);
                    gpios[2].set(1);
                    break;

                case 'bkwd':
                    console.log('backward');
                    gpios[1].set(1);
                    gpios[2].set(0);
                    break;

                case 'stop':
                    console.log('stop');
                    gpios[1].set(0);
                    gpios[2].set(0);
                    break;

                case 'left':
                    console.log('left');
                    gpios[4].set(0);
                    gpios[5].set(1);
                    break;

                case 'rght':
                    console.log('right');
                    gpios[4].set(1);
                    gpios[5].set(0);
                    break;

                case 'strt':
                    console.log('center');
                    gpios[4].set(0);
                    gpios[5].set(0);
                    break;

            }

        });

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
