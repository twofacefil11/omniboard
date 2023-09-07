
const body = document.getElementsByTagName("body");
const board = document.getElementById("board");
const columnsSldr = document.getElementById("columns")
const pawnsSldr = document.getElementById("pawns")
const rowsSldr = document.getElementById("rows")
const whitesPicker = document.getElementById("whites");
const blacksPicker = document.getElementById("blacks");
const boardClrPicker = document.getElementById("boardClr");
const boardRadiusSldr = document.getElementById("borderRadius");
const pawnSpawn = document.getElementsByClassName("spawnContainer");
const controlStrip = document.getElementById('controls');

//suwak akszyn
rowsSldr.addEventListener("input", createBoard);
columnsSldr.addEventListener("input", createBoard);

//color akszyn:
whitesPicker.addEventListener("input", createBoard);
blacksPicker.addEventListener("input", createBoard);
boardClrPicker.addEventListener("input", createBoard);

//spacing action:
boardRadiusSldr.addEventListener("input", createBoard);


let whites = whitesPicker.value;
let blacks = blacksPicker.value;
let boardClr = boardClrPicker.value;

let mousePressed = false;
let pawnsArr = [];
let dragged = null;

let er;
createBoard();

//pawnSpawn


//spawn Blacks and drag the copies
pawnSpawn[0].addEventListener('mousedown', function(event) {
    
    const spawnPos0 = getAbsolutePosition(pawnSpawn[0].children[0]);
    mousePressed = true;

    //spawnPawn
    pawnsArr.push(new Pawn(blacks, "pawn", er, spawnPos0.left, spawnPos0.top));
    dragged = pawnsArr[pawnsArr.length - 1];
    document.body.appendChild(dragged.actualThing);

    //dont highlight text xd
    event.preventDefault();

    document.addEventListener('mousemove', onMouseMove);
});

//whites spawn
pawnSpawn[1].addEventListener('mousedown', function(event) {
    
    const spawnPos1 = getAbsolutePosition(pawnSpawn[1].children[0]);
    mousePressed = true;
    
    //spawnPawn
    pawnsArr.push(new Pawn(whites, "pawn", er, spawnPos1.left, spawnPos1.top));
    dragged = pawnsArr[pawnsArr.length - 1];
    document.body.appendChild(dragged.actualThing);
    
    //dont highlight text xd
    event.preventDefault();
    
    document.addEventListener('mousemove', onMouseMove);
});

//action on mouseup
document.addEventListener('mouseup', function() {
    if (dragged) {
        mousePressed = false;
        console.log("puściłęś się");

        document.removeEventListener('mousemove', onMouseMove);
        
        if (!(dragged.isOnBoard())) 
            dragged.makeItFall();
    
        dragged = null;
    }
});


function update(r) {

    if (pawnsArr[0]) {
        if (!pawnsArr[0].isOnBoard()) {
            pawnsArr[0].makeItFall();
            console.log("wielku chuj")
        }
    }

    if (pawnsArr.length > 0) {
        pawnsArr.forEach(e => {
            if (!e.isOnBoard())
                e.makeItFall();
        })
    }

    pawnSpawn[0].innerHTML = '';
    pawnSpawn[1].innerHTML = '';
    
    const blacksSpawn = new Pawn(blacks, "pawnSpawn", r);
    pawnSpawn[0].appendChild(blacksSpawn.actualThing);
    
    const whitesSpawn = new Pawn(whites, "pawnSpawn", r);
    pawnSpawn[1].appendChild(whitesSpawn.actualThing);
    

    // if (pawnsArr.length > 0) {
    //     pawnsArr.forEach(e => {
    //         if (!e.isOnBoard()) {
    //             e.makeItFall()
    //         }
    //     })
    // }
}


function createBoard() {

    //setting new colours
    whites = whitesPicker.value;
    blacks = blacksPicker.value;
    board.style.backgroundColor = boardClrPicker.value;

    // setting board looks
    board
    board.style.borderRadius = boardRadiusSldr.value + 'px';
    
    //clear all
    board.innerHTML = '';
    
    let c = columnsSldr.value;
    let r = rowsSldr.value;
    const fixed = 0.8;
    
    //fitting the board on the screen
    let sqrSize = 0;
    let prefWidth = (window.innerWidth * fixed).toFixed(1);
    let prefHeight = (window.innerHeight * fixed).toFixed(1);
    
    if (window.innerHeight > window.innerWidth)
        sqrSize = prefWidth / c;
    else
        sqrSize = prefHeight / r;

    if (c * sqrSize > prefWidth)
        sqrSize = prefWidth / c;
    else if (r * sqrSize > prefHeight)
        sqrSize = prefHeight / r;

    //cap the square size at the fixed size of control bar
    if (sqrSize >= controls.clientHeight)
        sqrSize = controls.clientHeight;
    
    board.style.width = (sqrSize * c).toString() + 'px';
    board.style.height = (sqrSize * r).toString() + 'px';
    
    //populating the div with squares
    for (let i = 0; i < r; i++) {
        let flip = ((i + 1) % 2 == 0) ? 1 : 2;

        for (let j = 0; j < c; j++) {
            
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.width = sqrSize.toString() + 'px';
            square.style.height = sqrSize.toString() + 'px';
            
            if ((j + flip) % 2 == 0)
            square.style.backgroundColor = whites;
        else
        square.style.backgroundColor = blacks;
    
    //board radius to corners
            let br = (parseInt(boardRadiusSldr.value) - 10).toString();
            if (i == 0) {
                if (j == 0)
                square.style.borderRadius = br + 'px 0px 0px 0px';
            else if (j == c - 1)
            square.style.borderRadius = '0px ' + br + 'px 0px 0px';
    }
    else if (i == r - 1) {
        if (j == c - 1)
        square.style.borderRadius = '0px 0px ' + br + 'px 0px';
    else if (j == 0)
    square.style.borderRadius = '0px 0px 0px ' + br + 'px';
            }
            board.append(square);
        } 
    }
    
    update(sqrSize / 2);
    er = sqrSize / 2;
    return sqrSize / 2;

}
 




//TODO:
// COLOR PAWN SYSTEMS,
//QOL: color change, snapping on grid, intersections, borders, buttons, 
// saving settings, saving game, multiplying pawns like manna, disposing of pawns

