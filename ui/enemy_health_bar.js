import * as Const from "../../const.js";

export default class EnemyHealthBar {
  constructor(enemy) {
    this.enemy = enemy;
    this.game = this.enemy.board.game;
    this.width = Const.GOUND_SIZE * 0.8;
    this.height = Const.GOUND_SIZE/7;
    this.position = {
      x: this.enemy.position.x - this.width/2,
      y: this.enemy.position.y - (Const.GOUND_SIZE/2 + this.height/2)
    }
  }
  update() {
    this.position = {
      x: this.enemy.position.x - this.width/2,
      y: this.enemy.position.y - (Const.GOUND_SIZE/2 + this.height/2)
    }
  }
  draw() {
    this.game.ctx.fillStyle = "rgb(0,0,0)";
    this.game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.game.ctx.fillStyle = "rgb(0,255,0)";
    this.game.ctx.fillRect(this.position.x, this.position.y, this.width * this.enemy.currentHealth/this.enemy.health , this.height);
  }
}
