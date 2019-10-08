class Game {

    startGame = () => {
        document.querySelector('.game-play').style.display = "flex";
        document.querySelector('.start-section').style.display = "none";
        this.generateElement();
        this.drawText(targets);
    }

    generateElement = () => {
        for (const t in targets) {
            let container = document.getElementById("enemy-container");
            let d = document.createElement('div');
            d.classList.toggle('alive');
            let p = document.createElement('p');
            container.appendChild(d).appendChild(p);
        }
    }

    drawText = (targets) => {
        let scores = document.getElementsByTagName('p');
        let divs = document.getElementsByTagName('div');
        for (const index in targets) {
            divs[index].style.backgroundImage = 'url(' + targets[index].imgURL + ')';
            scores[index].innerHTML = targets[index].hitPoints;
        }
    }

    damageEnemy = (targets) => {
        //damage a random enemy
        let randInt = ((Math.floor(Math.random() * targets.length)));
        let target = targets[randInt];

        target.damage();

        this.drawText(targets);

        if (target.hitPoints <= 0 && randInt === 0) { //If killing the first character
            this.killThemAll(targets);
            this.drawText(targets);
            this.gameOver();
        } else if (target.hitPoints <= 0) {
            target.die();
            document.getElementsByTagName('div')[targets.indexOf(target)].style.backgroundImage = target.imgURL;
        }
        return targets;
    }

    gameOver = () => {
        document.querySelector(".game-over").style.display = "block";
        document.querySelector('.restart').style.display = "block";
    }

    killThemAll =(targets) => {
        for (const target of targets) {
            target.hitPoints = 0;
            target.imgURL = "./img/pokeball.gif"
        }
    }

    restartGame = () => {
        console.log('Restart');
        window.location.reload()
    }

    runSingleProcess = (targets) => {
        targets = this.damageEnemy(targets);
        this.drawText(targets);
    }
}

class Master extends Game {
    hitPoints = 80;
    damageTaken = 7;
    imgURL = "./img/mewtwo.gif"

    damage = () => {
        if (this.damageTaken >= this.hitPoints) {
            this.hitPoints = 0;
        } else {
            this.hitPoints -= this.damageTaken;
        }
    }

    die = () => {
        this.imgURL = "./img/pokeball.gif"
    }
}

class UpperLevel extends Master {
    hitPoints = 68;
    damageTaken = 10;
    imgURL = "./img/charizard.gif"
}

class Drone extends UpperLevel {
    hitPoints = 60;
    damageTaken = 12;
    imgURL = "./img/pikachu.gif"
}

///////////////////////////////////////////////////////////////////////////////////

//Create instances for targets (These will be the enemies)
const master = new Master();
const upperLevelOne = new UpperLevel();
const upperLevelTwo = new UpperLevel();
const upperLevelThree = new UpperLevel();
const upperLevelFour = new UpperLevel();
const upperLevelFive = new UpperLevel();
const droneOne = new Drone();
const droneTwo = new Drone();
const droneThree = new Drone();
const droneFour = new Drone();
const droneFive = new Drone();
const droneSix = new Drone();
const droneSeven = new Drone();
const droneEight = new Drone();

//Place targets in list
let targets = [master, upperLevelOne, upperLevelTwo, upperLevelThree, upperLevelFour, upperLevelFive, droneOne, droneTwo, droneThree, droneFour, droneFive, droneSix, droneSeven, droneEight];

const game = new Game();
