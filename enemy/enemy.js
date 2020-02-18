import * as Const from "../../const.js";
import EnemyHealthBar from "../../ui/enemy_health_bar.js";

export default class Enemy {
  constructor(board, pointWays) {
    this.board = board;
    this.pointWays = pointWays;
    this.startPoint = this.pointWays[0];

    //Basic info
    this.speed = 0;
    this.rootSpeed = 0;
    this.health = 0;
    this.currentHealth = 0;
    this.dame = 0;
    this.isAlive = true;
    this.money = 0;
    this.armor = 0;
    this.isBoss = false;
    this.freeze = 0;
    this.freezeTime = 0;
    this.stunTime = 0;
    this.poisonTime = 0;
    this.poisonEarnTime = Const.GAME_FPS/2;

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
    this.rootSpeed = speed * Const.MOVE_SPEED;
    this.speed = this.rootSpeed;
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
  setArmor(armor) {
    this.armor = armor;
  }
  earnFreeze(freeze) {
    this.freeze = freeze;
    this.freezeTime = Const.FREEZE_TIME * Const.GAME_FPS;
  }
  earnStun(stun) {
    let r = Math.floor(Math.random() * 100);
    if (r < stun) {
      this.stunTime = 1.5 * Const.GAME_FPS;
    }
  }
  earnPoisonDame() {
    this.currentHealth -= this.poison;
    this.poisonEarnTime = Const.GAME_FPS/2;
    if (this.currentHealth <= 0) {
      this.board.earnMoney(this.money);
      this.destroy();
    }
  }
  earnPoison(poison) {
    this.poison += poison;
    this.poisonTime = 2 * Const.GAME_FPS;
    console.log(this.poison);
  }
  earnFire() {

  }
  earnDame(dame) {
    this.currentHealth -= dame - this.armor;
    if (this.currentHealth <= 0) {
      this.board.earnMoney(this.money);
      this.destroy();
    }
  }
  setBoss() {
    this.isBoss = true;
    this.health= this.health * 10;
    this.currentHealth = this.health;
    this.dame = this.dame * 5;
  }
  hit() {
    this.board.earnDame(this.dame);
    this.destroy();
  }
  distancToTarget() {
    if (this.freezeTime > 0) {
      this.freezeTime--;
      if (this.freezeTime === 0) {
        this.freeze = 0;
      }
    }
    if (this.stunTime > 0) {
      this.stunTime--;
      this.speed = 0;
    } else {
      this.speed = this.rootSpeed * (1 - this.freeze/100);
    }
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
    if (this.poisonTime > 0) {
      this.poisonTime--;
      this.poisonEarnTime--;
      if (this.poisonEarnTime === 0) {
        this.earnPoisonDame();
      }
    } else {
      this.poison = 0;
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
