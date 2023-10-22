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
    const resetBtn = document.querySelector('#reset');
    const winner = document.querySelector('.winner')
    const squares = [];
    for (let i = 0; i < 9; i++) {
        squares[i] = document.querySelector(`#square-${i}`);
    }
    const winningDialog = document.querySelector('#winning-dialog');
    const playAgainBtn = document.querySelector('#play-again');
    const namesDialog = document.querySelector('#names-dialog');
    const confirmBtn = namesDialog.querySelector('#confirmBtn');
    const customNamesBtn = document.querySelector('#custom-names');
    const playerInput1 = namesDialog.querySelector('#player1-name');
    const playerInput2 = namesDialog.querySelector('#player2-name');
    

    let activePlayer = players[0];
    let gameOver = false;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;


    const playRound = (index) => {
        let isAvailable = false;
        let currentBoard = board.getBoard();
        if (currentBoard[index] === '') isAvailable = true;

        if(isAvailable) {
            board.addToken(getActivePlayer(), index);
            currentBoard = board.getBoard();

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
            
            let availableCells = false;
            for (let i = 0; i < 9; i++) {
                if (currentBoard[i] === ''){
                    availableCells = true;
                    break;
                }
            }

            if (!availableCells) {
                displaySquares();
                playerTurnDiv.textContent = `Tie Game!`;
                gameOver = true;
                winner.textContent = `Tie Game!`;
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

    const playAgain = function() {
        winningDialog.close();
        resetGame();
    }

    const setPlayerNames = function() {
        players[0].name = playerInput1.value;
        players[1].name = playerInput2.value;
    }

    resetBtn.addEventListener('click', () => {
        players[0].name = "Player 1";
        players[1].name = "Player 2";
        resetGame();
    });

    playAgainBtn.addEventListener('click', playAgain);
    customNamesBtn.addEventListener('click', () => {
        namesDialog.showModal();
    });
    namesDialog.addEventListener("cancel", (event) => {})
    confirmBtn.addEventListener('click', (event) => {
        event.preventDefault();
        confirmBtn.value = "default";
        namesDialog.close(confirmBtn.value);
    })
    namesDialog.addEventListener("close", (e) => {
        if (namesDialog.returnValue !== 'cancel') {
          setPlayerNames();
          resetGame();
        }
      });

    displaySquares();
    showTurn();
})()