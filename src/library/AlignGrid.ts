import { grid } from "config/grid";

export class GridELement {
  column: number;
  row: number;
  object: any;
  fitWith: boolean = false;

  constructor(object: any, x: number, y: number, fitWith: boolean = false) {
    this.object = object;
    this.row = x;
    this.column = y;
    this.fitWith = fitWith;
  }
}

export class AlignGrid {
  private graphics: Phaser.GameObjects.Graphics;
  private scene: Phaser.Scene;
  private h: number;
  private w: number;
  private rows: number;
  private cols: number;
  private cw: number;
  private ch: number;
  private showingGrid: boolean = false;

  public gridedElement: GridELement[] = [];
  public numbers: Phaser.GameObjects.Text[] = [];

  private calcs() {
    //cw cell width is the scene width divided by the number of columns
    this.cw = this.w / this.cols;
    //ch cell height is the scene height divided the number of rows
    this.ch = this.h / this.rows;
  }

  constructor(Config: grid) {
    if (!Config.scene) {
      console.warn("missing scene!!");
      return;
    }

    this.h = Number(Config.height);
    this.w = Number(Config.width);
    this.rows = Config.rows;
    this.cols = Config.cols;

    this.calcs();
    this.scene = Config.scene;
  }

  private show(a: number = 1): void {
    this.showingGrid = true;
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(4, 0xff0000, a);
    //
    //
    //this.graphics.beginPath();
    for (var i = 0; i < this.w; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.h);
    }
    for (var i = 0; i < this.h; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.w, i);
    }
    this.graphics.strokePath();
  }

  setPosition(xx: number, yy: number, obj: any) {
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeAt(x: number, y: number, obj: any, fitWith: boolean = false): void {
    this.setPosition(x, y, obj);
    this.gridedElement.push(new GridELement(obj, x, y, fitWith));
  }

  placeAtIndex(index: number, obj: any, fitWith: boolean = false): void {
    var y = Math.floor(index / this.cols);
    var x = index - y * this.cols;
    this.placeAt(x, y, obj, fitWith);
  }

  public updateGrid(width: number, height: number): void {
    this.w = width;
    this.h = height;

    this.calcs();

    this.gridedElement.forEach(e => {
      this.setPosition(e.column, e.row, e.object);
      if (e.fitWith) {
        e.object.displayWidth = width / this.cols;
        e.object.scaleY = e.object.scaleX;
      }
    });

    if (this.showingGrid) {
      this.graphics.destroy();
      this.numbers.forEach(n => {
        n.destroy();
      });
      this.showNumbers();
    }
  }

  public showNumbers(a: number = 1): void {
    this.show(a);
    var n = 0;
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var numText = this.scene.add.text(0, 0, n.toString(), {
          color: "red"
        });
        numText.setOrigin(0.5, 0.5);
        this.numbers.push(numText);
        this.placeAt(j, i, numText);
        n++;
      }
    }
  }
}
