import * as Const from "../../const.js";

export default class GameBar {
  constructor(board) {
    this.board = board;
  }
  update() {

  }
  draw() {
    this.board.game.ctx.fillStyle = "rgb(224, 195, 65)";
    this.board.game.ctx.fillRect(1, Const.GAME_HEIGHT + 1 , Const.GAME_WIDTH - 2, Const.INFO_BAR_HEIGHT);
    this.board.game.ctx.font = "23px tahoma bold";
    this.board.game.ctx.textAlign = "left";
    this.board.game.ctx.fillStyle = "rgb(0,0,0)";
    this.board.game.ctx.fillText('Vàng : '+this.board.money , Const.GOUND_SIZE/2, Const.GAME_HEIGHT + 23);
    this.board.game.ctx.fillText('Sinh mệnh : '+ this.board.currentHealth + "/" + this.board.health , Const.GOUND_SIZE/2, Const.GAME_HEIGHT + 48);
    let currentWay = this.board.wayNumber + 1;
    this.board.game.ctx.fillText('Đợt quái số : '+ currentWay + "/" + this.board.ways.length , Const.GOUND_SIZE * 5, Const.GAME_HEIGHT + 23);
    let currentEnemy = this.board.currentWay.length - this.board.enemyNumber;
    this.board.game.ctx.fillText('Số quái : '+ currentEnemy + "/" + this.board.currentWay.length , Const.GOUND_SIZE * 5, Const.GAME_HEIGHT + 48);
    if (this.board.isWaitNextWay) {
      let mTime = parseInt(this.board.timeToNextWay/Const.GAME_FPS) + 1;
      this.board.game.ctx.fillText('Đợt quái tiếp theo : '+mTime+' giây' , Const.GOUND_SIZE * 9, Const.GAME_HEIGHT + 23);
    }
  }
}
