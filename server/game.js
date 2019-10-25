const {Player, Point, COLOR} = require('./player.js');
var exports = module.exports = {};

let sendDataMethod;
let started = false;
let players = [];

const WIDTH = 800;
const HEIGHT = 350;
const SPAWN_MARGIN = 20;

exports.Game = class Game {
    constructor () {
        this.sendDataMethod;
        this.started = false;
        this.players = [];
    }

    start (_sendDataMethod) {
        if (this.started) return;
        this.sendDataMethod = _sendDataMethod;
        setInterval(this.update.bind(this), 1000/24);
        this.started = true;
    }

    addPlayer (name, color) {
        if (!this.validatePlayer(name, color)) return false;

        let startPosition = getRandomPosition();
        let speed = 0.5;
        let angleSpeed = 3;
        let angle = Math.random() * 360;
        let size = 5;

        this.players.push(new Player(name, startPosition.x, startPosition.y, 
            speed, angleSpeed, angle, size, color));
        
        return true;
    }

    update () {
        if (!this.started) return;
        this.players.forEach((player) => {
            player.update();
            console.log("X: " + Math.round(player.x) + " Y: " + Math.round(player.y));
        });
    
        this.sendDataMethod(this.players);
    }

    validatePlayer (name, color) {
        this.players.forEach(player => {
            if (player.name === name || player.color === color)
                return false;
        })

        return true;
    }

    getGameWidth () { return WIDTH;}
    getGameHeight () { return HEIGHT;}
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

let getRandomPosition = () => {
    let x, y;
    let collision = false;

    do {
        x = Math.random() * (WIDTH - 2 * SPAWN_MARGIN) + SPAWN_MARGIN;
        y = Math.random() * (HEIGHT - 2 * SPAWN_MARGIN) + SPAWN_MARGIN;

        players.forEach(player => {
            let xDiff = player.x - x;
            let yDiff = player.y - y;
            let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

            if (distance < player.size)
                collision = true;
        });
    } while (collision === true);

    return new Point(x, y);
}

let update = () => {
    players.forEach((player) => {
        player.update();
        console.log("X:" + player.x);
    });

    sendDataMethod(players);
}