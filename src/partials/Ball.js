import { SVG_NS } from "../settings";
import padSound from "../../public/sounds/pong-01.wav";
import goalSound from "../../public/sounds/pong-05.wav";
// import hitSound from "../../public/sounds/pong-03.wav";
// import hit1Sound from "../../public/sounds/pong-04.wav";

export default class Ball {
  constructor(radius, boardWidth, boardHeight, ballColor) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = [-1];
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
    this.vx = 0;

    while (this.vx === 0 && this.vy === 0) {
      this.vx =
        Math.floor(Math.random() * 10 - 2) *
        this.direction[
          (Math.floor(Math.random()), Math.floor(Math.random()) * -1)
        ];
      this.vy =
        Math.floor(Math.random() * 2 - 2) *
        this.direction[
          (Math.floor(Math.random()), Math.floor(Math.random()) * 1)
        ];
    }
  }
  // Ball Bounce Functions
  wallBounce() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    // Ball pass through goal
    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) this.vy *= -1;
  }

  padBounce(player1, player2) {
    if (this.vx > 0) {
      if (
        this.x + this.radius >= player2.x &&
        this.x + this.radius <= player2.x + player2.width &&
        (this.y >= player2.y && this.y <= player2.y + player2.height)
      ) {
        this.vx *= -1;
        this.padSound.play();
      }
    } else {
      if (
        this.x - this.radius <= player1.x + player1.width &&
        this.x - this.radius >= player1.x &&
        (this.y >= player1.y && this.y <= player1.y + player1.height)
      ) {
        this.vx *= -1;
        this.padSound.play();
      }
    }
  }

  goal(player) {
    player.score++;
    console.log("Player score: ", player.score);
    this.reset();
    this.goalSound.currentTime = 0;
    this.goalSound.play();
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallBounce();
    this.padBounce(player1, player2);

    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "fill", this.ballColor);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    circle.setAttributeNS(null, "r", this.radius);

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
}
