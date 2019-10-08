console.log("Hey gurl hey");

class Master {
    hitPoints = 80;
    damageTaken = 7;
    imgURL = "./img/mewtwo.gif"
    constructor(nameOfEnemy) {
        this.name = nameOfEnemy;
    }

    damage = () => {
        if (this.damageTaken >= this.hitPoints) {
            this.hitPoints = 0;
        } else {
            this.hitPoints -= this.damageTaken;
        }
    }

    generateElement = () => {
        let container = document.getElementById("enemy-container");
        let d = document.createElement('div');
        let p = document.createElement('p');
        let i = document.createElement('img');
        container.appendChild(d).appendChild(p);
        container.appendChild(d).appendChild(i);
    }

    die = () => {
        this.imgURL = "./img/pokeball.gif"
        console.log(this.imgURL);
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


//Create instances
const master = new Master('master');
const upperLevelOne = new UpperLevel('upperLevelOne');
const upperLevelTwo = new UpperLevel('upperLevelTwo');
const upperLevelThree = new UpperLevel('upperLevelThree');
const upperLevelFour = new UpperLevel('upperLevelFour');
const upperLevelFive = new UpperLevel('upperLevelFive');
const droneOne = new Drone('droneOne');
const droneTwo = new Drone('droneTwo');
const droneThree = new Drone('droneThree');
const droneFour = new Drone('droneFour');
const droneFive = new Drone('droneFive');
const droneSix = new Drone('droneSix');
const droneSeven = new Drone('droneSeven');
const droneEight = new Drone('droneEight');

//Place targets in list
let targets = [master, upperLevelOne, upperLevelTwo, upperLevelThree, upperLevelFour, upperLevelFive, droneOne, droneTwo, droneThree, droneFour, droneFive, droneSix, droneSeven, droneEight];

// let targets = [master, droneOne, droneFour]
// console.log(targets);


///start the game- draw the scores
targets.forEach(target => {
    target.generateElement();
    // target.displayText();
})

const damageEnemy = (targets) => {
    //damage a random enemy

    let randInt = ((Math.floor(Math.random() * targets.length)));
    let target = targets[randInt];

    target.damage();

    drawText(targets);

    if (target.hitPoints <= 0 && randInt === 0) {
        gameOver();
    } else if (target.hitPoints <= 0) {
        console.log('DED')
        target.die();
        document.getElementById('img')[targets.indexOf(target)].src = target.imgURL;
        targets.splice(targets.indexOf(target), 1)
    }
    return targets
        ;
}

const drawText = (targets) => {
    let scores = document.getElementsByTagName('p');
    let pics = document.getElementsByTagName('img');
    for (index in targets) {
        pics[index].src = targets[index].imgURL;
        scores[index].innerHTML = targets[index].hitPoints;
    }
}

const gameOver = () => {
    alert("You killed them all!");
}

const runSingleProcess = () => {
    targets = damageEnemy(targets);

    console.log(targets);
    if (targets.length === 0) {
        gameOver()
    }
}

const startGame = () => {
    document.querySelector('.attack').style.display = "block";
    document.querySelector('#enemy-container').style.display = "flex";
    document.querySelector('.start').style.display = "none";
}