
const rangeInputs = document.querySelectorAll('input[type="range"]');
const pawnSpawn = document.getElementsByClassName("spawnContainer");
const boardRadiusSldr = document.getElementById("borderRadius");
const boardClrPicker = document.getElementById("boardClr");
const controlStrip = document.getElementById('controls');
const columnsSldr = document.getElementById("columns");
const opacitySldr = document.getElementById("opacity");
const whitesPicker = document.getElementById("whites");
const blacksPicker = document.getElementById("blacks");
const dropzone = document.getElementById("dropzone");
const snapCheckbox = document.getElementById("snap");
const body = document.getElementsByTagName("body");
const rowsSldr = document.getElementById("rows");
const board = document.getElementById("board");


let mousePressed = false;
let shouldSnap = false;
let dragged = null;
let pawnsArr = [];
let highest = 666;
let ID = 0;
let er = 0;
let centers = [];
let squaresPositions = [];

//updating the board on resize so it doesnt brake
window.addEventListener("resize", createBoard);
opacitySldr.addEventListener("input", () => opacity = `${opacitySldr.value}%`);
snapCheckbox.addEventListener("change", () => shouldSnap = !shouldSnap);
boardClrPicker.addEventListener("input", createBoard);
whitesPicker.addEventListener("input", createBoard);
blacksPicker.addEventListener("input", createBoard);
columnsSldr.addEventListener("input", createBoard);
rowsSldr.addEventListener("input", createBoard);

document.addEventListener("resize", () => {
    console.log(window.innerWidth, window.inneroHeight)
});

//spacing action:
boardRadiusSldr.addEventListener("input", createBoard);

boardClr = boardClrPicker.value;
whites = whitesPicker.value;
blacks = blacksPicker.value;

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
    
    rangeInputs.forEach(e => e.style.accentColor = boardClrPicker.value)

    updateDropzone();

}


function createBoard() {

    //setting new colours
    whites = whitesPicker.value;
    blacks = blacksPicker.value;

    //calculating the correct font biggnes
    document.body.style.fontSize = controlStrip.offsetHeight / 10 + "px";

    // setting  looks
    board.style.backgroundColor = boardClrPicker.value;

    board.style.borderRadius = boardRadiusSldr.value + 'px';
    board.style.borderBottom = `2vh groove ${boardClrPicker.value}`;
    board.style.borderRight = `2vh groove ${boardClrPicker.value}`;
    board.style.borderLeft = `2vh ridge ${boardClrPicker.value}`;
    board.style.borderTop = `2vh ridge ${boardClrPicker.value}`;

    //not shure if i like it
    // dropzone.style.borderBottom = `15px ridge ${boardClrPicker.value}`;
    // dropzone.style.borderLeft = `15px groove ${boardClrPicker.value}`;
    // dropzone.style.borderRight = `15px ridge ${boardClrPicker.value}`;
    // dropzone.style.borderTop = `15px groove ${boardClrPicker.value}`;

    //clear all
    board.innerHTML = '';

    let c = columnsSldr.value;
    let r = rowsSldr.value;
    const fixed = 0.78;


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

    board.style.width = (sqrSize * c) + 0.0001 + 'px';
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
            //board radius to corners //było 23 w px
            let br = (parseInt(boardRadiusSldr.value) - 23).toString();
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

    // calculateCenters(c, r);
    fillSquarePositions(c, r);

    update(sqrSize / 2);
    return sqrSize / 2;


}

//TODO:
//QOL: color change, snapping on grid, intersections, borders, buttons,
// saving settings, saving game, multiplying pawns like manna, disposing of pawns

