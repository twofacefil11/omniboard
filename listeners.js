
//this is only for spawning the pawns by clicking on spawners
function activateSpawner(spawner, color) {
    console.log(spawner.children[0].offsetleft)
    //if you click the ".pawnSpawn" 
    spawner.addEventListener('mousedown', function(event) {
        //get the position so you can create the pawn
        const spawnPosition = getAbsolutePosition(spawner.children[0]);
        //you have indeed clicked
        mousePressed = true;
        //push a new thingie to the array of thingies
        pawnsArr.push(new Pawn(color.value, "pawn", er, spawnPosition.left, spawnPosition.top, idIt()));
        //this freshly pushed thingie is now dragged
        dragged = pawnsArr[pawnsArr.length - 1].actualThing;
        //and the thingie element is added to html
        document.body.appendChild(dragged);

        //now i would very much like to be able to move it while i hold.
    });
}

function onPickUp(event) {
    if (event.target.classList == "svgDiv") {
        console.log('pick up attempt')
        dragged = event.target;
        mousePressed = true;
    }
}

//I want this to take care of freashly spawned as well as picked again pawns;
function onMouseMove(event) {
    //this is important, it prevents text higlighting
    console.log('runs')
    
    // so we make shure that something is in fact dragged and that mouse is still pressed;
    if (mousePressed && dragged) {
        event.preventDefault;

        //and update the its possition correctly offsetted by radius of a square
        dragged.style.left = `${event.clientX - er}px`;
        dragged.style.top = `${event.clientY - er}px`;
    }
}

function onMouseUp() {
    
    if (dragged) {
        console.log("puściłeś się");
        MousePressed = false;
        dragged = null;
        update(er);
    }
}