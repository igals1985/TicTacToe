var Game = /** @class */ (function () {
    function Game(t, rst) {
        this.gameRun = true;
        this.compDone = false;
        this.table = t;
        this.board =
            ["0", "0", "0",
                "0", "0", "0",
                "0", "0", "0"];
        this.reset = rst;
        this.WinBoard = [
            ["0", "1", "2"],
            ["3", "4", "5"],
            ["6", "7", "8"],
            ["0", "3", "6"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["0", "4", "8"],
            ["2", "4", "6"]
        ];
        console.log(this.WinBoard.length);
    }
    //reset game func
    Game.prototype.Reset = function () {
        this.board = ["0", "0", "0",
            "0", "0", "0",
            "0", "0", "0"];
        this.gameRun = true;
        for (var i = 0; i < 9; i++) {
            this.table[i].style.color = "white";
            this.table[i].innerHTML = "&nbsp;";
        }
    };
    //func that check if the board is full, if it is, the game over
    Game.prototype.IsFull = function () {
        for (var i = 0; i < 9; i++) {
            if (this.board[i] == "0")
                return false;
        }
        return true;
    };
    // func that called by the player, every time he click on the board   
    Game.prototype.ClickCell = function (i) {
        if (!this.gameRun) {
            alert("Game over");
        }
        else {
            if (this.board[i] != "0") {
                alert("already played");
            }
            else {
                this.table[i].style.color = "#25bfc4"; //mark the player choise
                this.table[i].innerHTML = "X";
                this.board[i] = "p";
                if (this.pointMap(this.board) == "p") {
                    this.gameRun = false;
                    alert("Player won");
                }
                else {
                    if (this.IsFull()) {
                        this.gameRun = false;
                        alert("Draw match");
                    }
                    else {
                        this.compDone = false; //go to func to choose the best cell or computer
                        this.pointMap(this.board);
                        if (this.compDone == false) {
                            this.randomComp(this.board);
                        }
                        if (this.pointMap(this.board) == "c") {
                            this.gameRun = false;
                            alert("Computer won");
                        }
                        else {
                            if (this.IsFull()) {
                                this.gameRun = false;
                                alert("Draw match");
                            }
                        }
                    }
                }
            }
        }
    };
    Game.prototype.pointMap = function (board) {
        var blankCell; // go with for loop for evry line on winboard
        for (var i = 0; i < this.WinBoard.length; i++) {
            var indexies = this.WinBoard[i]; // every item of indexies presents the row\column\diagonal indexies map of the board         
            console.log("Checking indexies with [" + indexies.join(", ") + "] ");
            // for every index map we store playerPoints and computerPoints
            for (var j = 0, playerPoints = 0, computerPoints = 0; j < indexies.length; j++) {
                var boardIndex = indexies[j];
                console.log("Index[" + boardIndex + "]=" + this.board[boardIndex]);
                if (this.board[boardIndex] == "p") {
                    playerPoints++; // counting the points in evry line of winBoard
                }
                if (this.board[boardIndex] == "c") {
                    computerPoints++;
                }
                if (this.board[boardIndex] == "0") {
                    blankCell = Number(boardIndex);
                }
            }
            if (computerPoints == 3) {
                this.compDone = true;
                return "c";
            }
            if (playerPoints == 3) {
                this.compDone = true;
                return "p";
            }
            if (playerPoints == 2 && blankCell != undefined && this.compDone == false) {
                this.compDone = true;
                this.table[blankCell].style.color = "#fac95f";
                this.table[blankCell].innerHTML = "O";
                this.board[blankCell] = "c";
                return "blankCell";
            }
            if (computerPoints == 2 && blankCell != undefined && this.compDone == false) {
                this.compDone = true;
                this.table[blankCell].style.color = "#fac95f";
                this.table[blankCell].innerHTML = "O";
                this.board[blankCell] = "c";
                return "blankCell";
            }
        }
    };
    // func to choose random
    Game.prototype.randomComp = function (board) {
        var r = Math.floor(Math.random() * 10);
        if (this.board[r] == "0") {
            this.table[r].style.color = "#fac95f";
            this.table[r].innerHTML = "O";
            this.board[r] = "c";
            this.compDone = true;
            return r;
        }
        else {
            this.randomComp(this.board);
        }
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map