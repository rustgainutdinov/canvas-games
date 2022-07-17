var GAME = {
    width: 798 * 1.5,
    height: 500 * 1.5,
    background: "#F5F0E1"
};
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

const image1 = new Image();    //Odintsov_Andrey
image1.src = 'img/choise.jpg';
const image2 = new Image();    //Konovalov_Roman
image2.src = 'img/dad.jpg';
const image3 = new Image();    //Vinogradov_Artyom
image3.src = 'img/death.jpg';
const image4 = new Image();    //Belyakova_Anna
image4.src = 'img/son.jpg';
const image5 = new Image();    //Kuklin_Stanislav
image5.src = 'img/hatred.jpg';
const image6 = new Image();    //Ershov_Ivan
image6.src = 'img/hatredAndLove.jpg';
const image7 = new Image();    //Pastukhova_Arina
image7.src = 'img/hatredAndFriends.jpg';
const image8 = new Image();    //Nasonova_Mariya
image8.src = 'img/intro.png';
const image9 = new Image();    //Stolbov_Maksim
image9.src = 'img/love.jpg';
const image10 = new Image();   //Kalinin_Konstantin
image10.src = 'img/loveAndSon.jpg';
const image11 = new Image();   //Prozorova_Anastasia
image11.src = 'img/lovesAndAdults.jpg';
const image12 = new Image();   //Nugumanov_Amir
image12.src = 'img/mom.jpg';
const fon = new Image();   //fon aaaa
fon.src = 'img/fon.jpg';

var imgs = [0, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12]

var index = 8

var story = [0,
    { // Odintsov_Andrey
        'z': 5,
        'x': 9,
        'c': 3,
    },
    { // Konovalov_Roman
        'z': 1,

    },
    { // Vinogradov_Artyom
        'z': 4,
        'x': 12,
        'c': 2,
    },
    { // Belyakova_Anna
        'z': 8,
    },
    { // Kuklin_Stanislav
        'z': 7,
        'x': 6,
    },
    { // Ershov_Ivan
        'z': 10,
        'x': 11,
    },
    { // Pastukhova_Arina
        'z': 8,
    },
    { // Nasonova_Mariya
        'z': 1,
    },
    { // Stolbov_Maksim
        'z': 10,
        'x': 11,
    },
    { // Kalinin_Konstantin
        'z': 8,
    },
    { // Prozorova_Anastasia
        'z': 8,
    },
    { // Nugumanov_Amir
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