class Game {

    startGame = () => {
        document.querySelector('.game-play').style.display = "flex";
        document.querySelector('.start-section').style.display = "none";
        this.generateElement();
        this.drawText(targets);
    }

    generateTargets = (enemies) => {
        let targets = [];
        let enemytarget;
        for (const enemyType of enemies) {
            for (let i = 0; i < enemyType.number; i++) {
                switch (enemyType.level) {
                    case ("Master"):
                        enemytarget = new Master();
                        break
                    case ("UpperLevel"):
                        enemytarget = new UpperLevel();
                        break
                    case ("Drone"):
                        enemytarget = new Drone();
                        break
                }
                targets.push(enemytarget)
            }
        }
        return targets
    }

    generateElement = () => {
        for (const t in targets) {
            let container = document.getElementById("main-enemy-container");
            let dSingle = document.createElement('div'); //single main box
            dSingle.classList.toggle("enemy-container")
            let d = document.createElement('div'); //image box
            d.classList.toggle('alive');
            let p = document.createElement('p'); //text
            container.appendChild(dSingle);
            dSingle.appendChild(d);
            dSingle.appendChild(p);
            let hpBox = document.createElement('div');
            let hpBar = document.createElement('div');
            hpBox.classList.toggle('hp-box')
            hpBar.classList.toggle('hp-bar')
            hpBox.appendChild(hpBar);
            dSingle.appendChild(hpBox);
        }
    }

    drawText = (targets) => {
        let scores = document.getElementsByTagName('p');
        let divs = document.querySelectorAll('.alive');

        for (const index in targets) {
            divs[index].style.backgroundImage = 'url(' + targets[index].imgURL + ')';
            scores[index].innerHTML = targets[index].hitPoints;

        }
    }

    damageEnemy = (targets) => {
        //damage a random enemy
        let randInt = ((Math.floor(Math.random() * targets.length)));
        let target = targets[randInt];
        let hps = document.querySelectorAll('.hp-bar');

        target.damage();

        //Update HP bar
        let HPperCent = targets[randInt].hitPoints / targets[randInt].startHitPoints * 100;
        if (HPperCent > 50) {
            hps[randInt].style.backgroundColor = "green";
        } else if (HPperCent < 50 && HPperCent > 25) {
            hps[randInt].style.backgroundColor = "yellow";
        } else {
            hps[randInt].style.backgroundColor = "red";
        }

        hps[randInt].style.width = HPperCent + "%";


        this.drawText(targets);

        if (target.hitPoints <= 0 && randInt === 0) { //If killing the first character
            this.killThemAll(targets);
            this.drawText(targets);
            this.gameOver();
        } else if (target.hitPoints <= 0) { //if killing a single character
            target.die();
            document.getElementsByTagName('div')[targets.indexOf(target)].style.backgroundImage = target.imgURL;
        }
        return targets;
    }

    gameOver = () => {
        document.querySelector(".game-over").style.display = "block";
        document.querySelector('.restart').style.display = "block";
        document.querySelector('html').style.backgroundImage = "url('./img/ending.gif')"
    }

    killThemAll = (targets) => {
        let hps = document.querySelectorAll('.hp-bar');
        for (const target of targets) {
            target.hitPoints = 0;
            target.imgURL = "./img/pokeball.gif"
            const index = targets.indexOf(target);
            hps[index].style.width = "0%"

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
    startHitPoints = 80;
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
    startHitPoints = 68;
    hitPoints = 68;
    damageTaken = 10;
    imgURL = "./img/charizard.gif"
}

class Drone extends UpperLevel {
    startHitPoints = 60;
    hitPoints = 60;
    damageTaken = 12;
    imgURL = "./img/pikachu.gif"
}

const game = new Game();

///////// Define enemies - User can set enemy amounts here /////////
enemies = [{
    level: "Master",
    number: 1
}, {
    level: "UpperLevel",
    number: 5
},
{
    level: "Drone",
    number: 8
}]

//Generate array of enemies based on defined parameters
targets = game.generateTargets(enemies);



