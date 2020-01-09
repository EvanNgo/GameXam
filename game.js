import * as Const from "./const.js";
import Board from "./board.js";

export default class Game {
  constructor(root, ratio) {
    this.root = root;
    this.ratio = ratio;
    this.canvas = null;
    this.rect = null;
    this.ctx = null;
    this.isAlive = null;
    this.board = null;

    this.init();
  }
  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = Const.GAME_WIDTH * this.ratio;
    this.canvas.height = Const.GAME_HEIGHT * this.ratio;
    this.canvas.style.width = Const.GAME_WIDTH + "px";
    this.canvas.style.height = Const.GAME_HEIGHT + "px";
    this.ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
    this.root.appendChild(this.canvas);
    this.isAlive = true;
    this.rect = this.canvas.getBoundingClientRect();

    //create board
    this.board = new Board(this);
  }

  onMouseMove(position) {
    this.board.onMouseMove(position);
  }

  onMouseClick(position) {
    this.board.onMouseClick(position);
  }

  isAlive() {
    return this.isAlive;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  update() {
    this.board.update();
  }
  draw() {
    this.board.draw();
  }
  loop() {
    if (() => this.isAlive()) {
      this.clear();
      this.update();
      this.draw();
      setTimeout(() => this.loop(), 1000/Const.GAME_FPS);
    }
  }
  start() {
    this.loop();
  }
}
