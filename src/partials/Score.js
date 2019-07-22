import { SVG_NS } from "../settings";

export default class Score {
  constructor(
    x,
    y,
    scoreTextSize,
    fontFamily = '"Silkscreen Web"',
    scoreTextColor = "white"
  ) {
    this.x = x;
    this.y = y;
    this.scoreTextSize = scoreTextSize;
    this.fontFamily = fontFamily;
    this.scoreTextColor = scoreTextColor;
  }
  render(svg, score) {
    let text = document.createElementNS(SVG_NS, "text");
    text.setAttributeNS(null, "x", this.x);
    text.setAttributeNS(null, "y", this.y);
    text.setAttributeNS(null, "font-size", this.scoreTextSize);
    text.setAttributeNS(null, "font-family", this.fontFamily);
    text.setAttributeNS(null, "fill", this.scoreTextColor);
    text.textContent = score;

    svg.appendChild(text);
  }
}
