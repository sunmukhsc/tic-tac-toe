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

    const playerTurnDiv = document.querySelector('.turn');
    const squares = [];
    const gameBoardDiv = document.querySelector('.game-board');
    for (let i = 0; i < 9; i++) {
        squares[i] = document.querySelector(`#square-${i}`);
    }

    let activePlayer = players[0];
    let gameOver = false;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        let availableCells = false;
        if (board.getBoard()[index] === '') availableCells = true;

        if(availableCells) {
            board.addToken(getActivePlayer(), index);

            const currentBoard = board.getBoard();
            if (currentBoard[0]!== '' && currentBoard[0]===currentBoard[1] && currentBoard[0]===currentBoard[2] ||
                currentBoard[3]!== '' && currentBoard[3]===currentBoard[4] && currentBoard[3]===currentBoard[5] ||
                currentBoard[6]!== '' && currentBoard[6]===currentBoard[7] && currentBoard[6]===currentBoard[8] ||
                currentBoard[0]!== '' && currentBoard[0]===currentBoard[3] && currentBoard[0]===currentBoard[6] ||
                currentBoard[1]!== '' && currentBoard[1]===currentBoard[4] && currentBoard[1]===currentBoard[7] ||
                currentBoard[2]!== '' && currentBoard[2]===currentBoard[5] && currentBoard[2]===currentBoard[8] ||
                currentBoard[0]!== '' && currentBoard[0]===currentBoard[4] && currentBoard[0]===currentBoard[8] ||
                currentBoard[2]!== '' && currentBoard[2]===currentBoard[4] && currentBoard[2]===currentBoard[6])  {
                    displaySquares();
                    playerTurnDiv.textContent = `${activePlayer.name} Wins!`;
                    gameOver = true;
                    return;
            }

            switchPlayerTurn();
            displaySquares();
            showTurn();
        }

        

        
    }

    const displaySquares = function() {
        for (let i = 0; i < 9; i++) {
            squares[i].textContent = board.getBoard()[i];
        }
    }

    const showTurn = function() {
        playerTurnDiv.textContent = `${activePlayer.name}'s Turn`;
    }

    const clickHandler = function(e) {
        if (gameOver) return;
        const clickedId = e.target.id;
        const index = clickedId[7];
        playRound(index);
    }

    for (let i = 0; i < 9; i++) {
        squares[i].addEventListener('click', clickHandler);
    }

    displaySquares();
    showTurn();
})()