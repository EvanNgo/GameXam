import * as Const from "../../const.js";
import EnemyHealthBar from "../../ui/enemy_health_bar.js";

export default class Enemy {
  constructor(board, pointWays, startPoint) {
    this.board = board;
    this.pointWays = pointWays;
    this.startPoint = startPoint;

    //Basic info
    this.speed = 0;
    this.health = 0;
    this.currentHealth = 0;
    this.dame = 0;
    this.isAlive = true;
    this.money = 0;
    this.isBoss = false;

    //Style
    this.color = "0, 0, 0";

    // Point
    this.target = null;
    this.currentTarget = -1;
    this.position = null;
    this.healthBar = null;
    this.init();
  }
  init() {
    this.position = {
      x: this.startPoint.x * Const.GOUND_SIZE + Const.GOUND_SIZE/2,
      y: this.startPoint.y * Const.GOUND_SIZE + Const.GOUND_SIZE/2
    };
    this.healthBar = new EnemyHealthBar(this);
    this.currentHealth = this.health;
  }
  setColor(color) {
    this.color = color;
  }
  setSpeed(speed) {
    this.speed = speed * Const.MOVE_SPEED;
  }
  setDame(dame) {
    this.dame = dame;
  }
  setHealth(health) {
    this.health = health;
    this.currentHealth = this.health;
  }
  setMoney(money) {
    this.money = money;
  }
  setBoss() {
    this.isBoss = true;
    this.health= this.health * 10;
    this.currentHealth = this.health;
    this.dame = this.dame * 5;
  }
  earnDame(dame) {
    this.currentHealth -= dame;
    if (this.currentHealth <= 0) {
      this.board.earnMoney(this.money);
      this.destroy();
    }
  }
  hit() {
    this.board.earnDame(this.dame);
    this.destroy();
  }
  distancToTarget() {
    if (Math.abs(this.position.x - this.target.x) < this.speed) {
      this.position.x = this.target.x;
    } else {
      if (this.position.x > this.target.x) {
        this.position.x -= this.speed;
      } else {
        this.position.x += this.speed;
      }
    }

    if (Math.abs(this.position.y - this.target.y) < this.speed) {
      this.position.y = this.target.y;
    } else {
      if (this.position.y > this.target.y) {
        this.position.y -= this.speed;
      } else {
        this.position.y += this.speed;
      }
    }

    if (this.getDistance(this.position, this.target) < this.speed) {
      this.target = null;
    }
  }
  findTarget() {
    if (this.target === null) {
      this.currentTarget++;
      if (this.pointWays[this.currentTarget] != null) {
        this.target = {
          x: this.pointWays[this.currentTarget].x * Const.GOUND_SIZE + Const.GOUND_SIZE/2,
          y: this.pointWays[this.currentTarget].y * Const.GOUND_SIZE + Const.GOUND_SIZE/2
        }
      } else {
        this.hit();
      }
    }
  }
  getDistance(start, end) {
    let distance = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
    return distance;
  }
  destroy() {
    this.isAlive = false;
  }
  update() {
    this.findTarget();
    if (this.target!=null) {
      this.distancToTarget();
    }
    this.healthBar.update();
  }
  draw() {
    if (!this.isBoss) {
      this.board.game.ctx.beginPath();
      this.board.game.ctx.arc(this.position.x, this.position.y, Const.GOUND_SIZE/4, 0, 2 * Math.PI);
      this.board.game.ctx.strokeStyle = "rgb("+this.color+")";
      this.board.game.ctx.stroke();
      this.board.game.ctx.arc(this.position.x, this.position.y, Const.GOUND_SIZE/4, 0, 2 * Math.PI);
      this.board.game.ctx.fillStyle = "rgba("+this.color+",0.25)";
      this.board.game.ctx.fill();
    } else {
      this.board.game.ctx.beginPath();
      this.board.game.ctx.arc(this.position.x, this.position.y, Const.GOUND_SIZE/3, 0, 2 * Math.PI);
      this.board.game.ctx.strokeStyle = "rgb("+this.color+")";
      this.board.game.ctx.stroke();
      this.board.game.ctx.arc(this.position.x, this.position.y, Const.GOUND_SIZE/3, 0, 2 * Math.PI);
      this.board.game.ctx.fillStyle = "rgba("+this.color+",0.8)";
      this.board.game.ctx.fill();
    }
    this.healthBar.draw();
  }
}
