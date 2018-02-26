class Game {
    public board: string[]
    public table: HTMLElement[];
    public reset: HTMLButtonElement;
    public WinBoard: string[][]
    public gameRun: boolean = true;
    public compDone: boolean = false;


    constructor(t: HTMLElement[], rst: HTMLButtonElement) {
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
    public Reset() {
        this.board = ["0", "0", "0",
                      "0", "0", "0",
                      "0", "0", "0"];
        this.gameRun = true;
        for (let i = 0; i < 9; i++) {
            this.table[i].style.color = "white";
            this.table[i].innerHTML = "&nbsp;";
        }
    }
     //func that check if the board is full, if it is, the game over
    public IsFull(): boolean {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == "0")
                return false;
        }
        return true
    }

     // func that called by the player, every time he click on the board   
    public ClickCell(i: number) {
        if (!this.gameRun) {              //check if the game still continue
            alert("Game over");
        }
        else {
            if (this.board[i] != "0") {        // protect the cell that is already occupied
                alert("already played");
            }
            else {
                this.table[i].style.color = "#25bfc4";       //mark the player choise
                this.table[i].innerHTML = "X";
                this.board[i] = "p";
                if (this.pointMap(this.board) == "p") {           //check if player won
                    this.gameRun = false;
                    alert("Player won");
                }
                else {
                    if (this.IsFull()) {                                //check if it is draw (full but no winner)
                        this.gameRun = false;
                        alert("Draw match");
                    }
                    else {
                        this.compDone = false                                 //go to func to choose the best cell or computer
                        this.pointMap(this.board)
                        if (this.compDone == false) {                            //if the best cell not foanded it take one by random 
                            this.randomComp(this.board)
                            
                        }
                        if (this.pointMap(this.board) == "c") {                    //check if computer won
                            this.gameRun = false;
                            alert("Computer won");
                        }
                        else {
                            if (this.IsFull()) {                                        //check if it is draw (full but no winner)
                                this.gameRun = false;
                                alert("Draw match");
                            }
                        }
                    }
                }
            }
        }
    }


    public pointMap(board: string[]): string {                                      // the first part the func map the game board to win board
        var blankCell: number                                                       // go with for loop for evry line on winboard
        for (var i = 0; i < this.WinBoard.length; i++) {                            // taking indexies of the board
            var indexies = this.WinBoard[i];                                        // every item of indexies presents the row\column\diagonal indexies map of the board         
            console.log("Checking indexies with [" + indexies.join(", ") + "] ");
                                                                                                       // for every index map we store playerPoints and computerPoints
            for (var j = 0, playerPoints = 0, computerPoints = 0; j < indexies.length; j++) {          // go with for loop for every cell on the line winboard
                var boardIndex = indexies[j];
                console.log("Index[" + boardIndex + "]=" + this.board[boardIndex]);                   
                if (this.board[boardIndex] == "p") {
                    playerPoints++;                                                                      // counting the points in evry line of winBoard
                }
                if (this.board[boardIndex] == "c") {
                    computerPoints++;
                }
                if (this.board[boardIndex] == "0") {
                    blankCell = Number(boardIndex)
                }
            }
            if (computerPoints == 3) {                                                                      // check if anyone won
                this.compDone = true
                return "c"
            }
            if (playerPoints == 3 ) {
                this.compDone = true
                return "p"
            }
            if (playerPoints == 2 && blankCell != undefined && this.compDone == false) {                     // check option to block
                this.compDone = true
                this.table[blankCell].style.color = "#fac95f"
                this.table[blankCell].innerHTML = "O";
                this.board[blankCell] = "c";
                return "blankCell"
            }
            if (computerPoints == 2 && blankCell != undefined && this.compDone == false) {                        // check option to win
                this.compDone = true
                this.table[blankCell].style.color = "#fac95f"
                this.table[blankCell].innerHTML = "O";
                this.board[blankCell] = "c";
                return "blankCell"
            }
        }
    }

     // func to choose random
    public randomComp(board: string[]): number {
        var r = Math.floor(Math.random() * 10);
        if (this.board[r] == "0") {
            this.table[r].style.color = "#fac95f"
            this.table[r].innerHTML = "O";
            this.board[r] = "c";
            this.compDone = true
            return r
        }
        else {
            this.randomComp(this.board)
        }
        }
    }





