const startBackground = document.querySelector('.start-background');
const startGame = document.querySelector('.start-game');
const displayMainMenu = document.querySelector('.main-menu');
 
document.addEventListener('keyup', () => {
    startBackground.classList.add('display-none');
    startGame.classList.add('display-none');
    displayMainMenu.classList.add('.menu-color')
});

const gridBoxes = document.querySelectorAll('.grid-box');

let heroIndex = 174;
let enemyIndex = [];

const laserDeathZone = [
    0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300
]

const enemyIndexLayout = [
    26, 28, 30,
    76, 78, 80,
    126, 128, 130,
    176, 178, 180,
    226, 228, 230,
    276, 278, 280,
]

// ADDING ZONE WHERE LASER STOPS
laserDeathZone.forEach((zone) => {
    gridBoxes[zone].classList.add('laser-death-zone');
});


// ADDING ENEMIES TO GRID 
enemyIndexLayout.forEach((enemy) => {
    gridBoxes[enemy].classList.add('enemy')
});


// ADDING HERO TO GRID 
gridBoxes[heroIndex].classList.add('hero');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// MOVING THE HERO WITH KEYBOARD //
const moveHero = (e) => {
    gridBoxes[heroIndex].classList.remove('hero');
    switch(e.keyCode) {

        case 38:
            if (heroIndex >= 25) {
                heroIndex -= 25;
            }
            break;

        case 40:
            if (heroIndex < 324) {
                heroIndex += 25;   
            }
            break;
    }
    gridBoxes[heroIndex].classList.add('hero')
}

document.addEventListener('keydown', moveHero);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FIRE LAZER FUNCTION //
const fireLaser = (e) => {

// SETS LASER INDEX TO HERO INDEX SO LASER ALWAYS STARTS FROM HERO LOCATION
let laserIndex = heroIndex;

// SETS VARIABLE SO CLEAR INTERVAL CAN BE CALLED TO STOP SET INTERVAL
let laserId;

    // MOVES LADER ONE BOX ACCROSS
    const moveLaser = () => {
        gridBoxes[laserIndex].classList.remove('laser');
        laserIndex -= 1;
        gridBoxes[laserIndex].classList.add('laser');

        if (gridBoxes[laserIndex].classList.contains('enemy')) {
            gridBoxes[laserIndex].classList.remove('laser');
            gridBoxes[laserIndex].classList.remove('enemy');
        }
    
        // REMOVE LASER IF MISSES TARGET //
        if (gridBoxes[laserIndex].classList.contains('laser-death-zone')) {
            clearInterval(laserId);
            gridBoxes[laserIndex].classList.remove('laser');
        }
    
    }
    
    // PRESS SPACEBAR TO FIRE LASER
    switch(e.keyCode) {
        case 32:
            laserId = setInterval(moveLaser, 40);        
            break;
    }
}

// event listener for space bar
document.addEventListener('keyup', fireLaser);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function sound(src) {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     this.sound.setAttribute("preload", "auto");
//     this.sound.setAttribute("controls", "none");
//     this.sound.style.display = "none";
//     document.body.appendChild(this.sound);
//     this.play = function(){
//         this.sound.play();
//     }
//     this.stop = function(){
//         this.sound.pause();
//     }
// }


// function startGame() {
//     myMusic = new sound("./media/background_music.mp3");
//     myMusic.play();
// }