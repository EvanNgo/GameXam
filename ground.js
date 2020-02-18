import * as Const from "./const.js";
import GoldTower from './tower/gold_tower.js';

export default class Ground {
  constructor(board, x, y, type) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.size = 0;
    this.type = type;
    this.isHover = false;
    this.isCanHover = this.type === Const.GOUND_TYPE.EMPTY || this.type === Const.GOUND_TYPE.TOWER;
    this.position = null;
    this.init();
  }
  init() {
    if (this.type === Const.GOUND_TYPE.EMPTY || this.type === Const.GOUND_TYPE.TOWER) {
      this.position = {
        x: this.x * Const.GOUND_SIZE + 1,
        y: this.y * Const.GOUND_SIZE + 1
      }
      this.size = Const.GOUND_SIZE - 2;
    }
  }
  update() {

  }
  onMouseClick(position) {
    if (this.isCanHover) {
      if (position.x >= this.position.x &&
          position.x <= this.position.x + this.size &&
          position.y >= this.position.y &&
          position.y <= this.position.y + this.size) {
        if (this.type === Const.GOUND_TYPE.EMPTY) {
          this.board.toggleShop({x:this.x,y:this.y});
        } else if (this.type === Const.GOUND_TYPE.TOWER) {
          // TODO: Open update UI
        }
      }
    }
  }

  onMouseMove(position) {
    if (this.isCanHover) {
      if (position.x >= this.position.x &&
          position.x <= this.position.x + this.size &&
          position.y >= this.position.y &&
          position.y <= this.position.y + this.size) {
            this.isHover = true;
            return;
      }
    }
    this.isHover = false;
  }

  draw() {
    this.board.game.ctx.lineWidth = 1;
    if (this.type === Const.GOUND_TYPE.EMPTY || this.type === Const.GOUND_TYPE.TOWER) {
      this.board.game.ctx.fillStyle = this.isHover ? "rgb(200,200,200)" : "rgb(222,222,222)";
      this.board.game.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
  }
}
