import { SVG_NS } from "../settings"
export default class Ball {
    constructor(radius, boardWidth, boardHeight, ballColor = "white") {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        //   this.ballXPosition = ballXPosition;
        //   this.ballYPosition = ballYPosition;
        this.ballColor = ballColor;
    }

    render(svg) {
        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'fill', this.ballColor);
        circle.setAttributeNS(null, 'cx', this.boardWidth / 2);
        circle.setAttributeNS(null, 'cy', this.boardHeight / 2);
        circle.setAttributeNS(null, 'r', this.radius);

        // Give birth to "SVG" element
        svg.appendChild(circle);
    }



    // ball.wallBounce()
    // ball.reset ()
    // ball.padBounce ()
    // ball.speed

}