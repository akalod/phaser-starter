import { grid } from "config/grid";
import { AlignGrid } from "../library/AlignGrid";
import { GameConfig } from "config/game";

export class Main extends Phaser.Scene {
  constructor() {
    super("main");
  }

  public logo: Phaser.GameObjects.Image;
  private grid: AlignGrid;

  preload(): void {
    this.logo = this.add.image(this.game.canvas.width / 2, 0, "logo");
    this.logo.setOrigin(0.5, 0.5);
  }

  resize(gameSize: { width: number; height: number }): void {
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);
    this.grid.updateGrid(width, height);
    //this.logo.x = width - 200;
  }

  create(): void {
    this.add.text(0, 10, "main Screen");
    this.grid = new AlignGrid(new grid(this));
    this.grid.showNumbers();
    this.logo.displayWidth = Number(GameConfig.width) / 5;
    this.logo.scaleY = this.logo.scaleX;
    this.grid.placeAt(2, 2, this.logo, true);
    this.scale.on("resize", this.resize, this);
  }
}
