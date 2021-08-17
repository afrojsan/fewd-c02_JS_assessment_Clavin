const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let checkGame;
let x = 0;
let y = 0;
let width;
let height;
let newField;
let widthField;
let randomField;
let randomHeight;
let randomWidth;
let nextDirection;
let hard;

class Field {
    constructor(field) {
        this._field = field;
    }

    get field() {
        return this._field;
    }

    print() {
        this.field.forEach(element => {
            (console.log(element.join('')));
        });
    }

    static generateField(height, width) {
        widthField = Number(width);
        newField = new Array(Number(height));
        for (let i = 0; i < newField.length; i++) {
            newField[i] = new Array;
        }
        return newField;
    }
}


function randomHat() {
    do {
        randomHeight = (Math.floor(Math.random() * height));
        randomWidth = (Math.floor(Math.random() * width));
    }
    while (randomWidth === 0 && randomHeight === 0);
}

function createField(arr) {
    for (let j = 0; j < arr.length; j++) {
        for (let k = 0; k < widthField; k++) {
            if (Math.random() < (hard / 10)) {
                arr[j].push(hole);
            } else {
                arr[j].push(fieldCharacter);
            }
        }
        arr[0].splice(0, 1, pathCharacter);
    }
    randomHat();
    arr[randomHeight].splice(randomWidth, 1, hat);
    randomField = new Field(arr);
}


do {
    width = prompt('Enter the width: ');
}
while (isNaN(width));
do {

    height = prompt('Enter the heigth: ');
}
while (isNaN(height));

do {
    hard = prompt(`Enter 1-5 to choose difficulty : `);
}
while (0 > hard || hard > 5) {}

Field.generateField(height, width);
createField(newField);



while (checkGame !== "win" && checkGame !== "lost") {
    randomField.print();

    nextDirection = prompt('Use key [Up = W, Down = S, Left = A, Right = D] What is the next direction?: ');

    if (nextDirection === 'D' || nextDirection === 'd') {
        x++;
        if (x >= width || randomField.field[y][x] === hole) {
            console.log('you lose');
            return checkGame = "lost";
        } else if (randomField.field[y][x] === hat) {
            console.log('you win');
            return checkGame = "win";
        } else {
            randomField.field[y].splice(x, 1, pathCharacter);
        }

    } else if (nextDirection === 'A' || nextDirection === 'a') {
        x--;
        if (x < 0 || randomField.field[y][x] === hole) {
            console.log('you lose');
            return checkGame = "lost";
        } else if (randomField.field[y][x] === hat) {
            console.log('you win');
            return checkGame = "win";
        } else {
            randomField.field[y].splice(x, 1, pathCharacter);
        }

    } else if (nextDirection === 'S' || nextDirection === 's') {
        y++;
        if (y >= height || randomField.field[y][x] === hole) {
            console.log('you lose');
            return checkGame = "lost";
        } else if (randomField.field[y][x] === hat) {
            console.log('you win');
            return checkGame = "win";
        } else {
            randomField.field[y].splice(x, 1, pathCharacter);
        }

    } else if (nextDirection === 'W' || nextDirection === 'w') {
        y--;
        if (y < 0 || randomField.field[y][x] === hole) {
            console.log('you lose');
            return checkGame = "lost";
        } else if (randomField.field[y][x] === hat) {
            console.log('you win');
            return checkGame = "win";
        } else {
            randomField.field[y].splice(x, 1, pathCharacter);
        }
    } else {
        console.log(`Wrong key try again!!`)
    }
}