/*
console.log("starting gpio program");
var gpio = require("gpio");

var gpio15 = gpio.export(15, {
    direction: 'out',
    ready: turnOn
});


function turnOn() {

    console.log("turn on");
    gpio15.set();
    setTimeout(turnOff, 3000);
}

function turnOff() {

    console.log("turn off");
    gpio15.set(0);
    setTimeout(turnOn, 3000);
}
*/

var wpi = require('wiring-pi');

wpi.setup('wpi');

var pin = 9;

wpi.pinMode(pin, wpi.OUTPUT);
/*wpi.setPadDrive(0,15);
wpi.setPadDrive(1,0);
wpi.setPadDrive(2,0);*/

var value = 1;

setInterval(function() {

    wpi.digitalWrite(pin, value);
    value = 1-value;
    console.log("setting pin 15 to", value);
}, 2000);
