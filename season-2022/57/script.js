var GAME = {
    width: 798 * 1.5,
    height: 500 * 1.5,
    background: "#F5F0E1"
};
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

const image1 = new Image();    //1
image1.src = 'img/choise.jpg';
const image2 = new Image();    //2
image2.src = 'img/dad.jpg';
const image3 = new Image();    //3
image3.src = 'img/death.jpg';
const image4 = new Image();    //4
image4.src = 'img/son.jpg';
const image5 = new Image();    //5
image5.src = 'img/hatred.jpg';
const image6 = new Image();    //6
image6.src = 'img/hatredAndLove.jpg';
const image7 = new Image();    //7
image7.src = 'img/hatredAndFriends.jpg';
const image8 = new Image();    //8
image8.src = 'img/intro.png';
const image9 = new Image();    //9
image9.src = 'img/love.jpg';
const image10 = new Image();   //10
image10.src = 'img/loveAndSon.jpg';
const image11 = new Image();   //11
image11.src = 'img/lovesAndAdults.jpg';
const image12 = new Image();   //12
image12.src = 'img/mom.jpg';
const fon = new Image();   //fon aaaa
fon.src = 'img/fon.jpg';

var imgs = [0, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12]

var index = 8

var story = [0,
    { // 1
        'z': 5,
        'x': 9,
        'c': 3,
    },
    { // 2
        'z': 1,

    },
    { // 3
        'z': 4,
        'x': 12,
        'c': 2,
    },
    { // 4
        'z': 8,
    },
    { // 5
        'z': 7,
        'x': 6,
    },
    { // 6
        'z': 10,
        'x': 11,
    },
    { // 7
        'z': 8,
    },
    { // 8
        'z': 1,
    },
    { // 9
        'z': 10,
        'x': 11,
    },
    { // 10
        'z': 8,
    },
    { // 11
        'z': 8,
    },
    { // 12
        'z': 8,
    },
]

function drawBackground() {
    canvasContext.drawImage(fon, 0, 0, GAME.width, GAME.height)

    const image = imgs[index];
    const k = GAME.height / image.height;
    canvasContext.drawImage(image, GAME.width / 2 - image.width * k / 2, GAME.height / 2 - image.height * k / 2, image.width * k, image.height * k)
};
function drawStartGameScreen() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);

    canvasContext.fillStyle = "red";
    canvasContext.textAlign = "center";
    canvasContext.font = "64px Arial";
    canvasContext.fillText("Press any key to play", GAME.width / 2, GAME.height / 2);
};

var started = false;

function play() {
    if (started)
        drawBackground();
    else
        drawStartGameScreen();
    requestAnimationFrame(play)
}

function onKeyDownDispatch(e) {
    console.log(e)
    if (!started) {
        started = true;
        playFuckingMusic()
        return;
    }
    if (e.key in story[index])
        index = story[index][e.key]
    else
        console.log('oh fuck key is no supported by the slide');

}

function registerGlobalCallbacks() {
    window.addEventListener("keydown", onKeyDownDispatch, false)
}

var fuckingMusicStarted = false;
function playFuckingMusic() {
    if (fuckingMusicStarted) return;
    fuckingMusicStarted = true
    audio.addEventListener('ended', function () {
        audio.play()
    });
    audio.addEventListener('canplaythrough', function () {
        audio.play()
    }, false);
    audio.play();
}

play()
registerGlobalCallbacks()
var audio = new Audio('fonMusic.mp3');