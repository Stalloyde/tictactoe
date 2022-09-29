const caption = document.getElementById("caption");
const newGame = document.querySelector("button");
const p1Score = document.getElementById("p1Score");
const p2Score = document.getElementById("p2Score");

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
    gameGrid.forEach(item => item.addEventListener("mouseover", function () {
        if (currentPlayer === p1) {
            item.style.backgroundColor = "rgb(255, 103, 231)";
        } else {
            item.style.backgroundColor = "rgb(12, 236, 221)";
        }
    }));
    
    gameGrid.forEach(item => item.addEventListener("mouseout", function () {
        item.style.backgroundColor = "black";
    }))
    
    function playerTurn (player) {
        caption.textContent = `${player.name}'s (${player.playerNumber}) Turn`;
    }

    function addMark () {
        if (currentPlayer === p1) { 
            this.innerHTML = "<img src=cross.svg height=150 width=150>";
            this.onclick = this.removeEventListener("click", addMark);
            currentPlayer = p2;
            playerTurn(p2);
            arrayP1.push(Number(this.id));
        } else if
            (currentPlayer === p2) {
                this.innerHTML = "<img src=circle.svg height=120 width=120>";
                this.onclick = this.removeEventListener("click", addMark);
                currentPlayer = p1;
                playerTurn(p1);
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
                caption.textContent = `${player.name} (${player.playerNumber}) Wins!`;
                roundWinner = player;
            };
            
            let roundWinner = "";
            for (x in threeInARow) {
                if (threeInARow[x].every(item => arrayP1.includes(item))) {
                    endRound(p1);
                    p1Score.innerHTML += "<img src=orange.svg width=40 height=40>"
                } else if
                (threeInARow[x].every(item => arrayP2.includes(item))) {
                    endRound(p2);
                    p2Score.innerHTML += "<img src=orange.svg width=40 height=40>"
                }
            };

            if ((arrayP1.length + arrayP2.length === 9) && (roundWinner.name === undefined)) {
                caption.textContent = 'Tie Game!';
            };
        })();
    };
    
    newGame.addEventListener("click", reset);
        
    function reset () {
        gameGrid.forEach(item => item.innerHTML = "");
        arrayP1.splice(0, arrayP1.length);
        arrayP2.splice(0, arrayP2.length);
        currentPlayer = p1; 
        playerTurn(p1);
        gameGrid.forEach(item => item.addEventListener("click", addMark));    
    };

    return {arrayP1, arrayP2, gameGrid, currentPlayer, addMark}
})();





    

