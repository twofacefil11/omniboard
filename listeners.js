
function activateSpawner(spawner, color) {

    spawner.addEventListener('mousedown', function(event) {
      
      const spawnPosition = getAbsolutePosition(spawner.children[0]);
      mousePressed = true;
      pawnsArr.push(new Pawn(color.value, "pawn", er, spawnPosition.left, spawnPosition.top, idIt()));
      dragged = pawnsArr[pawnsArr.length - 1];
      document.body.appendChild(dragged.actualThing);
    //   dragged.movePawn();
      
      document.addEventListener('mousemove', onMouseMove(dragged));
    });
  }
  
  function onMouseMove(event) {
    // event.preventDefault;

    console.log('mousemove');
    if (mousePressed && dragged) {
        console.log(event.target)
      if (event.target.classList.contains('pawnSpawn')) {
        console.log(event.clientX - er, ", ", event.clientY - er)
        dragged.actualThing.style.left = `${event.clientX - er}px`;
        dragged.actualThing.style.top = `${event.clientY - er}px`;
      }
        // dragged.actualThing.style.left = `${event.clientX - er}px`;
        // dragged.actualThing.style.top = `${event.clientY - er}px`;
    }
  

//   function mouseMove(event) {
//     let target = event.target;
        
//     console.log('mousemove classs function')
//     if (mousePressed) {
//         target.style.left = `${event.clientX - er}px`;
//         target.style.top = `${event.clientY - er}px`;
//     }
}