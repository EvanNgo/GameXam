import * as Const from "../../const.js";
import Tower from "./tower.js";

export default class GroundTower extends Tower {
  constructor(board, position) {
    super(board, position);
    this.setRange(Const.TOWER_DATA[Const.TOWER_TYPE.GROUND].range);
    this.setSpeed(Const.TOWER_DATA[Const.TOWER_TYPE.GROUND].speed[0]);
    this.setDame(Const.TOWER_DATA[Const.TOWER_TYPE.GROUND].dame[0]);
    this.setCost(Const.TOWER_DATA[Const.TOWER_TYPE.GROUND].cost[0]);
    this.setStun(Const.TOWER_DATA[Const.TOWER_TYPE.GROUND].stun[0]);
    this.setColor(Const.TOWER_DATA[Const.TOWER_TYPE.GROUND].color);
  }
}
