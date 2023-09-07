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

function idIt() {
  return ID++;
}

function activateSpawner(spawner) {
  spawner.spawner.addEventListener('mousedown', function(event) {
    
    const spawnPosition = getAbsolutePosition(spawner.spawner.children[0]);
    mousePressed = true;
    
    pawnsArr.push(new Pawn(spawner.color, "pawn", er, spawnPosition.left, spawnPosition.top, idIt()));
    dragged = pawnsArr[pawnsArr.length - 1];
    document.body.appendChild(dragged.actualThing);
    
    event.preventDefault;

    document.addEventListener('mousemove', onMouseMove);
  });
}
