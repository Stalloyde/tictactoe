const caption = document.querySelector("p");
const newGame = document.querySelector("button");

//create players using factory functions
const createPlayer = (name, playerNumber, marking) => {
    return {name, playerNumber, marking};
}

const p1 = createPlayer("Bob", "Player 1", "X");
const p2 = createPlayer("Janice", "Player 2", "O");

//create an array of gameBoard
const gameBoardModule = (function () {
    const gameBoardP1 = [];
    const gameBoardP2 = [];
    return {gameBoardP1, gameBoardP2};
})();

const arrayP1 = gameBoardModule.gameBoardP1;
const arrayP2 = gameBoardModule.gameBoardP2;

const renderGameBoard = (() => {  
    const gameGrid = document.querySelectorAll(".game-grid");
    let currentPlayer = p1;
    gameGrid.forEach(item => item.addEventListener("click", addMark));      
    
    function addMark () {
        if (currentPlayer === p1) { 
            this.innerHTML = "<img src=/home/stalloyde/repos/tictactoe/close_FILL0_wght700_GRAD0_opsz48.svg height=190 width=190>";
            this.onclick = this.removeEventListener("click", addMark);
            currentPlayer = p2;
            caption.textContent = `Player 2's turn`;
            arrayP1.push(Number(this.id));
        } else if
            (currentPlayer === p2) {
                this.innerHTML = "<img src=/home/stalloyde/repos/tictactoe/circle_FILL0_wght700_GRAD0_opsz48.svg height=150 width=150>";
                this.onclick = this.removeEventListener("click", addMark);
                currentPlayer = p1;
                caption.textContent = `Player 1's turn`
                arrayP2.push(Number(this.id));
            };

        (function determineWinner () {
            const threeInARow = {
                1: [0,1,2],
                2: [0,3,6],
                3: [0,4,8],
                4: [1,4,7],
                5: [2,5,8],
                6: [3,4,5],
                7: [6,7,8],
                8: [2,4,6],
            };

            function endRound (player) {
                gameGrid.forEach(item => item.removeEventListener("click", addMark));
                console.log(`${player.playerNumber}: ${player.name} wins`);
                roundWinner = player;
            };
            
            let roundWinner = "";
            for (x in threeInARow) {
                if (threeInARow[x].every(item => arrayP1.includes(item))) {
                    endRound(p1);
                } else if
                (threeInARow[x].every(item => arrayP2.includes(item))) {
                    endRound(p2);
                }
            };

            if ((arrayP1.length + arrayP2.length === 9) && (roundWinner.name === undefined)) {
                console.log("TIE");
            };
        })();
    };
    
    newGame.addEventListener("click", reset);
        
    function reset () {
        gameGrid.forEach(item => item.innerHTML = "");
        arrayP1.splice(0, arrayP1.length);
        arrayP2.splice(0, arrayP2.length);
        currentPlayer = p1; 
        caption.textContent = `Player 1's turn`;
        gameGrid.forEach(item => item.addEventListener("click", addMark));    
    };

    return {arrayP1, arrayP2, gameGrid, currentPlayer, addMark}
})();





    

