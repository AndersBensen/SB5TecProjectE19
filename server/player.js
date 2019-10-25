var exports = module.exports = {};

exports.Player = class Player {
    constructor (name, x, y, speed, angleSpeed, angle, size, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angleSpeed = angleSpeed;
        this.angle = angle;
        this.size = size;
        this.color = color;
        this.direction = DIRECTION.FORWARD;
        this.positions = [];
        this.alive = true;
    }

    update () {
        // Save current position
        this.positions.push(new Point(this.x, this.y));

        // Rotate Blob
        if (this.direction == DIRECTION.LEFT)
            this.angle -= this.angleSpeed;
        else if (this.direction == DIRECTION.RIGHT)
            this.angle += this.angleSpeed;

        // Move Blob
        this.x += this.speed * Math.sin(this.angle * Math.PI / 180);
        this.y += this.speed * Math.cos(this.angle * Math.PI / 180);
    }

    changeDirection (keyPressed, direction) {
        if (keyPressed) {
            if (player.direction !== DIRECTION.FORWARD)
                player.direction = DIRECTION[key];
            else if (player.direction !== DIRECTION[key])
                player.direction = DIRECTION.FORWARD;
        } else {
            if (player.direction !== DIRECTION.FORWARD)
                if (DIRECTION[key] === DIRECTION.LEFT)
                    player.direction = DIRECTION.RIGHT;
                else
                    player.direction = DIRECTION.LEFT;
            else
                player.direction = DIRECTION.FORWARD;
        }
    }

}

exports.Point = Point = class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

exports.COLOR = COLOR = {
    RED: 'RED',
    BLUE: 'BLUE',
    GREEN: 'GREEN',
    YELLOW: 'YELLOW',
    PURPLE: 'PURPLE',
    ORANGE: 'ORANGE'
}

exports.DIRECTION = DIRECTION = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    FORWARD: "FORWARD"
}