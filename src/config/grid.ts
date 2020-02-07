import { GameConfig } from "config/game";

export class grid {
  public scene: Phaser.Scene;
  public cols: number = 5;
  public rows: number = 5;
  public width: integer | string = 0;
  public height: integer | string = 0;

  constructor(
    scene: Phaser.Scene,
    cols?: number,
    rows?: number,
    width?: number,
    height?: number
  ) {
    this.scene = scene;
    if (cols) {
      this.cols = cols;
    }
    if (rows) {
      this.rows = rows;
    }
    if (!width) {
      this.width = GameConfig.width;
    }
    if (!height) {
      this.height = GameConfig.height;
    }
  }
}
