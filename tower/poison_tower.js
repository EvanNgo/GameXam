import * as Const from "../../const.js";
import Tower from "./tower.js";

export default class PoisonTower extends Tower {
  constructor(board, position) {
    super(board, position);
    this.setRange(Const.TOWER_DATA[Const.TOWER_TYPE.POISON].range);
    this.setSpeed(Const.TOWER_DATA[Const.TOWER_TYPE.POISON].speed[0]);
    this.setCost(Const.TOWER_DATA[Const.TOWER_TYPE.POISON].cost[0]);
    this.setColor(Const.TOWER_DATA[Const.TOWER_TYPE.POISON].color);
    this.setPoison(Const.TOWER_DATA[Const.TOWER_TYPE.POISON].poison[0])
  }
}
