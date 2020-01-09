import Enemy from "./enemy.js";

export default class EnemyOrc extends Enemy {
  constructor(board, pointWays, startPoint) {
    super(board, pointWays,  startPoint);
    this.setSpeed(20);
    this.setHealth(100);
    this.setDame(10);
    this.setColor('255,80,0');
  }
}
