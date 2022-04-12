var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var blockSize = 15;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

var score = 0;

var drawBorder = function () {
    canvasContext.fillRect(0, 0, width, blockSize);
    canvasContext.fillRect(0, height - blockSize, width, blockSize);
    canvasContext.fillRect(0, 0, blockSize, height);
    canvasContext.fillRect(width - blockSize, 0, blockSize, height);
};

var drawScore = function () {
    canvasContext.font = "20px Cambria";
    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "left";
    canvasContext.textBaseline = "top";
    canvasContext.fillText("Счёт: " + score, blockSize, blockSize);
};

var gameOver = function () {
    clearInterval(intervalId);
    canvasContext.font = "60px Geneva";
    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    canvasContext.fillText("Конец игры ", width / 2, height / 2);
};

var circle = function (x, y, radius, fillCircle) {
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        canvasContext.fill();
    } else {
        canvasContext.stroke();
    }
};

var Block = function (col, row) {
    this.col = col;
    this.row = row;
};

Block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    canvasContext.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

var Snake = function () {
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];
    this.direction = "right";
    this.nextDirection = "right";
};

Snake.prototype.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("DarkOliveGreen");
    }
};

Snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead;

    this.direction = this.nextDirection;

    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }
    this.segments.unshift(newHead);

    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }
};

Snake.prototype.checkCollision = function (head) {
    var leftCollision = (head.col === 0);
    var topCollision = (head.row === 0);
    var rightCollision = (head.col === widthInBlocks - 1);
    var bottomCollision = (head.row === heightInBlocks - 1);

    var wallCollision = leftCollision  || topCollision || rightCollision || bottomCollision;
    var selfCollision = false;

    for (var i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }

    return wallCollision || selfCollision;
};

Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    }

    this.nextDirection = newDirection;
};

var Apple = function () {
    this.position = new Block(10, 10);
};

Apple.prototype.draw = function () {
    this.position.drawCircle("Red");
};

Apple.prototype.move = function () {
    var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1; 
    var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1; 
    this.position = new Block(randomCol, randomRow);
};

var snake = new Snake();
var apple = new Apple();

var intervalId = setInterval(function () {
    canvasContext.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);

var directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

document.getElementsByTagName("body")[0].addEventListener("keydown", function (event) {
    var newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});
