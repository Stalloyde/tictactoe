//create players using factory functions
const createPlayer = (name, playerNumber, marking) => {
    return {name, playerNumber, marking};
}

const p1 = createPlayer("Bob", "Player 1", "X");
const p2 = createPlayer("Janice", "Player 2", "O");

//create an array of gameBoard
const gameBoardModule = (function () {
    const gameBoard = [
        p1.marking, p1.marking, p2.marking,
        p1.marking, p2.marking, p2.marking,
        p2.marking, p1.marking, p2.marking,
    ];
    return {gameBoard};
})();

(function renderGameBoard () {
    const array = gameBoardModule.gameBoard;
    const gameGrid = document.querySelectorAll(".game-grid");

    gameGrid.forEach(item => item.addEventListener("click", addMark));      

    function addMark () {
        for (let i=0; i<array.length; i++) {
            if ((gameGrid[i].id === this.id) && (array[i] === "X")) {
                gameGrid[i].innerHTML = "<img src=/home/stalloyde/repos/tictactoe/close_FILL0_wght700_GRAD0_opsz48.svg height=190 width=190>";
            } else if 
            ((gameGrid[i].id === this.id) && (array[i] === "O")) {
                gameGrid[i].innerHTML = "<img src=/home/stalloyde/repos/tictactoe/circle_FILL0_wght700_GRAD0_opsz48.svg height=150 width=150>";
            }
        };
    };
})();
