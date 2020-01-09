import * as Const from "./const.js";
import Ground from './ground.js';
import EnemyOrc from './enemy/enemy_orc.js';
import TowerAK from './tower/tower_ak.js';
import GameBar from './ui/game_bar.js';

const _ = 0;  // empty ground
const X = 1;  // street
const W = 2;  // enemy food
const S = 8;  // start point
const E = 9;  // End point
const T = 10; // have tower

export default class Board {
  constructor(game) {
    this.game = game;
    this.map = [];
    this.grounds = [];
    this.streets = [];
    this.pointWays = [];
    this.startPoint = {};
    this.endPoint = {};
    this.delayTime = 0;

    //basic info
    this.health = 0;
    this.currentHealth = 0;
    this.money = 0;
    this.currentWay = 0;
    this.waitToSpawnEnemies = 0;
    this.enemyWays = [];
    this.enemyOfCurrentWay = 0;
    this.isAlive = true;

    //Objects
    this.enemies = [];
    this.towers = [];
    this.gamebar = null;

    this.init();
  }
  init() {
    this.health = 100;
    this.currentHealth = this.health;
    this.money = 5;
    this.enemyWays = Const.GAME_WAYS;
    this.timeToNextWay = 2 * Const.GAME_FPS;
    this.isWaitNextWay = true;
    this.map = [
    //  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
      [ _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],  //0
      [ _, _, _, _, _, _, _, _, _, _, _, _, _, S, _, _],  //1
      [ _, _, _, _, _, _, _, _, _, _, _, _, _, X, _, _],  //2
      [ _, W, X, X, X, W, _, _, _, _, _, _, _, X, _, _],  //3
      [ _, X, _, _, _, X, _, _, _, _, _, _, _, X, _, _],  //4
      [ _, X, _, _, _, X, _, _, _, _, _, _, _, X, _, _],  //5
      [ _, X, _, _, _, W, X, X, X, X, X, X, X, W, _, _],  //6
      [ _, E, _, _, _, _, _, _, _, _, _, _, _, _, _, _],  //7
      [ _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _]   //8
    ];
    for (let i = 0; i < this.map.length ; i++) {
      this.grounds.push([]);
      for (let j = 0; j < this.map[i].length ; j++) {
        this.grounds[i].push(new Ground(this, j, i ,this.map[i][j]));
      }
    }
    this.startPoint = {x:13,y:1};
    this.endPoint   = {x:1,y:7};
    this.pointWays  = [
      {x:13,y:6},{x:5,y:6},{x:5,y:3},{x:1,y:3},{x:1,y:7}
    ];

    //create gamebar
    this.gamebar = new GameBar(this);
  }
  onMouseMove(position) {
    for (var i = 0; i < this.grounds.length; i++) {
      for (let j = 0; j < this.grounds[i].length ; j++) {
        this.grounds[i][j].onMouseMove(position);
      }
    }
  }
  onMouseClick(position) {
    for (var i = 0; i < this.grounds.length; i++) {
      for (let j = 0; j < this.grounds[i].length ; j++) {
        this.grounds[i][j].onMouseClick(position);
      }
    }
  }
  addTower(tower,position) {
    this.grounds[position.y][position.x].type = T
    this.money -= tower.cost;
    this.towers.push(tower);
  }
  earnMoney(money) {
    this.money += money;
  }
  earnDame(dame) {
    this.currentHealth -= dame;
    if (this.currentHealth <= 0) {
      this.destroy();
    }
  }
  nextWays() {
    this.isWaitNextWay = false;
    this.currentWay++;
    this.enemyOfCurrentWay = this.enemyWays[this.currentWay - 1].enemies;
    this.waitToSpawnEnemies = this.enemyOfCurrentWay;
    this.delayTime = this.enemyWays[this.currentWay - 1].delay * Const.GAME_FPS;
    this.timeToNextWay = 5 * Const.GAME_FPS;
  }
  destroy() {
    this.isAlive = false;
  }
  update() {
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
      if (!this.enemies[i].isAlive) {
        this.enemies.splice(i,1);
      }
    }
    if (this.waitToSpawnEnemies > 0) {
      this.delayTime--;
      if (this.delayTime <= 0) {
        this.waitToSpawnEnemies--;
        this.enemies.push(new EnemyOrc(this,this.pointWays, this.startPoint,this.enemyWays[this.currentWay - 1].isBoss));
        this.delayTime = Math.floor(Math.random() * 200) + 1;
      }
    }
    for (var i = 0; i < this.towers.length; i++) {
      this.towers[i].update();
    }
    if (this.waitToSpawnEnemies === 0 && this.currentWay < this.enemyWays.length && this.enemies.length === 0) {
      this.isWaitNextWay = true;
      this.timeToNextWay--;
      if (this.timeToNextWay===0) {
        this.nextWays();
      }
    }
    this.gamebar.update();
  }
  draw() {
    for (let i = 0; i < this.grounds.length ; i++) {
      for (let j = 0; j < this.grounds[i].length ; j++) {
        this.grounds[i][j].draw();
      }
    }
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
    for (var i = 0; i < this.towers.length; i++) {
      this.towers[i].draw();
    }
    this.gamebar.draw();
  }
}
