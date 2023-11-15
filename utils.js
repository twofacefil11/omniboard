function deHex(hex) {
  // Remove the '#' if it's present
  hex = hex.replace(/^#/, '');
  // Parse the hexadecimal values into separate RGB components
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

function getAbsolutePosition(element) {
  let left = 0;
  let top = 0;

  while (element) {
    left += element.offsetLeft;
    top += element.offsetTop;
    element = element.offsetParent;
  }
  // ALT: (for custom elements that do not inherit offsets it seems)
  // let rect = element.getBoundingClientRect();
  // left = rect.left;
  // top = rect.top;
  return { left, top };
}


//to know if you click within the radius of a pawn. to avoid picking by air
function canPickup(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2) <= er * 0.8;
}

//DUH
function getPawnCenter(e) {
  let errrr = parseFloat(e.getAttribute('name'))
  let ugh = getAbsolutePosition(e);
  return { x: ugh.left + errrr, y: ugh.top + errrr };
}


function idIt() {
  ID++;
  return ID;
}


function checkPostitions() {

  if (pawnsArr.length > 0) {
    pawnsArr.forEach(e => {
      if (!e.isOnBoard()) {
        e.fell = true;
        if (e.isInDropzone()) e.makeItBlink();
        else e.makeItFall();
      }
    })
  }
}
  // i dont remember why i thought the secend loop is nececary, maybe ill remember
  // if (pawnsArr.length > 0)
  //   pawnsArr.forEach(e => { if (e.isOnBoard() && e.fell) e.makeItBlink(); })


function updateZI(element) {
  highest++;
  element.style.zIndex = `${highest}`;
}


function calculateCenters(c, r) {
  // console.log(board.children[0].getBoundingClientRect())

  const firstRect = board.children[0].getBoundingClientRect();
  let beforeLeft = firstRect.left - firstRect.width / 2;
  let beforeTop = firstRect.top - firstRect.height / 2;

  centers = [];

  for (let x = 0; x < c * r; x++) {
    beforeLeft += firstRect.width;
    beforeTop += firstRect.height;
    centers.push({x: beforeLeft, y: beforeTop});
  }
}


function fillSquarePositions(c, r) {
  //no point in any of that if the board is not a board
  if (c == 0 || r == 0)
    return;

  const firstRect = board.children[0].getBoundingClientRect();
  let l = firstRect.left;
  let t = firstRect.top;
  let bok = firstRect.width;

  squaresPositions = {x: [], y: []};

  //+1 to columns and rows for the last square to apply
  for (let x = 0; x < c + 1; x++) {
    squaresPositions.x.push(l);
    l += bok;
  }

  for (let x = 0; x < r + 1; x++) {
    squaresPositions.y.push(t);
    t += bok;
  }

}


function findTheClosestSquare(event) {
  const columns = squaresPositions.x.length;
  const rows = squaresPositions.y.length;
  const pl = event.clientX;
  const pt = event.clientY;
  let xi;
  
  for (let i = 0; i < columns; i++)
    if (squaresPositions.x[i] > pl) {
      xi = i - 1;
      break;
    }
  let yi;
  
  for (let i = 0; i < rows; i++)
    if (squaresPositions.y[i] > pt) {
      yi = i - 1;
      break;
    } 
  
  // console.log(xi, yi)  
  return {x: squaresPositions.x[xi], y: squaresPositions.y[yi]};
}


function updateDropzone() {
  dropzone.style.left = "50%";
  dropzone.style.transform = "translateX(-50%)";
  dropzone.style.top = "16%";
  dropzone.style.height = "81vh";
  dropzone.style.width = "85vw";
}


function cursorInDropzone() {
  const divRect = board.getBoundingClientRect();
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  if (
      cursorX >= divRect.left &&
      cursorX <= divRect.right &&
      cursorY >= divRect.top &&
      cursorY <= divRect.bottom
  )
    return true;
  else
    return false;
}

function fill() {
  let sldr = parseInt(fillSldr.value);
  console.log(typeof sldr)
}