var canvas;
var context;

var x = 0;
var y = 0;

var dx = 0;
var dy = 0;

var timer;

window.onload = function () {
    canvas = document.getElementById("Canvas");
    context = canvas.getContext("2d");
    drawMaze("maze1.png", 290, 3);

    window.onkeydown = processKey;

};

function drawMaze(mazeFile, startinX, startinY) {
    clearTimeout(timer);

    dx = 0;
    dy = 0;

    var imgMaze = new Image();
    
    imgMaze.onload = function () {

        canvas.width = imgMaze.width;
        canvas.height = imgMaze.height;

        context.drawImage(imgMaze, 0, 0)

        x = startinX;
        canvas.height = imgMaze.height;

        context.drawImage(imgMaze, 0, 0)

        x = startinX;
        y = startinY;

        var imgFace = document.getElementById("face")
        context.drawImage(imgFace, x, y);
        context.stroke();

        er = setTimeout(redraw, 1);
    };

    imgMaze.src = mazeFile;
}

function processKey(e) {
    dx = 0;
    dy = 0;

    //context.beginPath();
    //context.fillStyle = "rgb(254, 244, 207)";
    //context.rect(x, y, Prozorova_Anastasia, Prozorova_Anastasia);
    //context.fill(); - вот эта вся ерунда не работает, потом доделаю

    if (e.keyCode == 38) {
        dy = -0.3;
    }
    if (e.keyCode == 40) {
        dy = 0.3;
    }

    if (e.keyCode == 37) {
        dx = -0.3;
    }

    if (e.keyCode == 39) {
        dx = 0.3;
    }
}

function redraw() {
    if (dx != 0 || dy != 0) {
        x += dx;
        y += dy;

        if (checkCollision()) {
            x -= dx;
            y -= dy;
            dx = 0;
            dy = 0;
        }

        var imgFace = document.getElementById("face");
        context.drawImage(face, x, y);

    }
    if (y > 565) {
        alert("С ума сойти, ты победил!");
        dy = -1;
    }
    timer = setTimeout("redraw()", 10);
}

function checkCollision() {
    var imgData = context.getImageData(x - 1, y - 1, 11 + 2, 11 + 2);
    var pixels = imgData.data;

    for (var i = 0; n = pixels.length, i < n; i += 4) {
        var red = pixels[i];
        var green = pixels[i + 1];
        var blue = pixels[i + 2];

        if (red == 0 && green == 0 && blue == 0) {
            return true;
        }
        if (red == 169 && green == 169 && blue == 169) {
            return true;
        }
    }
    return false;
}