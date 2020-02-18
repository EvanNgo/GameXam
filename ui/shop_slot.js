import * as Const from "../../const.js";

export default class ShopSlot {
  constructor(shop, type) {
    this.shop = shop;
    this.ctx = this.shop.ctx;
    this.type = type;

    this.isHover = false;

    //Animation time
    this.time = 0.1 * Const.GAME_FPS;

    //Position Setup
    this.position = this.shop.position;
    this.targetPosition = null;
    this.pSpeed = null;

    //Size setup
    this.size = 0;
    this.targetSize = Const.GOUND_SIZE/3;
    this.sSpeed = this.slotSize/this.time;
  }
  getSpeedPosition(number1, number2) {
    return ( number1 - number2 ) / this.time;
  }
  open(position) {
    this.position = {
      x: this.shop.position.x,
      y: this.shop.position.y
    };

    this.size = 0;
    this.targetSize = Const.GOUND_SIZE/3;
    this.sSpeed = this.targetSize/this.time;

    this.targetPosition = position;
    this.pSpeed = {
      x: this.getSpeedPosition(this.targetPosition.x, this.position.x),
      y: this.getSpeedPosition(this.targetPosition.y, this.position.y)
    }
  }
  onHover(hoverPoint) {
    if (hoverPoint.x >= this.position.x - this.size &&
        hoverPoint.x <= this.position.x + this.size &&
        hoverPoint.y >= this.position.y - this.size &&
        hoverPoint.y <= this.position.y + this.size ) {
      this.isHover = true;
    } else {
      this.isHover = false;
    }
  }
  onClick(clickPoint) {
    if (clickPoint.x >= this.position.x - this.size &&
        clickPoint.x <= this.position.x + this.size &&
        clickPoint.y >= this.position.y - this.size &&
        clickPoint.y <= this.position.y + this.size ) {
      if (this.shop.board.money >= Const.TOWER_DATA[this.type].cost[0]) {
        this.shop.buyTower(this.type);
        this.shop.closeShop();
      }
    }
  }
  update() {
    if (Math.abs(this.position.x - this.targetPosition.x) >= Math.abs(this.pSpeed.x)) {
      this.position.x += this.pSpeed.x;
    } else {
      this.position.x = this.targetPosition.x;
    }
    if (Math.abs(this.position.y - this.targetPosition.y) >= Math.abs(this.pSpeed.y)) {
      this.position.y += this.pSpeed.y;
    } else {
      this.position.y = this.targetPosition.y;
    }
    if (Math.abs(this.size - this.targetSize) <= Math.abs(this.sSpeed)) {
      this.size = this.targetSize;
    } else {
      this.size += this.sSpeed;
    }
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb("+Const.TOWER_DATA[this.type].color+")";
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
    if (this.isHover) {
      this.ctx.beginPath();
      this.ctx.arc(this.shop.position.x, this.shop.position.y, Const.TOWER_DATA[this.type].range * Const.GOUND_SIZE / 10, 0, 2 * Math.PI);
      this.ctx.strokeStyle = "rgb("+Const.TOWER_DATA[this.type].color+")";
      this.ctx.stroke();
      this.ctx.arc(this.shop.position.x, this.shop.position.y, Const.TOWER_DATA[this.type].range * Const.GOUND_SIZE / 10, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgba("+Const.TOWER_DATA[this.type].color+",0.2)";
      this.ctx.fill();
    }
  }
}
