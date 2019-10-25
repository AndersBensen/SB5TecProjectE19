const {Player, COLOR} = require('./player.js');
var exports = module.exports = {};
let sendDataMethod;
let started = false;
let players = [];

exports.Game = class Game {
    
}

exports.addPlayer = (name) => {
    players.push(new Player(name, 100, 50, 0.5, 3, 90, COLOR.RED));
};

exports.start = (_sendDataMethod) => {
    if (started) return;
    sendDataMethod = _sendDataMethod;
    setInterval(update, 1000/24);
    started = true;
}

let update = () => {
    players.forEach((player) => {
        player.update();
        console.log("X:" + player.x);
    });

    sendDataMethod(players);
}

