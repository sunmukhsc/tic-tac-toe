const GameBoard = function() {

        const board = ['', '', '',
                        '', '', '',
                        '', '', ''];

        // const init = function() {
        //     cacheDom();
        //     render();
        // };

        // const cacheDom = function() {
        //     this.gameBoardDiv = document.querySelector('.game-board');
        //     for (let i = 0; i < 9; i++) {
        //         this[`square${i}`] = document.querySelector(`#square-${i}`);
        //     }
        // };

        const addToken = function(player, index) {
            let availableCells = false;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') availableCells = true;
            }

            if (!availableCells) return;

            board[index] = player.token;

            // render();
        };

        // const render = function() {
        //     for (let i = 0; i < 9; i++) {
        //         this[`square${i}`].textContent = board[i];
        //     }
        // };

        const getBoard = function() {
            return board;
        }

    //init();
    return {getBoard, addToken};
}

function createPlayer(name, token) {
    return {name, token};
}

const GameController =  (function () {
    const player1 = createPlayer('Player 1', 'X');
    const player2 = createPlayer('Player 2', 'O');
    const players = [player1, player2];

    const board = GameBoard();

    const squares = [];
    const gameBoardDiv = document.querySelector('.game-board');
    for (let i = 0; i < 9; i++) {
        squares[i] = document.querySelector(`#square-${i}`);
    }

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        board.addToken(getActivePlayer(), index);

        switchPlayerTurn();
    }

    const displaySquares = function() {
        for (let i = 0; i < 9; i++) {
            squares[i].textContent = board.getBoard()[i];
        }
    }

    const clickHandler = function(e) {
        const clickedId = e.target.id;
        const index = clickedId[7];
        playRound(index);
        displaySquares();
    }

    for (let i = 0; i < 9; i++) {
        squares[i].addEventListener('click', clickHandler);
    }

    displaySquares();
})()