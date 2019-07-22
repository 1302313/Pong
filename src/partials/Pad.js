import { SVG_NS, KEYS } from "../settings";

import Ball from "./Ball";

export default class Pad {
  constructor(
    boardHeight,
    width,
    height,
    x,
    y,
    speed,
    padColor,
    upKey,
    downKey,
    qKey,
    pKey
  ) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = 0;
    this.padColor = padColor;
    this.upKey = upKey;
    this.downKey = downKey;
    this.qKey = qKey;
    this.pKey = pKey;

    // What key is being pressed?
    this.keyState = {};
    document.addEventListener("keydown", event => {
      this.keyState[event.key] = true;
    });

    document.addEventListener("keyup", event => {
      this.keyState[event.key] = false;
    });
  } // constructor ends

  up() {
    // console.log('move up');
    // this.y = this.y - this.speed;
    this.y = Math.max(0, this.y - this.speed);
  }

  down() {
    // this.y = this.y + this.speed;
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }

  q() {
    // console.log('move up');
    // this.y = this.y - this.speed;
    return new Ball(12, this.width, this.height, "blue");
  }

  p() {
    // this.y = this.y + this.speed;
    return new Ball(12, this.width, this.height, "indigo");
  }

  // What to render?
  render(svg) {
    //Keystate
    if (this.keyState[KEYS.a] && this.upKey === KEYS.a) {
      this.up();
    }

    if (this.keyState[KEYS.z] && this.downKey === KEYS.z) {
      this.down();
    }

    if (this.keyState[KEYS.up] && this.upKey === KEYS.up) {
      this.up();
    }

    if (this.keyState[KEYS.down] && this.downKey === KEYS.down) {
      this.down();
    }

    if (this.keyState[KEYS.q] && this.qKey === KEYS.q) {
      this.q();
    }
    if (this.keyState[KEYS.p] && this.pKey === KEYS.p) {
      this.p();
    }

    // Paddle Shape and Size
    let rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "fill", this.padColor);
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "y", this.y);

    // Give birth to "SVG" element
    svg.appendChild(rect);
  }
}
