'use strict';

var socket = io.connect('192.168.108.15:8888', { transports: ['websocket'] });
socket.on('echo', function(data) {

    console.log(data);
});


var buttons;
var iframe;


document.addEventListener("DOMContentLoaded", function() {

    iframe = document.getElementById('cam');
    iframe.style.height = (window.innerWidth * 48 / 64) + "px";

    buttons = document.getElementById('wrap').querySelectorAll('button');
    for(var btn in buttons) {

        if(isMobile()) {
            buttons[btn].addEventListener('touchstart', onPress);
            buttons[btn].addEventListener('touchend', onRelease);
        }
        else {
            buttons[btn].addEventListener('mousedown', onPress);
            buttons[btn].addEventListener('mouseup', onRelease);
        }
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

    console.log("connected");
});


function isMobile() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
