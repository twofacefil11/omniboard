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
  // let rect = element.getBoundingClientRect();
  // left = rect.left;
  // top = rect.top;
  return { left, top };
}


function canPickup(p1, p2, R) {
  const distance = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  return distance <= R;
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