// pad.up()
// pad.down()
import { SVG_NS } from "../settings"

export default class Paddle {
    constructor(boardHeight, width, height, x, y, padcolor = '#353535') {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;
        this.padcolor = padcolor;



        document.addEventListener("keydown", event => {
            document.addEventListener("keydown", event => {
                switch (event.key) {
                    case up:
                        console.log("up");
                        break;
                    case down:
                        console.log("down");
                        break;
                }
            });
        });


    }
    // What to render?
    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', this.padcolor);
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);

        // Give birth to "SVG" element
        svg.appendChild(rect);
    }

}