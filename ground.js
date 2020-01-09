import * as Const from "./const.js";
import TowerAK from './tower/tower_ak.js';

const _ = 0;  // empty ground
const X = 1;  // street
const W = 2;  // enemy food
const S = 8;  // start point
const E = 9;  // End point
const T = 10; // have tower

export default class Ground {
  constructor(board, x, y, type) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.size = 0;
    this.type = type;
    this.isHover = false;
    this.isCanHover = this.type != E && this.type != S && this.type != X && this.type != W;
    this.position = null;
    this.init();
  }
  init() {
    if (this.type === S || this.type === E) {
      this.position = {
        x: this.x * Const.GOUND_SIZE + Const.GOUND_SIZE/2,
        y: this.y * Const.GOUND_SIZE + Const.GOUND_SIZE/2
      }
      this.size = Const.GOUND_SIZE/2.5;
    } else if (this.type === _ || this.type === T) {
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
            if (this.type === 0) {
              this.board.addTower(new TowerAK(this.board, {x: this.x, y: this.y}));
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
    if (this.type === 8) {
      this.board.game.ctx.beginPath();
      this.board.game.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
      this.board.game.ctx.strokeStyle = "rgb(255,0,0)";
      this.board.game.ctx.stroke();
      this.board.game.ctx.beginPath();
      this.board.game.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
      this.board.game.ctx.fillStyle = "rgba(255,0,0,0.3)";
      this.board.game.ctx.fill();
    } else if (this.type === 9) {
      this.board.game.ctx.beginPath();
      this.board.game.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
      this.board.game.ctx.strokeStyle = "rgb(0,0,255)";
      this.board.game.ctx.stroke();
      this.board.game.ctx.beginPath();
      this.board.game.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
      this.board.game.ctx.fillStyle = "rgba(0,0,255,0.3)";
      this.board.game.ctx.fill();
    } else if (this.type === _ || this.type === T) {
      this.board.game.ctx.fillStyle = this.isHover ? "rgb(200,200,200)" : "rgb(222,222,222)";
      this.board.game.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
  }
}
