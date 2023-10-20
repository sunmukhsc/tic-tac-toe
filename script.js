(function() {
    const gameBoard = {
        gameBoard: ['X', 'O', 'X',
                     'O', 'X', 'O',
                     'O', 'X', 'O'],

        init: function() {
            this.cacheDom();
            this.render();
        },

        cacheDom: function() {
            this.gameBoardDiv = document.querySelector('.game-board');
            for (let i = 0; i < 9; i++) {
                this[`square${i}`] = document.querySelector(`#square-${i}`);
            }
        },

        render: function() {
            for (let i = 0; i < 9; i++) {
                this[`square${i}`].textContent = this.gameBoard[i];
            }
        }
    };

    gameBoard.init();
})()