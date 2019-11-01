const {Player, Point, COLOR, DIRECTION} = require('./player.js');
var exports = module.exports = {};

const WIDTH = 800;
const HEIGHT = 350;
const SPAWN_MARGIN = 20;
const FRAME_RATE = 24;

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
        setInterval(this.update.bind(this), 1000 / FRAME_RATE);
        this.started = true;
    }

    addPlayer (name, color) {
        if (!this.validatePlayer(name, color)) return false;

        let startPosition = getRandomPosition(this.players);
        let speed = 1.5;
        let angleSpeed = 3;
        let angle = Math.random() * 360;
        let size = 5;

        this.players.push(new Player(name, startPosition.x, startPosition.y, 
            speed, angleSpeed, angle, size, color));
        
        return true;
    }

    playerPressKey (playerName, key) {
        let player = getPlayer(playerName, this.players)

        if (player !== null) {
            player.changeDirection(true, key);
        }
    }

    playerReleaseKey (playerName, key) {
        let player = getPlayer(playerName, this.players)

        if (player !== null) {
            player.changeDirection(false, key);
        }
    }

    update () {
        if (!this.started || this.players.length === 0) return;
        
        this.players.forEach((player) => {
            if (player.alive)
                player.update();
        });
    
        this.players.forEach( targetPlayer => {
            if (!targetPlayer.alive)
                return;
            
            let targetName = targetPlayer.name;
            let targetRadius = targetPlayer.size;

            this.players.forEach( enemyPlayer => {
                let enemyName = enemyPlayer.name;
                
                let enemyPositions = enemyPlayer.positions.slice();
                if (enemyPositions === undefined)       // No positions
                    return;
                
                if (targetName === enemyName)           // Delete own x positions
                {
                    let positionsToRemove = Math.ceil(targetRadius / targetPlayer.speed);
                    
                    positionsToRemove = positionsToRemove > enemyPositions.length ? 
                        enemyPositions.length : positionsToRemove;
                    
                    enemyPositions.splice(- positionsToRemove, positionsToRemove);
                }

                if (enemyPositions.length === 0)        // Check if any positions to collide with
                    return;

                enemyPositions.forEach( position => {
                    if (targetRadius > getDistance(targetPlayer, position))
                    {
                        targetPlayer.alive = false;
                        console.log(targetPlayer.name + " died");
                    }
                });
            });
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
            let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

            if (distance < player.size)
                collision = true;
        });
    } while (collision === true);

    return new Point(x, y);
}

let getPlayer = (playerName, players) => {
    let player = null;
    players.forEach(p => {
        if (p.name === playerName)
            player = p;
    });

    return player;
}

let getDistance = (player, targetPoint) => {
    let xDiff = player.x - targetPoint.x;
    let yDiff = player.y - targetPoint.y;
    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    return distance;
}