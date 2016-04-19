'use strict';

var socket = io.connect('192.168.108.15:8888', { transports: ['websocket'] });

var buttons;
var iframe;


document.addEventListener("DOMContentLoaded", function() {

    iframe = document.getElementById('cam');
    iframe.style.height = (window.innerWidth * 48 / 64) + "px";

    buttons = document.getElementById('wrap').querySelectorAll('button');
    for(var btn in buttons) {
        buttons[btn].addEventListener('mousedown', onPress);
        buttons[btn].addEventListener('touchstart', onPress);
        buttons[btn].addEventListener('mouseup', onRelease);
        buttons[btn].addEventListener('touchend', onRelease);
    }

});

function onPress(e) {

    console.log(e.target.id);
    socket.emit('btnpressed', e.target.id);
}

function onRelease(e) {

    console.log(e.target.id);
    socket.emit('btnreleased', e.target.id);
}

socket.on('welcome', function() {

})
