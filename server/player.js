var exports = module.exports = {};

exports.Player = class Player {
    constructor (name, x, y, speed, angleSpeed, angle, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angleSpeed = angleSpeed;
        this.angle = angle;
        this.color = color;
        this.direction = DIRECTION.FORWARD;
        this.positions = [];
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

    changeDirection (direction) {
        this.direction = direction;
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