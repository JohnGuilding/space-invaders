const startScreen = document.querySelector('.start-screen');
const startGame = document.querySelector('.start-game');
const resultDisplay = document.querySelector('.score');

const gridBoxes = document.querySelectorAll('.grid-box');

let heroIndex = 174;
let direction = 1;
let enemiesKilled = [];

let wildCard = true;

// ADDING ENEMIES TO GRID //
const enemies = [
    26, 28, 30,
    76, 78, 80,
    126, 128, 130,
    176, 178, 180,
    226, 228, 230,
    276, 278, 280,
];

enemies.forEach((enemy) => {
    gridBoxes[enemy].classList.add('enemy')
});


// ADDING ZONE WHERE LASER STOPS //
const laserDeathZone = [
    0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300
];

laserDeathZone.forEach((zone) => {
    gridBoxes[zone].classList.add('laser-death-zone');
});


// ENDGAME ZONE //
const endGameZone = [24, 49, 74, 99, 124, 149, 174, 199, 224, 249, 274, 299, 324];

endGameZone.forEach((zone) => {
    gridBoxes[zone].classList.add('end-game-zone');
});


// ADDING HERO TO GRID 
gridBoxes[heroIndex].classList.add('hero');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////
///////// EVENT LISTENER TO START GAME /////////
////////////////////////////////////////////////

const begin = () => {

    startScreen.classList.add('display-none');
    startGame.classList.add('display-none');

    //////////////////
    // MOVE ENEMIES //
    //////////////////

    // global variable //
    window.enemyId;

    const moveEnemies = () => {

        
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

        endGameZone.forEach((zone) => {
            if (gridBoxes[zone].classList.contains('enemy')) {
                clearInterval(window.enemyId);
            }
        });
    }

        window.enemyId = setInterval(moveEnemies, 500);    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                clearInterval(laserId)
                gridBoxes[laserIndex].classList.remove('laser');
                gridBoxes[laserIndex].classList.remove('enemy');

                // SCORE //
                const enemyKilled = enemies.indexOf(laserIndex);
                enemiesKilled.push(enemyKilled);
                resultDisplay.textContent = `Score: ${enemiesKilled.length}`;
            }
        
            // REMOVE LASER IF MISSES TARGET //
            if (gridBoxes[laserIndex].classList.contains('laser-death-zone')) {
                clearInterval(laserId);
                gridBoxes[laserIndex].classList.remove('laser');
            }

        }
        
        // PRESS SPACEBAR TO FIRE LASER //
        switch(e.keyCode) {
            case 32:
                laserId = setInterval(moveLaser, 40);        
                break;
        }
    }

    // event listener for space bar //
    document.addEventListener('keyup', fireLaser);

} ///////////////////////////////////////////////////////////////////////////////////////////////////////////

const gameOver = () => {
    console.log(enemiesKilled);
    enemiesKilled = [];

    console.log('game over');
    console.log(enemiesKilled);


    clearInterval(window.enemyID);

    gridBoxes.forEach(gridBox => {
        if (gridBox.classList.contains('enemy')) {
            gridBox.classList.remove('enemy');
        }
    });

   // ADDING ENEMIES TO GRID //
    const enemies = [
        26, 28, 30,
        76, 78, 80,
        126, 128, 130,
        176, 178, 180,
        226, 228, 230,
        276, 278, 280,
    ];

    enemies.forEach((enemy) => {
        gridBoxes[enemy].classList.add('enemy')
    });
}





//     console.log('game over');
//     begin();

// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ************************************************************************************************************************ //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ************************************************************************************************************************ //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const screenTopZone = [
//     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
// ];
// const screenBottomZone = [
//     300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315
// ];

// screenTopZone.forEach((zone) => {
//     gridBoxes[zone].classList.add('screen-top-zone');
// });

// screenBottomZone.forEach((zone) => {
//     gridBoxes[zone].classList.add('screen-bottom-zone');
// });

// const moveEnemies = () => {

    // enemies.forEach((enemy) => {
    //     if (gridBoxes[enemy].classList.contains('screen-top-zone')) {
    //         direction === 1;
    //     // } else if (direction === 1) {
    //     }
    // });


//  laserDeathZone.forEach((zone) => {
//     if (gridBoxes[zone].classList.contains('enemy')) {
//         // gridBoxes[enemies[i]].classList.remove('enemy');
//         clearInterval(enemyId);
//     }
// });