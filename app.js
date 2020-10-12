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
let direction = 1;
enemiesKilled = [];

const laserDeathZone = [
    0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300
];

// const screenTopZone = [
//     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
// ];
// const screenBottomZone = [
//     300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315
// ];

const enemies = [
    26, 28, 30,
    76, 78, 80,
    126, 128, 130,
    176, 178, 180,
    226, 228, 230,
    276, 278, 280,
];

// ADDING ZONE WHERE LASER STOPS
laserDeathZone.forEach((zone) => {
    gridBoxes[zone].classList.add('laser-death-zone');
});

// screenTopZone.forEach((zone) => {
//     gridBoxes[zone].classList.add('screen-top-zone');
// });

// screenBottomZone.forEach((zone) => {
//     gridBoxes[zone].classList.add('screen-bottom-zone');
// });

// ENDGAME ZONE //
const endGameZone = [24, 49, 74, 99, 124, 149, 174, 199, 224, 249, 274, 299, 324];

endGameZone.forEach((zone) => {
    gridBoxes[zone].classList.add('end-game-zone');
});

// ADDING ENEMIES TO GRID 
enemies.forEach((enemy) => {
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


// MOVE ENEMIES //
let enemyId;

const moveEnemies = () => {

    // enemies.forEach((enemy) => {
    //     if (gridBoxes[enemy].classList.contains('screen-top-zone')) {
    //         direction === 1;
    //     // } else if (direction === 1) {
    //     }
    // });
    
    for (let i = 0; i <= enemies.length - 1; i++) {
        gridBoxes[enemies[i]].classList.remove('enemy');
    }

    for (let i = 0; i <= enemies.length - 1; i++) {
        enemies[i] += direction;
    }

    for (let i = 0; i <= enemies.length - 1; i++) {
        if (!enemiesKilled.includes(i)){
            gridBoxes[enemies[i]].classList.add('enemy');
        }
    }

    enemies.forEach((enemy) => {
        if (gridBoxes[enemy].classList.contains('end-game-zone')) {
            clearInterval(enemyId);
        }
    });
}

enemyId = setInterval(moveEnemies, 500);
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
            clearInterval(laserId)
            gridBoxes[laserIndex].classList.remove('laser');
            gridBoxes[laserIndex].classList.remove('enemy');
        }
    
        // REMOVE LASER IF MISSES TARGET //
        if (gridBoxes[laserIndex].classList.contains('laser-death-zone')) {
            clearInterval(laserId);
            gridBoxes[laserIndex].classList.remove('laser');
        }

        // score
        const alienTakenDown = enemies.indexOf(laserIndex);
        enemiesKilled.push(alienTakenDown);
        // result ++
        // resultDisplay.textContent = result;
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