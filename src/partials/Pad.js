// pad.up()
// pad.down()
import { SVG_NS, KEYS } from "../settings";

export default class Paddle {
    constructor(boardHeight, width, height, x, y, padcolor, upKey, downKey) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;
        this.padcolor = padcolor;
        this.upKey = upKey;
        this.downKey = downKey;

        // What key is being pressed?
        this.keyState = {}
        document.addEventListener("keydown", event => {
            this.keyState[event.key] = true;
        });

        document.addEventListener("keyup", event => {
            this.keyState[event.key] = false;
        });

        // Move Pad Up and Down
        // document.addEventListener("keydown", event => {
        //     switch (event.key) {
        //         case up:
        //             this.up()
        //             console.log(this.y);
        //             break;
        //         case down:
        //             this.down()
        //             console.log(this.y);
        //             break;
        //     }
        // });
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

        if (this.keyState[KEYS.a] && this.upKey === KEYS.a) {
            this.up();
        };

        if (this.keyState[KEYS.z] && this.downKey === KEYS.z) {
            this.down();
        };

        if (this.keyState[KEYS.up] && this.upKey === KEYS.up) {
            this.up();
        };

        if (this.keyState[KEYS.down] && this.downKey === KEYS.down) {
            this.down();
        };


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