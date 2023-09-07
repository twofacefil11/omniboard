function deHex(hex) {
    // Remove the '#' if it's present
    hex = hex.replace(/^#/, '');
  
    // Parse the hexadecimal values into separate RGB components
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
  
    return [r, g, b];
  }

  
  function onMouseMove() {
    if (mousePressed && dragged) {
      dragged.actualThing.style.left = `${event.clientX - er}px`;
      dragged.actualThing.style.top = `${event.clientY - er}px`;
    }
  }

  function getAbsolutePosition(element) {
    let left = 0;
    let top = 0;

    while (element) {
        left += element.offsetLeft;
        top += element.offsetTop;
        element = element.offsetParent;
    }
    return { left, top };
}