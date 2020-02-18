import * as Const from "./const.js";
import * as DATA from './data_defence.js';
import Ground from './ground.js';
import EnemyOrc from './enemy/enemy_orc.js';
import GameBar from './ui/game_bar.js';
import ShopTower from './ui/shop_tower.js';

export default class Board {
  constructor(game) {
    this.game = game;
    this.health = 100;
    this.currentHealth = this.health;

    //basic info
    this.data = DATA.DEFENCE[0];
    this.name = "";
    this.money = 0;
    this.map = [];
    this.wayPoints = [];
    this.ways = [];
    this.wayNumber = 0;
    this.wayDetail = null;
    this.enemyNumber = 0;
    this.currentEnemy = 0;
    this.enemyCount = 0;
    this.timeToSpawn = 0;
    this.isWaitNextWay = 0;
    this.timeToNextWay = 3 * Const.GAME_FPS;

    this.isAlive = true;
    //Objects
    this.enemies = [];
    this.towers = [];
    this.grounds = [];
    this.gamebar = null;
    this.shopTower = null;

    this.init();
  }

  init() {
    this.name = this.data.name;
    this.money = this.data.money;
    this.map = this.data.map;
    this.wayPoints = this.data.wayPoints;
    this.ways = this.data.ways;
    this.currentWay = this.ways[this.wayNumber];
    this.currentEnemy= this.currentWay[this.enemyNumber]
    this.timeToSpawn = this.currentEnemy.d * Const.GAME_FPS;

    for (let i = 0; i < this.map.length ; i++) {
      this.grounds.push([]);
      for (let j = 0; j < this.map[i].length ; j++) {
        this.grounds[i].push(new Ground(this, j, i ,this.map[i][j]));
      }
    }
    //create gamebar
    this.gamebar = new GameBar(this);

    //create shop
    this.shopTower = new ShopTower(this);
  }

  onMouseMove(position) {
    if (this.shopTower.isOpening) {
      this.shopTower.onHover(position);
    } else {
      for (var i = 0; i < this.grounds.length; i++) {
        for (let j = 0; j < this.grounds[i].length ; j++) {
          this.grounds[i][j].onMouseMove(position);
        }
      }
    }
  }

  onMouseClick(position) {
    if (this.shopTower.isOpening) {
      this.shopTower.onClick(position);
    } else {
      for (var i = 0; i < this.grounds.length; i++) {
        for (let j = 0; j < this.grounds[i].length ; j++) {
          this.grounds[i][j].onMouseClick(position);
        }
      }
    }
  }

  nextWays() {
    this.wayNumber++;
    if (this.wayNumber < this.ways.length) {
      this.currentWay = this.ways[this.wayNumber];
      this.enemyNumber = 0;
      this.currentEnemy= this.currentWay[this.enemyNumber]
      this.timeToSpawn = this.currentEnemy.d;
      this.isWaitNextWay = 0;
      this.timeToNextWay = 3 * Const.GAME_FPS;
    } else {
      this.destroy();
      // Winner
    }
  }

  spawnEnemy() {
    this.enemies.push(new EnemyOrc(this,this.wayPoints));
    this.enemyNumber++;
    if (this.enemyNumber < this.currentWay.length) {
      this.timeToSpawn = this.currentWay[this.enemyNumber].d * Const.GAME_FPS;
    }
  }

  toggleShop(point) {
    if (this.shopTower.isOpening) {
      this.shopTower.closeShop();
    } else {
      this.shopTower.openShop(point);
    }
  }

  buyTower(tower, point) {
    this.grounds[point.y][point.x].type = Const.GOUND_TYPE.TOWER;
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

    if (this.enemyNumber < this.currentWay.length) {
      this.timeToSpawn--;
      if (this.timeToSpawn <= 0) {
        this.spawnEnemy();
      }
    }

    if (this.enemyNumber >= this.currentWay.length
       && this.wayNumber < this.ways.length
       && this.enemies.length === 0) {
      this.isWaitNextWay = true;
      this.timeToNextWay--;
      if (this.timeToNextWay===0) {
        this.nextWays();
      }
    }

    for (var i = 0; i < this.towers.length; i++) {
      this.towers[i].update();
    }

    this.gamebar.update();

    this.shopTower.update();
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
    this.shopTower.draw();
  }
}
