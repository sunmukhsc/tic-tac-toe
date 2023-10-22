const GameBoard = function() {

        const board = ['', '', '',
                        '', '', '',
                        '', '', ''];

        const addToken = function(player, index) {
            board[index] = player.token;
        };

        const getBoard = function() {
            return board;
        }

        const resetBoard = function() {
            for (let i = 0; i < 9; i++) {
                board[i] = '';
            }
        }

    return {getBoard, addToken, resetBoard};
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
    const resetBtn = document.querySelector('.reset')
    const winningDialog = document.querySelector('#winning-dialog');
    const winner = document.querySelector('.winner')
    const squares = [];
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
        const currentBoard = board.getBoard();
        if (currentBoard[index] === '') availableCells = true;

        if(availableCells) {
            board.addToken(getActivePlayer(), index);

            
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
                    winner.textContent = `${activePlayer.name} Wins!`;
                    winningDialog.showModal();
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

    const resetGame = function() {
        board.resetBoard();
        activePlayer = players[0];
        gameOver = false;
        displaySquares();
        showTurn();
    }

    resetBtn.addEventListener('click', resetGame);

    displaySquares();
    showTurn();
})()