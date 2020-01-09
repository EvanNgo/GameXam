import Enemy from "./enemy.js";

export default class EnemyOrc extends Enemy {
  constructor(board, pointWays, startPoint, isBoss) {
    super(board, pointWays,  startPoint);
    this.setSpeed(20);
    this.setHealth(100);
    this.setDame(10);
    this.setMoney(1);
    this.setColor('255,80,0');
    if (isBoss) {
      this.setBoss();
    }
  }
}
