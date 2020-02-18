import * as Const from "../../const.js";
import Bullet from "./bullet.js";

export default class Tower {
  constructor(board, position) {
    this.board = board;
    this.position = {
      x: position.x * Const.GOUND_SIZE + Const.GOUND_SIZE/2,
      y: position.y * Const.GOUND_SIZE + Const.GOUND_SIZE/2
    }
    this.range = 0;
    this.dame = 0;
    this.freeze = 0;
    this.speed = 0;
    this.poison = 0;
    this.fire = 0;
    this.stun = 0;
    this.cost = 0;
    this.delayTime = 0;
    this.target = null;
    this.color = "";
    this.bullets = [];
  }
  setColor(color) {
    this.color = color;
  }
  setCost(cost) {
    this.cost = cost;
  }
  setDame(dame) {
    this.dame = dame;
  }
  setRange(range) {
    this.range = range * Const.GOUND_SIZE / 10;
  }
  setSpeed(speed) {
    this.speed = speed;
  }
  setFreeze(freeze) {
    this.freeze = freeze;
  }
  setFire(fire) {
    this.fire = fire;
  }
  setPoison(poison) {
    this.poison = poison;
  }
  setStun(stun) {
    this.stun = stun;
  }
  findTarget() {
    for (let i = 0; i < this.board.enemies.length; i++) {
      if (this.getDistance(this.position, this.board.enemies[i].position) < this.range) {
        this.target = this.board.enemies[i];
        i = this.board.enemies.length;
      }
    }
  }
  getDistance(start, end) {
    let distance = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
    return distance;
  }
  attack() {
    this.bullets.push(new Bullet(this));
  }
  update() {
    if (this.target != null && this.target.isAlive && this.getDistance(this.position, this.target.position) < this.range) {
      this.delayTime--;
      if (this.delayTime <= 0) {
        this.attack();
        this.delayTime = this.speed * Const.GAME_FPS;
      }
    } else {
      this.findTarget();
    }
    for (var i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].isDraw) {
        this.bullets.slice(i, 1);
      } else {
        this.bullets[i].update();
      }
    }
  }
  draw() {
    this.board.game.ctx.fillStyle = "rgb("+this.color+")";
    this.board.game.ctx.beginPath();
    this.board.game.ctx.arc(this.position.x, this.position.y, Const.GOUND_SIZE/4, 0, 2 * Math.PI);
    this.board.game.ctx.fill();
    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].isDraw) {
        this.bullets[i].draw();
      }
    }
  }
}
