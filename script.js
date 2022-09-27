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

    for (let i=0; i<array.length; i++) {
        gameGrid[i].textContent = array[i];
    }
})()
    

