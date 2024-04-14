const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field {
    constructor() {
        this.size;
        this.height = this.size;
        this.width = this.size;
        this.difficult = 2;
        this.field = [];

        this.hatPositionY = 0;
        this.hatPositionX = 0;
        
        this.currentPositionY = 0;
        this.currentPositionX = 0;

        this.input = '';
        
        this.gameContinue = true;
    }



    getRandomX = () => Math.floor(Math.random() * this.width);

    getRandomY = () => Math.floor(Math.random() * this.height);

    generateFieldRow = () => {
        let fieldRow = [];
        while (fieldRow.length < this.width) {
            fieldRow.push(fieldCharacter)
        }
        return fieldRow;
    }

    generateBaseField = () => {
        while (this.field.length < this.height) {
            this.field.push(this.generateFieldRow());
        }
        return this.field;
    }

    addHoles = () => {
        let counter = 0;
        while (counter < this.difficult) {
            let holePositionY = this.getRandomY();
            let holePositionX = this.getRandomX();
            if (this.field[holePositionY][holePositionX] !== hole) {
                this.field[holePositionY][holePositionX] = hole;
                counter++;
            }

        }
        return this.field;
    }

    addHat = () => {
        do {
            this.hatPositionY = this.getRandomY();
            this.hatPositionX = this.getRandomX();
        }
        while (this.isHole());
        
        this.field[this.hatPositionY][this.hatPositionX] = hat;
    }

    addStartPosition = () => {
        do {
            this.currentPositionY = this.getRandomY();
            this.currentPositionX = this.getRandomX();
        }
        while (this.isHole() || this.isHat());
        
        this.field[this.currentPositionY][this.currentPositionX] = pathCharacter;
    }
    
    print = () => {
    this.field.forEach(element => console.log(element.join(' ')));
    }

    pickSize = () => {
        this.size = prompt('Pick your game board size: XS, S, M, L or XL > ').toUpperCase();
        switch(this.size) {
            case 'XS':
                this.size = 2;
                break;
            case 'S':
                this.size = 6;
                break;
            case 'M':
                this.size = 8;
                break;
            case 'L':
                this.size = 10;
                break;
            case 'XL':
                this.size = 40;
                break;
            default:
                prompt('Come on, if you don\'t pick a valid size, you will die in this loop');
                this.pickSize();

        }
    }

    pickDifficult = () => {
        this.difficult = prompt('Pick your difficult: 0 (easy), 1 (normal), 2 (hard), 666 (...) > ').toUpperCase();
        switch(this.difficult){
            case '0':
                this.difficult = this.size * 1;
                break;
            case '1':
                this.difficult = this.size * this.size * 0.2;
                break;
            case '2':
                this.difficult = this.size * this.size * 0.4;
                break;
            case '1000':
                this.difficult = (this.size * this.size) - 2;
                break;
        }
        if (this.size === 2) {
            this.difficult = 2;
            return
        };
    
    }

    generateField = () => {
        this.generateBaseField();
        this.addHoles();
        this.addHat();
        this.addStartPosition();
        return this.field;
    }

    isInBounds = () => {
        if (this.currentPositionX >= 0 
            && this.currentPositionX < this.width 
            && this.currentPositionY >= 0 
            && this.currentPositionY < this.height) {
            return true;
        }
        else return false;
    }

    isHole = () => {
        if (this.field[this.currentPositionY][this.currentPositionX] === hole) {
            return true;
        };
    }

    isHat = () => {
        if (this.field[this.currentPositionY][this.currentPositionX] === hat) {
            return true;
        }
    }

    getInput = () => {
        return this.input = prompt('Move! L > left \| R > right \| U > up \| D > down  ').toUpperCase();
    }

    updatePosition = () => {
        switch(this.input) {
            case 'L':
                this.currentPositionX = this.currentPositionX - 1;
                break;
            case 'R':
                this.currentPositionX = this.currentPositionX + 1;
                break;
            case 'U':
                this.currentPositionY = this.currentPositionY - 1;
                break;
            case 'D':
                this.currentPositionY = this.currentPositionY + 1;
                break;
            case 'E':
                this.gameContinue = false;
                prompt('Sad you left!');
                break;
            default:
                this.getInput();
        }
    }
    
    updatePath = () => {
        while (this.gameContinue) {
            return this.field[this.currentPositionY][this.currentPositionX] = pathCharacter;
        }
    }

    move = () => {
        if (this.isInBounds() === false) {
            this.gameContinue = false;
            return console.log('\nGAMEOVER\n\nDon\'t run away. Stay within boundaries :/\n');
        };
        if (this.isHole() === true) {
            this.gameContinue = false;
            return console.log('\nGAMEOVER\n\nBad choice, you fell in a hole :_\n');
        };
        if (this.isHat() === true) {
            this.gameContinue = false;
            return console.log('\nCONGRATS!\n\nYou found your hat :)\n');
        };
    }

    static createNewGame(newSize, newDifficult) {
        let newGame = new Field(newSize, newDifficult);
        return newGame;
    }

}



//let myField = new Field(12, 3);
//myField.runGame();

//prompt('Size: '), prompt('Difficult:')



runGame = () => {
    console.log('troncho 1');
    let newGame = Field.createNewGame();
    console.log('troncho 2');
    newGame.pickSize();
    console.log('troncho 3');
    newGame.pickDifficult();
    newGame.generateField();
    console.log('troncho 4')
    while (newGame.gameContinue) {
        newGame.print();
        newGame.getInput();
        newGame.updatePosition();
        newGame.move();
        newGame.updatePath();
    }
}

runGame();

/*
    runGame = () => {
        this.generateField();
        while (this.gameContinue) {
            this.print();
            this.getInput();
            this.updatePosition();
            this.move();
            this.updatePath();
        }
    }
*/
