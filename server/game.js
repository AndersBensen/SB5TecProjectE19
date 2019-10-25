const {Player, Point, COLOR} = require('./player.js');
var exports = module.exports = {};

const WIDTH = 800;
const HEIGHT = 350;
const SPAWN_MARGIN = 20;

exports.Game = class Game {
    constructor (port) {
        this.port = port;
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

        let startPosition = getRandomPosition(this.players);
        let speed = 0.5;
        let angleSpeed = 3;
        let angle = Math.random() * 360;
        let size = 5;

        this.players.push(new Player(name, startPosition.x, startPosition.y, 
            speed, angleSpeed, angle, size, color));
        
        return true;
    }

    update () {
        if (!this.started || this.players.length === 0) return;
        
        this.players.forEach((player) => {
            player.update();
        });
    
        this.sendDataMethod(this.port, this.players);
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

let getRandomPosition = (players) => {
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