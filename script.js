const caption = document.getElementById("caption");
const p1Score = document.getElementById("p1Score");
const p2Score = document.getElementById("p2Score");
const p1Input = document.getElementById("p1-name");
const p2Input = document.getElementById("p2-name");
const BtnGameModePvp = document.getElementById("game-mode-pvp");
const BtnGameModeAi = document.getElementById("game-mode-ai");
const p1NameContainer = document.getElementById("p1-name-container");
const p2NameContainer = document.getElementById("p2-name-container");
const startBtnContainer = document.querySelector(".start-button-container");
const newRoundBtn = document.querySelector(".new-round");
const startGameBtn = document.querySelector(".start-button");
const startGame = document.querySelector(".start-button");
const form = document.querySelector(".form");
const p1ScoreHeader = document.querySelector(".p1Score-header");
const p2ScoreHeader = document.querySelector(".p2Score-header");
const newGameBtn = document.querySelector(".new-game");

let p1Name = "";
let p2Name = "";
let checkGameMode = "";
let roundWinner = "";

BtnGameModeAi.addEventListener("click", () => {
    p1NameContainer.style.display = "flex";
    p2NameContainer.style.display = "none";
    startBtnContainer.style.display = "flex";
    form.style.gridTemplateRows = "1fr 500px 1fr";
    checkGameMode = "ai";
})

BtnGameModePvp.addEventListener("click", () => {
    p1NameContainer.style.display = "flex";
    p2NameContainer.style.display = "flex";
    startBtnContainer.style.display = "flex";
    form.style.gridTemplateRows = "1fr 500px 1fr";
    p2Name = "";
    checkGameMode = "pvp";
})

startGame.addEventListener("click", () => {
    form.style.display ="none";
    
    if (checkGameMode === "pvp") { 
        p1Name = p1Input.value;
        p2Name = p2Input.value;

        if (p1Name === "") {
            p1Name = "Player 1";
        };

        if (p2Name === "") {
            p2Name = "Player 2";
        };
    };

    if (checkGameMode === "ai") {
        p2Name = "AI Bot";
        p1Name = p1Input.value;

        if (p1Name === "") {
            p1Name = "Player 1";
        };
    };

    renderGameBoard();
});

//create an array of gameBoard
const gameBoardModule = (function () {
    const gameBoardP1 = [];
    const gameBoardP2 = [];
    return {gameBoardP1, gameBoardP2};
})();

const arrayP1 = gameBoardModule.gameBoardP1;
const arrayP2 = gameBoardModule.gameBoardP2;
const AiPossibleMovesArray = [0,1,2,3,4,5,6,7,8];
const gameGridIdArray = [];

const renderGameBoard = () => {  
    //create players using factory functions
    const createPlayer = (name, playerNumber, marking) => {
        return {name, playerNumber, marking};
    }

    const p1 = createPlayer(p1Name, "Player 1", "X");
    const p2 = createPlayer(p2Name, "Player 2", "O");

    p1ScoreHeader.textContent = `${p1Name}'s Score`;
    p2ScoreHeader.textContent = `${p2Name}'s Score`;
    let currentPlayer = p1;
    appendPlayerTurn(p1);
    
    const gameGrid = document.querySelectorAll(".game-grid");
    gameGrid.forEach(item => gameGridIdArray.push(item));
    gameGrid.forEach(item => item.addEventListener("click", addMark));      
    gameGrid.forEach(item => item.addEventListener("mouseover", function () {
        if (currentPlayer === p1) {
            item.style.backgroundColor = "rgb(255, 103, 231)";
        } else if ((currentPlayer === p2) && (checkGameMode === "pvp")) {
            item.style.backgroundColor = "rgb(12, 236, 221)";
        };
        item.style.transition = "all 0.3s";
    }));
    
    gameGrid.forEach(item => item.addEventListener("mouseout", function () {
        item.style.backgroundColor = "black";
    }));
    
    function appendPlayerTurn (player) {
        caption.textContent = `${player.name}'s Turn`;
    };
    
    function addMark () {
        this.onclick = this.removeEventListener("click", addMark);

        if (checkGameMode === "pvp") {
            if (currentPlayer === p1) { 
                this.innerHTML = "<img src=./images/cross.svg height=150 width=150>";
                currentPlayer = p2;
                appendPlayerTurn(p2);
                arrayP1.push(Number(this.id));
                determineWinner();
            } else if 
            (currentPlayer === p2) {
                this.innerHTML = "<img src=./images/circle.svg height=120 width=120>";
                currentPlayer = p1;           
                appendPlayerTurn(p1);
                arrayP2.push(Number(this.id));
                determineWinner();
            };
        };

        if (checkGameMode === "ai") {
            if (currentPlayer === p1) { 
                this.innerHTML = "<img src=./images/cross.svg height=150 width=150>";
                currentPlayer = p2;
                appendPlayerTurn(p2);
                arrayP1.push(Number(this.id));
                determineWinner();
            };

            if (currentPlayer === p2) {
                setTimeout(
                    function () { 

//smarter AI that blocks 3 in a row
                        function getAiPossibleMoves (playerArray) {
                            const indexToSplice = AiPossibleMovesArray.indexOf(playerArray[playerArray.length-1]);
                            gameGridIdArray.splice(indexToSplice,1);
                            AiPossibleMovesArray.splice(indexToSplice,1);
                        };                        

                        getAiPossibleMoves(arrayP1);
                        const randomElement = Math.floor(Math.random()* gameGridIdArray.length);

                        (() => {
                            const AiMoveNode = gameGridIdArray[randomElement];
                            if (roundWinner.name === undefined) {
                                AiMoveNode.innerHTML = "<img src=./images/circle.svg height=120 width=120>";
                                AiMoveNode.removeEventListener("click",addMark);
                                arrayP2.push(Number(AiMoveNode.id));
                            } else if
                            (roundWinner.name === p1) {
                                AiMoveNode.innerHTML = "";
                            };
                        })();

                        getAiPossibleMoves(arrayP2);
                        currentPlayer = p1;
                        appendPlayerTurn(p1);
                        determineWinner();
                        }, 350);        
                    
            };
        };
};

    function determineWinner () {
        
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
            caption.textContent = `${player.name} Wins!`;
            roundWinner = player;
            currentPlayer = "";
        };
        
        for (x in threeInARow) {
            if (threeInARow[x].every(item => arrayP1.includes(item))) {
                endRound(p1);
                p1Score.innerHTML += "<img src=./images/orange.svg width=60 height=60>"
            } else if
            (threeInARow[x].every(item => arrayP2.includes(item))) {
                endRound(p2);
                p2Score.innerHTML += "<img src=./images/orange.svg width=60 height=60>"
            }
        };
        
        if ((arrayP1.length + arrayP2.length === 9) && (roundWinner.name === undefined)) {
            caption.textContent = 'Tie Game!';
        };
    };
    
    newRoundBtn.addEventListener("click", reset);
//New Round to clear off arrays for AI
        
    function reset () {
        gameGrid.forEach(item => item.innerHTML = "");
        roundWinner = "";
        arrayP1.splice(0, arrayP1.length);g
        arrayP2.splice(0, arrayP2.length);
        currentPlayer = p1; 
        appendPlayerTurn(p1);
        gameGrid.forEach(item => item.addEventListener("click", addMark));    
    };
    
    newGameBtn.addEventListener("click", () => {
        location.reload();
    });
}


