import * as Const from "../../const.js";

export default class Bullet {
  constructor(tower) {
    this.tower = tower;
    this.target = this.tower.target;
    this.position = {
      x: this.tower.position.x,
      y: this.tower.position.y
    };
    this.speed = Const.GAME_FPS/6;
    this.isDraw = true;
  }
  hit() {
    this.target.earnDame(this.tower.dame);
    if (this.tower.freeze > 0) {
      this.target.earnFreeze(this.tower.freeze);
    }
    if (this.tower.stun > 0) {
      this.target.earnStun(this.tower.stun);
    }
  }
  update() {
    if (this.target != null) {
      if (this.getDistance(this.position, this.target.position) > Const.GOUND_SIZE/2.5) {
        if (Math.abs(this.position.x - this.target.position.x) < this.speed) {
          this.position.x = this.target.position.x;
        } else {
          if (this.position.x > this.target.position.x) {
            this.position.x -= this.speed;
          } else {
            this.position.x += this.speed;
          }
        }

        if (Math.abs(this.position.y - this.target.position.y) < this.speed) {
          this.position.y = this.target.position.y;
        } else {
          if (this.position.y > this.target.position.y) {
            this.position.y -= this.speed;
          } else {
            this.position.y += this.speed;
          }
        }
      } else {
        if (this.tower.poison > 0) {
          this.target.earnPoison(this.tower.poison);
        } else {
          this.hit();
        }
        this.destroy();
      }
    } else {
      this.destroy();
    }
  }
  destroy() {
    this.isDraw = false;
  }
  getDistance(start, end) {
    let distance = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
    return distance;
  }
  draw() {
    this.tower.board.game.ctx.fillStyle = "rgb("+this.tower.color+")";
    this.tower.board.game.ctx.beginPath();
    this.tower.board.game.ctx.arc(this.position.x, this.position.y, Const.GOUND_SIZE/10, 0, 2 * Math.PI);
    this.tower.board.game.ctx.fill();
  }
}
