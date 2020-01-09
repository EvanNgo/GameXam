import * as Const from "./const.js";
import Ground from './ground.js';
import EnemyOrc from './enemy/enemy_orc.js';
import TowerAK from './tower/tower_ak.js';

const _ = 0;  // empty ground
const X = 1;  // street
const W = 2;  // enemy food
const S = 8;  // start point
const E = 9;  // End point
const T = 10; // have tower

export default class Board {
  constructor(game) {
    this.game = game;
    this.cells = [];
    this.grounds = [];
    this.streets = [];
    this.pointWays = [];
    this.startPoint = {};
    this.endPoint = {};
    this.waitToSpawnEnemies = 100;
    this.delayTime = 0;
    this.enemies = [];
    this.towers = [];
    this.init();
  }
  addTower(tower) {
    console.log(tower);
    this.towers.push(tower);
  }
  init() {
    this.cells = [
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
    for (let i = 0; i < this.cells.length ; i++) {
      this.grounds.push([]);
      for (let j = 0; j < this.cells[i].length ; j++) {
        this.grounds[i].push(new Ground(this, j, i ,this.cells[i][j]));
      }
    }
    this.startPoint = {x:13,y:1};
    this.endPoint   = {x:1,y:7};
    this.pointWays  = [
      {x:13,y:6},{x:5,y:6},{x:5,y:3},{x:1,y:3},{x:1,y:7}
    ];

    //create Enemy
    this.delayTime = Const.GAME_FPS * 3; // 3s
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
        this.enemies.push(new EnemyOrc(this,this.pointWays, this.startPoint));
        this.delayTime = Math.floor(Math.random() * 200) + 1;
      }
    }

    for (var i = 0; i < this.towers.length; i++) {
      this.towers[i].update();
    }
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
  }
}
