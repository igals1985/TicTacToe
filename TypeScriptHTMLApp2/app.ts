window.onload = function () {
    let cell11 = document.getElementById("cell11");
    let cell12 = document.getElementById("cell12");
    let cell13 = document.getElementById("cell13");
    let cell21 = document.getElementById("cell21");
    let cell22 = document.getElementById("cell22");
    let cell23 = document.getElementById("cell23");
    let cell31 = document.getElementById("cell31");
    let cell32 = document.getElementById("cell32");
    let cell33 = document.getElementById("cell33");
    let reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("reset");

let game1: Game = new Game([cell11, cell12, cell13,cell21, cell22, cell23,cell31, cell32, cell33], reset);
cell11.onclick = function (e) { game1.ClickCell(0); };
cell12.onclick = function (e) { game1.ClickCell(1); };
cell13.onclick = function (e) { game1.ClickCell(2); };
cell21.onclick = function (e) { game1.ClickCell(3); };
cell22.onclick = function (e) { game1.ClickCell(4); };
cell23.onclick = function (e) { game1.ClickCell(5); };
cell31.onclick = function (e) { game1.ClickCell(6); };
cell32.onclick = function (e) { game1.ClickCell(7); };
cell33.onclick = function (e) { game1.ClickCell(8); };
reset.onclick = function (e) { game1.Reset(); };
}
