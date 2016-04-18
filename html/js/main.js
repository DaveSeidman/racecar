'use strict';

var socket = io.connect('192.168.108.15:8888', { transports: ['websocket'] });

var buttons;

document.addEventListener("DOMContentLoaded", function() {

    buttons = document.getElementById('wrap').querySelectorAll('button');
    for(var btn in buttons) {
        buttons[btn].addEventListener('click', clickHandler);
    }
});

function clickHandler(e) {

    socket.emit('btnpressed', e.target.id);
}

socket.on('welcome', function() {

    console.log("ready to control the car");
})
