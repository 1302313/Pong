import { SVG_NS, KEYS, PadOptions } from "../settings";

// Import Object Files to Game
import Board from "./Board";
import Pad from "./Pad";
import Ball from "./Ball";
import Score from "./Score";
// Megaball

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    const fillet = 20;

    // Board
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height, this.padColor, fillet);

    // Paddle
    this.player1 = new Pad(
      this.height,
      PadOptions.padWidth,
      PadOptions.padHeight,
      PadOptions.boardGap,
      (this.height - PadOptions.padHeight) / 2,
      PadOptions.padSpeed,
      "crimson",
      KEYS.a,
      KEYS.z
    );

    this.player2 = new Pad(
      this.height,
      PadOptions.padWidth,
      PadOptions.padHeight,
      this.width - (PadOptions.boardGap + PadOptions.padWidth),
      (this.height - PadOptions.padHeight) / 2,
      PadOptions.padSpeed,
      "green",
      KEYS.up,
      KEYS.down
    );

    // ScoreBoard
    this.score1 = new Score(this.width / 2 - 150, 50, 75);
    this.score2 = new Score(this.width / 2 + 110, 50, 75);

    // Pause using Spacebar
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
      }
    });
    // Ball
    this.ball1 = new Ball(10, this.width, this.height, "red");
    this.ball2 = new Ball(10, this.width, this.height, "blue");
  }

  // Give Birth to Parent
  render() {
    if (this.pause) {
      return;
    }

    this.gameElement.innerHTML = ""; // Clear HTML before appending. This is to fix a render bug.
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);

    // SVG in HTML
    this.gameElement.appendChild(svg);

    this.board.render(svg);

    this.player1.render(svg);
    this.player2.render(svg);

    this.ball1.render(svg, this.player1, this.player2);

    if (this.score1 === 5 || this.score2 === 5) {
      return this.ball2.render(svg, this.player1, this.player2);
    }
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
