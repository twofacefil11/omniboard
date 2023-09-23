function deHex(hex) {
  // Remove the '#' if it's present
  // console.log(hex)
  hex = hex.replace(/^#/, '');
  // console.log(hex, 'hex')

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
  // return { left, top };
}

function idIt() {
  ID++;
  return ID;
}