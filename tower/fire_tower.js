import * as Const from "../../const.js";
import Tower from "./tower.js";

export default class FireTower extends Tower {
  constructor(board, position) {
    super(board, position);
    this.setRange(Const.TOWER_DATA[Const.TOWER_TYPE.FIRE].range);
    this.setSpeed(Const.TOWER_DATA[Const.TOWER_TYPE.FIRE].speed[0]);
    this.setCost(Const.TOWER_DATA[Const.TOWER_TYPE.FIRE].cost[0]);
    this.setColor(Const.TOWER_DATA[Const.TOWER_TYPE.FIRE].color);
  }
}
