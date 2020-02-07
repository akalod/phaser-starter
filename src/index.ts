import "phaser";
import { GameConfig } from "./config/game";
import { Main } from "./scenes/Main";
import { Preloader } from "./scenes/Preloader";
import "main.css";

// sahnelerin aktarımı
GameConfig.scene = [Preloader, Main];

// oyunun oluşturulması
const game = new Phaser.Game(GameConfig);

// resize emitter'i
window.addEventListener(
  "resize",
  function(event) {
    game.scale.resize(window.innerWidth, window.innerHeight);
  },
  false
);
