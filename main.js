
const body = document.getElementsByTagName("body");
const board = document.getElementById("board");
const columnsSldr = document.getElementById("columns")
const opacitySldr = document.getElementById("opacity")
const rowsSldr = document.getElementById("rows")
const whitesPicker = document.getElementById("whites");
const blacksPicker = document.getElementById("blacks");
const boardClrPicker = document.getElementById("boardClr");
const boardRadiusSldr = document.getElementById("borderRadius");
const pawnSpawn = document.getElementsByClassName("spawnContainer");
const controlStrip = document.getElementById('controls');
const dropzone = document.getElementById("dropzone");
const snapCheckbox = document.getElementById("snap");
//suwak akszyn

// opacity = '100%';


snapCheckbox.addEventListener("change", function() {
    if (snapCheckbox.checked)
        shouldSnap = true;
    else
        shouldsnap = false;
});

columnsSldr.addEventListener("input", createBoard);
rowsSldr.addEventListener("input", createBoard);
opacitySldr.addEventListener("input", () => 
    opacity = `${opacitySldr.value}%`);

//color akszyn:
boardClrPicker.addEventListener("input", createBoard);
whitesPicker.addEventListener("input", createBoard);
blacksPicker.addEventListener("input", createBoard);

//spacing action:
boardRadiusSldr.addEventListener("input", createBoard);

boardClr = boardClrPicker.value;
whites = whitesPicker.value;
blacks = blacksPicker.value;

let mousePressed = false;
let dragged = null;
let pawnsArr = [];
let highest = 666;
let ID = 0;
let er = 0;
let centers = [];

createBoard();


//SpawnListeners
activateSpawner(pawnSpawn[0], blacksPicker);
activateSpawner(pawnSpawn[1], whitesPicker);

//drag&drop listeners
document.addEventListener('mousedown', onPickUp)
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);


function update(r) {

    checkPostitions();
    
    
    pawnSpawn[0].innerHTML = '';
    pawnSpawn[1].innerHTML = '';
    
    const blacksSpawn = new Pawn(blacks, "pawnSpawn", r);
    const whitesSpawn = new Pawn(whites, "pawnSpawn", r);

    pawnSpawn[0].appendChild(blacksSpawn.actualThing);
    pawnSpawn[1].appendChild(whitesSpawn.actualThing);
    
    blacksSpawn.currentCollor = whitesPicker.value;
    whitesSpawn.currentCollor = blacksPicker.value;


    centers.forEach((c, i ,a) => {
        
    })
}


function createBoard() {
    
    //setting new colours
    whites = whitesPicker.value;
    blacks = blacksPicker.value;
    
    // setting board looks
    board.style.backgroundColor = boardClrPicker.value;
    
    board.style.borderRadius = boardRadiusSldr.value + 'px';
    board.style.borderTop = `15px ridge ${boardClrPicker.value}`;
    board.style.borderLeft = `15px ridge ${boardClrPicker.value}`;
    board.style.borderBottom = `15px groove ${boardClrPicker.value}`;
    board.style.borderRight = `15px groove ${boardClrPicker.value}`;
    
    dropzone.style.borderTop = `15px groove ${boardClrPicker.value}`;
    dropzone.style.borderLeft = `15px groove ${boardClrPicker.value}`;
    dropzone.style.borderBottom = `15px ridge ${boardClrPicker.value}`;
    dropzone.style.borderRight = `15px ridge ${boardClrPicker.value}`;
    
    //clear all
    board.innerHTML = '';
    
    let c = columnsSldr.value;
    let r = rowsSldr.value;
    const fixed = 0.8;
    
    
    //fitting the board on the screen
    let sqrSize = 0;
    let prefWidth = (window.innerWidth * fixed).toFixed(1);
    let prefHeight = (window.innerHeight * fixed).toFixed(1);
    
    
    if (window.innerHeight > window.inner)
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

calculateCenters(c, r);

update(sqrSize / 2);
return sqrSize / 2;


}

//TODO:
//QOL: color change, snapping on grid, intersections, borders, buttons, 
// saving settings, saving game, multiplying pawns like manna, disposing of pawns

