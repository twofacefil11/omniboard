
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
const dropzone = document.getElementById("dropzone");

//suwak akszyn
rowsSldr.addEventListener("input", createBoard);
columnsSldr.addEventListener("input", createBoard);

//color akszyn:
whitesPicker.addEventListener("input", createBoard);
blacksPicker.addEventListener("input", createBoard);
boardClrPicker.addEventListener("input", createBoard);

//spacing action:
boardRadiusSldr.addEventListener("input", createBoard);

whites = whitesPicker.value;
blacks = blacksPicker.value;
boardClr = boardClrPicker.value;

let ID = 0;
let mousePressed = false;
let pawnsArr = [];
let dragged = null;
let er = 0;

createBoard();

//SpawnListener
activateSpawner(pawnSpawn[0], blacksPicker);
activateSpawner(pawnSpawn[1], whitesPicker);

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

if (pawnsArr.length > 0) {
    pawnsArr.forEach(e => {
        if (!e.isOnBoard()) {
            e.makeItFall();
            e.fell = true;
            if (e.isOnBoard() && e.fell) {
                e.makeItBlink();
            }
        }
    })
}

// if (pawnsArr.length > 0) {
//     pawnsArr.forEach(e => {
//         if (e.isOnBoard() && e.fell) {
//             e.makeItBlink();
//         }
//     })
// }




// if (e.isOnBoard() && e.fell)
// e.makeItBlink();



pawnSpawn[0].innerHTML = '';
pawnSpawn[1].innerHTML = '';

const blacksSpawn = new Pawn(blacks, "pawnSpawn", r);
const whitesSpawn = new Pawn(whites, "pawnSpawn", r);

pawnSpawn[0].appendChild(blacksSpawn.actualThing);
pawnSpawn[1].appendChild(whitesSpawn.actualThing);

blacksSpawn.currentCollor = whitesPicker.value;
whitesSpawn.currentCollor = blacksPicker.value;
}


function createBoard() {
    
    //setting new colours
    whites = whitesPicker.value;
    blacks = blacksPicker.value;



    // setting board looks
    board.style.backgroundColor = boardClrPicker.value;
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

    let dropWidth = (window.innerWidth * 0.9).toFixed(1);
    let dropHeight = (window.innerHeight * fixed).toFixed(1);
    
    let dd = (board.getBoundingClientRect());

    //making dropzone
    dropzone.style.left = dd.left.toString() + "px";
    dropzone.style.top = (dd.top + window.innerWidth (0.05)).toString() + "px";
    dropzone.style.width = dropWidth.toString() + 'px';
    dropzone.style.height = dropHeight.toString() + 'px';


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
    
    er = sqrSize / 2;
    update(sqrSize / 2);
    return sqrSize / 2;

}
 
//TODO:
// COLOR PAWN SYSTEMS,
//QOL: color change, snapping on grid, intersections, borders, buttons, 
// saving settings, saving game, multiplying pawns like manna, disposing of pawns

