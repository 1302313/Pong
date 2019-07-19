// pad.up()
// pad.down()
import { SVG_NS } from "../settings";

export default class Paddle {
    constructor(boardHeight, width, height, x, y, padcolor, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;
        this.padcolor = padcolor;



        document.addEventListener("keydown", event => {

            switch (event.key) {
                case up:
                    this.up()
                    console.log(this.y);
                    break;
                case down:
                    this.down()
                    console.log(this.y);
                    break;
            }

        });
    }

    up() {
        // console.log('move up');
        // this.y = this.y - this.speed;
        this.y = Math.max(0, this.y - this.speed);
    }

    down() {
        // this.y = this.y + this.speed;
        this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
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