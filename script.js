const caption = document.querySelector("p");
const newGame = document.querySelector("button");

//create players using factory functions
const createPlayer = (name, playerNumber) => {
    return {name, playerNumber};
}

const p1 = createPlayer("Bob", "Player 1");
const p2 = createPlayer("Janice", "Player 2");

//create an array of gameBoard
const gameBoardModule = (function () {
    const gameBoard = [];
    return {gameBoard};
})();



const renderGameBoard = (() => {
    const array = gameBoardModule.gameBoard;
    const gameGrid = document.querySelectorAll(".game-grid");
    let currentPlayer = p1;
    gameGrid.forEach(item => item.addEventListener("click", addMark));      
    
    function addMark () {
        if (currentPlayer === p1) { 
            this.innerHTML = "<img src=/home/stalloyde/repos/tictactoe/close_FILL0_wght700_GRAD0_opsz48.svg height=190 width=190>";
            caption.textContent = `Player 2's turn`;
            this.onclick = this.removeEventListener("click", addMark);
            currentPlayer = p2;
        } else if
            (currentPlayer === p2) {
                this.innerHTML = "<img src=/home/stalloyde/repos/tictactoe/circle_FILL0_wght700_GRAD0_opsz48.svg height=150 width=150>";
                caption.textContent = `Player 1's turn`
                this.onclick = this.removeEventListener("click", addMark);
                currentPlayer = p1;

            };
        //push data into gameBoard array after each click
    };
    
    newGame.addEventListener("click", reset);
        
    function reset () {
        gameGrid.forEach(item => item.innerHTML = "");
        currentPlayer = p1; 
        caption.textContent = `Player 1's turn`;
        gameGrid.forEach(item => item.addEventListener("click", addMark));    
    };

    return {array, gameGrid, currentPlayer, addMark}
})();


    

