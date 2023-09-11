function deHex(hex) {
    // Remove the '#' if it's present
    console.log(hex)
    hex = hex.replace(/^#/, '');
    console.log(hex, 'hex')
  
    // Parse the hexadecimal values into separate RGB components
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
  
    return [r, g, b];
  }

  
  function onMouseMove() {
    console.log('mousemove')
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

function idIt() {
    ID++;
  return ID;
}

function activateSpawner(spawner, color) {

  spawner.addEventListener('mousedown', function(event) {
    
    const spawnPosition = getAbsolutePosition(spawner.children[0]);
    mousePressed = true;
    pawnsArr.push(new Pawn(color.value, "pawn", er, spawnPosition.left, spawnPosition.top, idIt()));
    dragged = pawnsArr[pawnsArr.length - 1].actualThing;
    document.body.appendChild(actualThing);
    
    event.preventDefault;

    document.addEventListener('mousemove', onMouseMove);
  });
}

// function fetchColor(color) {}