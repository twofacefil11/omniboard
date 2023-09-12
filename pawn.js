class Pawn {
    constructor(color, type, r, xpos = 0, ypos = 0, id = null) {

        this.xpos = xpos;
        this.ypos = ypos;
        this.type = type;
        this.r = r;
        this.ID = id;
        this.NS = "http://www.w3.org/2000/svg";
        // this.currentCollor;
        this.color = deHex(color);
        this.gradient = this.calculateGradient();
        this.trueColor = this.calculateColor();
        this.points = [];
        this.actualThing = this.generateSVG(this.r)
        this.fell = false;
        // this.movePawn();
        // this.letGoListener();
    }

    generateSVG(r) {
        let ars = this.makePawn(r);

        const svgDiv = document.createElement("div");
        const svg = document.createElementNS(this.NS, "svg");
        const circle1 = document.createElementNS(this.NS, "circle");
        const circle2 = document.createElementNS(this.NS, "circle");
        const circle3 = document.createElementNS(this.NS, "circle");
        const polygon1 = document.createElementNS(this.NS, "polygon");
        const polygon2 = document.createElementNS(this.NS, "polygon");

        if (this.type === "pawn") {
            svgDiv.setAttribute("class", "svgDiv");
            svgDiv.setAttribute("position", "absolute");

            svgDiv.style.left = this.xpos.toString() + 'px';
            svgDiv.style.top = this.ypos.toString() + 'px';

        }

        else
            svgDiv.setAttribute("class", "pawnSpawn");

        svg.setAttributeNS(null, "width", (r * 2).toString());
        svg.setAttributeNS(null, "height", (r * 2).toString());
        svg.setAttributeNS(null, "viewBox", `${-r} ${-r} ${r * 2} ${r * 2}`);

        svg.setAttributeNS(null, 'opacity', `${opacitySldr.value}%`)

        circle1.setAttributeNS(null, "r", ars[0].toString());
        circle2.setAttributeNS(null, "r", ars[1].toString());
        circle3.setAttributeNS(null, "r", ars[4].toString());

        circle1.setAttributeNS(null, "fill", this.trueColor[0]);
        circle2.setAttributeNS(null, "fill", this.trueColor[1]);
        polygon1.setAttributeNS(null, "fill", this.trueColor[2]);
        polygon2.setAttributeNS(null, "fill", this.trueColor[3]);
        circle3.setAttributeNS(null, "fill", this.trueColor[4]);

        let p1 = '';
        let p2 = '';

        for (let i = 0; i < 6; i++)
            p1 += (ars[2][i].x).toString() + ", " + (ars[2][i].y).toString() + " ";
        for (let i = 0; i < 6; i++)
            p2 += (ars[3][i].x).toString() + ", " + (ars[3][i].y).toString() + " ";

        polygon1.setAttributeNS(null, "points", p1);
        polygon2.setAttributeNS(null, "points", p2);

        polygon2.setAttributeNS(null, "transform", "rotate(30)");

        svg.appendChild(circle1);
        svg.appendChild(circle2);
        svg.appendChild(polygon1);
        svg.appendChild(polygon2);
        svg.appendChild(circle3);

        svgDiv.style.height = (r * 2).toString();
        svgDiv.style.width = (r * 2).toString();
        
        svgDiv.appendChild(svg);
        return svgDiv;
    }


    makePawn(r) {
        const n = 6;
        this.points = [[], []];

        this.points.unshift(r * 0.8 * 0.8);
        this.points.unshift(r * 0.8);

        r *= 0.8 * 0.8;

        for (let x = 2; x < 4; x++) {
            for (let i = 0; i < n; i++) {

                let a = (2 * Math.PI * i) / n;

                this.points[x].push({
                    x: (r * Math.cos(a)),
                    y: (r * Math.sin(a))
                })
            }
            r = Math.sqrt(r * r - (r / 2) * (r / 2))
        }
        this.points.push(r);
        return this.points;
    }


    movePawn() {
        console.log('an attepmt')
        this.actualThing.addEventListener('mousedown', function(event) {
            console.log('klik kórwa')
            mousePressed = true;
            dragged = this.actualThing;
            event.preventDefault;
            document.addEventListener('mousemove', this.mouseMove);
        })
    }


    calculateGradient() {
        let isDark = this.isItDark();
        // let gradientMap = [30, 60, 80, 100, 165]
        let gradientMap;
        if (isDark > 0)
            gradientMap = [40, 70, 80, 90, 100];
        else
            gradientMap = [40, 50, 70, 90, 120];

        let res = gradientMap.map(e => [0, 0, 0]);

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                res[i][j] = this.color[j] + (gradientMap[i] * isDark);

                if (res[i][j] > 255)
                    res[i][j] = 255;
                else if (res[i][j] < 0)
                    res[i][j] = 0;
            }
        }
        return res;
    }


    calculateColor() {
        let res = [];
        let preres = '';
        for (let i = 0; i < 5; i++) {
            preres = "rgb("
            for (let j = 0; j < 3; j++) {
                preres += this.gradient[i][j].toString();
                if (j != 2)
                    preres += ", "
            }
            preres += ")"
            res.push(preres);
        }
        return res;
    }

    isItDark() {
        if (this.color.reduce((e, a) => e + a, 0) / 3 >  70)
            return -1;
        else 
            return 1;
    }


    isOnBoard() {
        const boardRect = board.getBoundingClientRect();

        const pawnRect = this.actualThing.getBoundingClientRect();

        const boardCenterX = boardRect.left + boardRect.width / 2;
        const boardCenterY = boardRect.top + boardRect.height / 2;
      
        const pawnCenterX = pawnRect.left + pawnRect.width / 2;
        const pawnCenterY = pawnRect.top + pawnRect.height / 2;
      
        return (
          pawnCenterX >= boardRect.left &&
          pawnCenterX <= boardRect.right &&
          pawnCenterY >= boardRect.top &&
          pawnCenterY <= boardRect.bottom
        );
    }

    isInDropzone() {
        const boardRect = dropzone.getBoundingClientRect();

        const pawnRect = this.actualThing.getBoundingClientRect();

        const boardCenterX = boardRect.left + boardRect.width / 2;
        const boardCenterY = boardRect.top + boardRect.height / 2;
      
        const pawnCenterX = pawnRect.left + pawnRect.width / 2;
        const pawnCenterY = pawnRect.top + pawnRect.height / 2;
      
        return (
          pawnCenterX >= boardRect.left &&
          pawnCenterX <= boardRect.right &&
          pawnCenterY >= boardRect.top &&
          pawnCenterY <= boardRect.bottom
        );
    }


    makeItFall() {
        this.actualThing.style.transform = 'scale(0.4)';
        this.actualThing.style.opacity = '30%'
        this.actualThing.style.zIndex = "-100";
    }


    makeItBlink() {
        console.log("blink")
        this.actualThing.style.transform = 'scale(0.1)';
        this.actualThing.style.opacity = '0';
        this.actualThing.style.zIndex = "-100";
        // this.actualThing.style.left = '0px';
        // this.actualThing.style.top = '0px';
    }

    mouseMove() {
        console.log('mousemove')
        if (mousePressed && dragged) {
          this.actualThing.style.left = `${event.clientX - er}px`;
          this.actualThing.style.top = `${event.clientY - er}px`;
        }
      }

      
    // letGoListener() {
    //     document.addEventListener('mouseup', function() {
    //         if (dragged) {
    //             mousePressed = false;
    //             console.log("puściłęś się");
                
    //             document.removeEventListener('mousemove', onMouseMove);
                
    //             if (!(dragged.isOnBoard())) 
    //                   dragged.makeItFall();
        
    //             dragged = null;
    //         }
    //     });
    // }




}