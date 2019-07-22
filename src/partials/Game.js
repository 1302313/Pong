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
    this.Player();

    // Ball types
    this.gameBall();

    // ScoreBoard
    this.score1 = new Score(this.width / 2 - 150, 50, 75);
    this.score2 = new Score(this.width / 2 + 110, 50, 75);

    // Pause using Spacebar
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
      }
      switch (event.key) {
        case KEYS.q:
          this.q = true;
      }
      console.log(this.q);
      switch (event.key) {
        case KEYS.p:
          this.p = this.p;
      }
    });
  } // End of Constructor

  gameBall() {
    this.ball1 = new Ball(10, this.width, this.height, "red");
    this.ball2 = new Ball(12, this.width, this.height, "blue");
  }

  Player() {
    this.player1 = new Pad(
      this.height,
      PadOptions.padWidth,
      PadOptions.padHeight,
      PadOptions.boardGap,
      (this.height - PadOptions.padHeight) / 2,
      PadOptions.padSpeed,
      "crimson",
      KEYS.a,
      KEYS.z,
      KEYS.q,
      KEYS.p
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
      KEYS.down,
      KEYS.q,
      KEYS.p
    );
  }

  // Give Birth to Parent
  render() {
    // Game Setup Buttons
    if (this.pause) {
      return;
    }

    // Creating SVG Element
    this.gameElement.innerHTML = ""; // Clear HTML before appending. This is to fix a render bug.
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);

    // Inside SVG in HTML
    this.gameElement.appendChild(svg);

    this.board.render(svg);

    this.player1.render(svg);
    this.player2.render(svg);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);

    this.ball1.render(svg, this.player1, this.player2);

    if (this.q || this.p) {
      return this.ball2.render(svg, this.Player);
    }
  }
}
