
var squareGame = {
    squares : new Array(9).fill(false),
    gameWon : false,
    steps : 0,
    initGame : function() {
        this.squares = this.squares.map((k) => (Math.random() < 0.5) ? false : true);
        this.steps = 0;
    },
    swap : function(elements) {
        for (let i of elements) {
            this.squares[i-1] = !(this.squares[i-1]);
            //wanted to keep the tile numbering scheme of the original game, hence the conversion
        }
    },
    winCond : function(el, index, arr) {
        return ((index + 1 == 5) == !(el));
    },
    choose : function(i) {
        this.steps++;
        switch (i) {
            case 1: this.swap([1, 2, 4, 5]);
                    break;
            case 2: this.swap([1, 2, 3]);
                    break;
            case 3: this.swap([2, 3, 5, 6]);
                    break;
            case 4: this.swap([1, 4, 7]);
                    break;
            case 5: this.swap([2, 4, 5, 6, 8]);
                    break;
            case 6: this.swap([3, 6, 9]);
                    break;
            case 7: this.swap([4, 5, 7, 8]);
                    break;
            case 8: this.swap([7, 8, 9]);
                    break;
            case 9: this.swap([5, 6, 8, 9]);
                    break;
        }
        if (this.squares.every(this.winCond)) {
            this.gameWon = true;
            //Didn't want to mix up game and rendering sections of code
            //so sets var here and sends popup in the eventlistener
        }
        else if (this.gameWon) {
            this.steps = 0; //resets steps if you move after game victory
            this.gameWon = false;
        }
    },
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function drawButton(i) {
    const x = i % 3;
    const y = Math.floor((i)/3);
    if (squareGame.squares[i]) {
        ctx.fillStyle = 'red';
    }
    else {
        ctx.fillStyle = 'black';
    }
    ctx.fillRect((x * 70), (y * 70), 40, 40);
}

function drawAll() {
    for (let i = 0; i < 9; i++) {
        drawButton(i);
    }
}

//Checks if user clicks in one of the buttons, and if so, sends an update
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < 9; i++) {
        const bX = (i % 3) * 70;
        const bY = Math.floor((i)/3) * 70;
        if ( ((x >= bX) && (x <= bX + 40)) && ((y >= bY) && (y <= bY + 40)) ) {
            squareGame.choose(i+1);
            drawAll();
            if (squareGame.gameWon) {
                alert("You won in " + squareGame.steps + " steps !!");
                console.log("You won in " + squareGame.steps + " steps !!");
            }
        }
    }
});

function newGame() {
    squareGame.initGame();
    drawAll();
}

newGame();
