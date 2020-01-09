import * as Const from "../../const.js";
import Tower from "./tower.js";

export default class TowerAK extends Tower {
  constructor(board, position) {
    super(board, position);
    this.setRange(20);
    this.setSpeed(0.5);
    this.setDame(10);
  }
}
