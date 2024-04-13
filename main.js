const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field {
    constructor(width, height, difficult) {
        this.height = height;
        this.width = width;
        this.difficult = difficult;
        this.field = [];

        this.hatPositionY = 0;
        this.hatPositionX = 0;
        
        this.currentPositionY = 0;
        this.currentPositionX = 0;

        this.input = '';
        
        this.gameContinue = true;
    }

    getRandomPositionX = () => Math.floor(Math.random() * this.width);

    getRandomPositionY = () => Math.floor(Math.random() * this.height);

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
            let selectRow = this.getRandomPositionY();
            let selectPosition = this.getRandomPositionX();
            if (this.field[selectRow][selectPosition] !== hole) {
                this.field[selectRow][selectPosition] = hole;
                counter++;
            }

        }
        return this.field;
    }

    addHat = () => {
        do {
            this.hatPositionY = this.getRandomPositionY();
            this.hatPositionX = this.getRandomPositionX();
        }
        while (this.field[this.hatPositionY][this.hatPositionX] === hole);
        
        this.field[this.hatPositionY][this.hatPositionX] = hat;
    }

    addStartPosition = () => {
        do {
            this.currentPositionY = this.getRandomPositionY();
            this.currentPositionX = this.getRandomPositionX();
        }
        while (this.field[this.currentPositionY][this.currentPositionX] === hole || this.field[this.currentPositionY][this.currentPositionX] === hat);
        
        this.field[this.currentPositionY][this.currentPositionX] = pathCharacter;
    }
    
    print = () => {
    this.field.forEach(element => console.log(element.join(' ')));
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
        return this.input = prompt('Move!\nL > left \| R > right \| U > up \| D > down').toUpperCase();
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
                console.log('Sad you left!');
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
}

let myField = new Field(12, 12, 20);
myField.runGame();
