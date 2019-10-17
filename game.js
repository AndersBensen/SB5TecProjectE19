var exports = module.exports = {};
let sendDataMethod;
let started = false;
let players = [];

exports.addPlayer = (name) => {
    players.push({name: name, x: 100, y: 100, angle: 0, direction: ""});
};

exports.start = (_sendDataMethod) => {
    if (started) return;
    sendDataMethod = _sendDataMethod;
    setInterval(update, 1000/24);
    started = true;
}

let update = () => {
    players.forEach((player) => {
        player.x += 5/24;
        console.log("X:" + player.x);
    });

    sendDataMethod(players);
}

