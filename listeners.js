
//this is only for spawning the pawns by clicking on spawners
function activateSpawner(spawner, color) {
    // console.log(getAbsolutePosition(spawner.children[0]))
    //if you click the ".pawnSpawn" 
    spawner.addEventListener('mousedown', function (event) {
        //get the position so you can create the pawn

        spawner.children[0].style.transform = 'scale(0.8)';
        spawner.children[0].style.transition = 'transform 2s'
        // spawner.children[0].style.transform = 'scale(1)';
        // spawner.style.transform = 'scale(1)'
        console.log(spawner)


        const spawnPosition = getAbsolutePosition(spawner.children[0]);
        //you have indeed clicked
        mousePressed = true;
        //push a new thingie to the array of thingies
        pawnsArr.push(new Pawn(color.value, "pawn", er, spawnPosition.left, spawnPosition.top, idIt()));
        //this freshly pushed thingie is now dragged
        dragged = pawnsArr[pawnsArr.length - 1].actualThing;
        //and the thingie element is added to html
        document.body.appendChild(dragged);
        //update z-index to be on top of other pawns
        updateZI(dragged);

        //now i would very much like to be able to move it while i hold.
    });
}

function onPickUp(event) {
    if (event.target.classList == "svgDiv" && !dragged) {
        if (canPickup(getPawnCenter(event.target), { x: event.clientX, y: event.clientY })) {
            getPawnCenter(event.target)
            // console.log('pick up attempt')
            dragged = event.target;
            mousePressed = true;
            updateZI(dragged);
        }
    }
}

//I want this to take care of freashly spawned as well as picked again pawns;
function onMouseMove(event) {
    // console.log('runs')

    // so we make shure that something is in fact dragged and that mouse is still pressed;
    if (mousePressed && dragged) {
        //this is important, it prevents text higlighting
        event.preventDefault;
        //and update the its possition correctly offsetted by radius of a square
        dragged.style.left = `${event.clientX - er}px`;
        dragged.style.top = `${event.clientY - er}px`;
    }
}

function onMouseUp(event) {

    if (dragged) {
        MousePressed = false;

        if (shouldSnap) {

            let pos = findTheClosestSquare(event);
            console.log(pos)
            dragged.style.left = `${pos.x}px`;
            dragged.style.top = `${pos.y}px`;
        }

        dragged = null;
        checkPostitions();
    }
}