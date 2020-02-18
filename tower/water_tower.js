import * as Const from "../../const.js";
import Tower from "./tower.js";

export default class WaterTower extends Tower {
  constructor(board, position) {
    super(board, position);
    this.setRange(Const.TOWER_DATA[Const.TOWER_TYPE.WATER].range);
    this.setSpeed(Const.TOWER_DATA[Const.TOWER_TYPE.WATER].speed[0]);
    this.setDame(Const.TOWER_DATA[Const.TOWER_TYPE.WATER].dame[0]);
    this.setCost(Const.TOWER_DATA[Const.TOWER_TYPE.WATER].cost[0]);
    this.setFreeze(Const.TOWER_DATA[Const.TOWER_TYPE.WATER].freeze[0]);
    this.setColor(Const.TOWER_DATA[Const.TOWER_TYPE.WATER].color);
  }
}
