import * as Const from "../../const.js";
import ShopSlot from "./shop_slot.js";
import GoldTower from "../../tower/gold_tower.js";
import WaterTower from "../../tower/water_tower.js";
import PoisonTower from "../../tower/poison_tower.js";
import FireTower from "../../tower/fire_tower.js";
import GroundTower from "../../tower/ground_tower.js";

const OPEN_ANIMATE = 0;
const CLOSE_ANIMATE = 1;

export default class ShopTower {
  constructor(board) {
    this.board = board;
    this.ctx = this.board.game.ctx;
    this.isOpening = false;
    this.position = null;

    this.goldSlot = null;
    this.waterSlot = null;
    this.poisonSlot = null;
    this.fireSlot = null;
    this.groundSlot = null;
    this.point = null;

    this.isAnimating = false;

    this.time = 0.2 * Const.GAME_FPS;
    this.currentSize = 0;
    this.currentPositon = null;
    this.positionSpeed = null;

    this.size = 0;
    this.targetSize = 0;
    this.sSpeed = 0;

    this.init();
  }

  init() {
    this.goldSlot = new ShopSlot(this,Const.TOWER_TYPE.GOLD);
    this.waterSlot = new ShopSlot(this,Const.TOWER_TYPE.WATER);
    this.poisonSlot = new ShopSlot(this,Const.TOWER_TYPE.POISON);
    this.fireSlot = new ShopSlot(this,Const.TOWER_TYPE.FIRE);
    this.groundSlot = new ShopSlot(this,Const.TOWER_TYPE.GROUND);
  }

  buyTower(type) {
    switch (type) {
      case Const.TOWER_TYPE.GOLD:
        this.board.buyTower(new GoldTower(this.board, this.point),this.point);
        break;
      case Const.TOWER_TYPE.WATER:
        this.board.buyTower(new WaterTower(this.board, this.point),this.point);
        break;
      case Const.TOWER_TYPE.POISON:
        this.board.buyTower(new PoisonTower(this.board, this.point),this.point);
        break;
      case Const.TOWER_TYPE.FIRE:
        this.board.buyTower(new FireTower(this.board, this.point),this.point);
        break;
      case Const.TOWER_TYPE.GROUND:
        this.board.buyTower(new GroundTower(this.board, this.point),this.point);
        break;
      default:

    }
  }

  openShop(point) {
    this.size = 0;
    this.targetSize = Const.GOUND_SIZE/4;
    this.sSpeed = this.targetSize/this.time;
    this.position = {
      x: point.x * Const.GOUND_SIZE + Const.GOUND_SIZE/2,
      y: point.y * Const.GOUND_SIZE + Const.GOUND_SIZE/2
    }
    this.goldSlot.open({
      x: this.position.x,
      y: this.position.y - Const.GOUND_SIZE * 0.75
    });
    this.waterSlot.open({
      x: this.position.x + Const.GOUND_SIZE * 0.75 ,
      y: this.position.y - Const.GOUND_SIZE * 0.25
    })
    this.poisonSlot.open({
      x: this.position.x + Const.GOUND_SIZE * 0.5 ,
      y: this.position.y + Const.GOUND_SIZE * 0.6
    })
    this.fireSlot.open({
      x: this.position.x - Const.GOUND_SIZE * 0.5 ,
      y: this.position.y + Const.GOUND_SIZE * 0.6
    })
    this.groundSlot.open({
      x: this.position.x - Const.GOUND_SIZE * 0.75 ,
      y: this.position.y - Const.GOUND_SIZE * 0.25
    })
    this.point = point;
    this.isAnimating = true;
    this.isOpening = true;
  }
  closeShop() {
    this.isOpening = false;
  }
  onHover(hoverPoint) {
    this.goldSlot.onHover(hoverPoint);
    this.waterSlot.onHover(hoverPoint);
    this.poisonSlot.onHover(hoverPoint);
    this.fireSlot.onHover(hoverPoint);
    this.groundSlot.onHover(hoverPoint);
  }
  onClick(clickPoint) {
    if (this.isAnimating) {
      return;
    }
    if (clickPoint.x >= this.position.x - Const.GOUND_SIZE/4 &&
        clickPoint.x <= this.position.x + Const.GOUND_SIZE/4 &&
        clickPoint.y >= this.position.y - Const.GOUND_SIZE/4&&
        clickPoint.y <= this.position.y + Const.GOUND_SIZE/4) {
          this.closeShop();
    } else {
      this.goldSlot.onClick(clickPoint);
      this.waterSlot.onClick(clickPoint);
      this.poisonSlot.onClick(clickPoint);
      this.fireSlot.onClick(clickPoint);
      this.groundSlot.onClick(clickPoint);
    }
  }
  update() {
    if (this.isOpening) {
      if (Math.abs(this.size - this.targetSize) <= Math.abs(this.sSpeed)) {
        this.size = this.targetSize;
        this.isAnimating = false;
      } else {
        this.size += this.sSpeed;
      }
      this.goldSlot.update();
      this.waterSlot.update();
      this.poisonSlot.update();
      this.fireSlot.update();
      this.groundSlot.update();
    }
  }
  draw() {
    if (this.isOpening) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "rgb(0, 0, 0)";
      this.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
      this.ctx.fill();

      this.goldSlot.draw();
      this.waterSlot.draw();
      this.poisonSlot.draw();
      this.fireSlot.draw();
      this.groundSlot.draw();
    }
  }
}
