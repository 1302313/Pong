import "./styles/game.css";
import Game from "./partials/Game";

// create a game instance
const game = new Game("game", 1024, 512);

// create game properties

(function gameLoop() {
  game.render();
  // Stop Rendering
  requestAnimationFrame(gameLoop);
})();
