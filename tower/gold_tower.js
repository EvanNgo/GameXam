import * as Const from "../../const.js";
import Tower from "./tower.js";

export default class GoldTower extends Tower {
  constructor(board, position) {
    super(board, position);
    this.setRange(Const.TOWER_DATA[Const.TOWER_TYPE.GOLD].range);
    this.setSpeed(Const.TOWER_DATA[Const.TOWER_TYPE.GOLD].speed[0]);
    this.setDame(Const.TOWER_DATA[Const.TOWER_TYPE.GOLD].dame[0]);
    this.setCost(Const.TOWER_DATA[Const.TOWER_TYPE.GOLD].cost[0]);
    this.setColor(Const.TOWER_DATA[Const.TOWER_TYPE.GOLD].color);
  }
}
