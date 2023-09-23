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
  // ALT: (for custom elements that do not inherit offsets)
  // let rect = element.getBoundingClientRect();
  // left = rect.left;
  // top = rect.top;
  return { left, top };
}


//to know if you click within the radius of a pawn. to avoid picking by air
function canPickup(p1, p2) {
  return er >= Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

//DUH
function getPawnCenter(e) {
  let errrr = parseFloat(e.getAttribute('name'))
  let ugh = getAbsolutePosition(e);
  console.log({x: ugh.left + errrr, y: ugh.top + errrr})
  return {x: ugh.left + errrr, y: ugh.top + errrr};
}


function idIt() {
  ID++;
  return ID;
}

function checkPostitions() {    

  if (pawnsArr.length > 0) {
      pawnsArr.forEach(e => {
          //out of board, and in drop zone
          if (!e.isOnBoard()) {
              e.fell = true;
              if (e.isInDropzone() ) {
                  e.makeItBlink();
              }
              else {
                  e.makeItFall();
              }
          }
          // else if (e.isOnBoard() && e.fell){
              //     e.makeItBlink();
              // }
          })
      }
      
      if (pawnsArr.length > 0) {
          pawnsArr.forEach(e => {
              if (e.isOnBoard() && e.fell) {
                  e.makeItBlink();
              }
          })
      }
  }