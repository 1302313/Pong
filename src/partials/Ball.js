import { SVG_NS } from "../settings"
import padSound from "../../public/sounds/pong-01.wav";
import goalSound from "../../public/sounds/pong-05.wav";
import hitSound from "../../public/sounds/pong-03.wav";
import hit1Sound from "../../public/sounds/pong-04.wav";


export default class Ball {
    constructor(radius, boardWidth, boardHeight, ballColor = "white") {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        //   this.ballXPosition = ballXPosition;
        //   this.ballYPosition = ballYPosition;
        this.ballColor = ballColor;
        this.padSound = new Audio(padSound);
        this.goalSound = new Audio(goalSound);
        //reset
        this.reset();
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = 0;

        // this.ax = 0.3;

        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        console.log(this.vy)
        this.vx = this.direction * (6 - Math.abs(this.vy));
        console.log(this.vx)

    }

    wallBounce() {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if (hitLeft || hitRight) {
            this.vx = -this.vx
        } else if (hitTop || hitBottom)
            this.vy *= -1;
    }

    padBounce(player1, player2) {
        if (this.vx > 0) {
            if (this.x + this.radius >= player2.x &&
                this.x + this.radius <= player2.x + player2.width &&
                (this.y >= player2.y && this.y <= player2.y + player2.height)
            ) {
                this.vx *= -1;
                this.padSound.play();
            }
        } else {
            if (this.x - this.radius <= player1.x + player1.width &&
                this.x - this.radius >= player1.x &&
                (this.y >= player1.y && this.y <= player1.y + player1.height)
            ) {
                this.vx *= -1;
                this.padSound.play();
            }
        }
    };
    goal(player) {
        player.score++;
        console.log("Player score: ", player.score);
        this.reset();
        this.goalSound.play();
    }

    render(svg, player1, player2) {

        this.x += this.vx
        // += this.ax;
        this.y += this.vy;

        // console.log(player1);
        this.wallBounce();
        this.padBounce(player1, player2);

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'fill', this.ballColor);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'r', this.radius);

        // Give birth to "SVG" element
        svg.appendChild(circle);

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;

        if (rightGoal) {
            this.goal(player1);
            this.direction = 1;
        } else if (leftGoal) {
            this.goal(player2);
            this.direction = -1;
        }
    }




    // ball.padBounce ()
    // ball.speed

}