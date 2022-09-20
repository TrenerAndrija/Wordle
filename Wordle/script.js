const recnik = ['house', 'mouse', 'apple', 'plane', 'crane', 'truck', 'audio', 'earth'];

const state = {
    secret: recnik[Math.floor(Math.random() * recnik.length)], 
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0
};


function updateGrid() {
    for(let i=0; i<state.grid.length; i++)
        for(let j=0; j<state.grid[i].length; j++) {
            const box = document.querySelector(`#box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let i=0; i<6; i++)  
        for(let j=0; j<5; j++) {
            drawBox(grid, i, j);
        }

    container.appendChild(grid)
}

function registerKeyboardEvents() {
    document.body.onkeydown = e => {
        const key = e.key;

        if(key === 'Enter') {
            if(state.currentCol === 5) {
                const word = getCurrentWord();

                if(isWordValid(word)) {
                    revealWord(word)
                    state.currentRow++; //predji u novi red
                    state.currentCol = 0; //trenutna kolona 0
                } else {
                    alert('Not a valid word! Press backspace and try again!');
                }
            }
        }

        if(key === 'Backspace') {
            removeLetter();
        }

        if(isLetter(key)) {
            addLetter(key);
        }

        updateGrid();
    }
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
    return recnik.includes(word);
}

function revealWord(guess) {
    const row = state.currentRow;

    for(let i=0; i<5; i++) {
        const box = document.querySelector(`#box${row}${i}`);
        const letter = box.textContent;

        if(letter === state.secret[i]) {
            box.classList.add('right');
        } else if(state.secret.includes(letter)) {
            box.classList.add('wrong')
        } else {
            box.classList.add('empty')
        }
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    if(isWinner) {
        alert(`Congratulations!`);
        document.querySelector('button').style.display = 'block';
    } else if(isGameOver) {
        alert(`Better luck next time! The word was ${state.secret}`);
        document.querySelector('button').style.display = 'block';
    }
}

function removeLetter() {
    if(state.currentCol === 0) return; //ako je trenutna kolona 5, return
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i); //da li slovo postoji && da li se slovo nalazi izmedju a-z
}


function addLetter(letter) {
    if(state.currentCol === 5) return; //ako je trenutna kolona 5, return
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function startup() {
    const game = document.querySelector('#game');
    
    drawGrid(game);

    registerKeyboardEvents();

    document.querySelector('button').addEventListener('click', () => {
        window.location.href = '/';
    })
}

startup(); 
