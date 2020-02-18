import Enemy from "./enemy.js";

export default class EnemyOrc extends Enemy {
  constructor(board, pointWays) {
    super(board, pointWays);
    this.setSpeed(15);
    this.setHealth(80);
    this.setDame(5);
    this.setMoney(1);
    this.setArmor(3);
    this.setColor('255,80,0');
  }
}
