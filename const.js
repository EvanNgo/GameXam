export const GAME_FPS = 60;

export const GAME_WIDTH = 960;

export const INFO_BAR_HEIGHT = 60;

export const GAME_HEIGHT = 540;

export const MOVE_SPEED = 0.05;

export const GOUND_SIZE = 60;

export const GOUND_TYPE = {
  "NON": 0,
  "EMPTY": 1,
  "TOWER": 2,
  "STREET": 9,
}

export const FREEZE_TIME = 2;

export const GOLD_TOWER_COST = 2;
export const WATER_TOWER_COST = 2;
export const POISON_TOWER_COST = 2;
export const FIRE_TOWER_COST = 2;
export const GROUND_TOWER_COST = 2;

export const TOWER_TYPE = {
  GOLD: 0,
  WATER: 1,
  POISON: 2,
  FIRE: 3,
  GROUND: 4
}

export const TOWER_DATA = [
  { //GOLD
    cost: [2,4,6],
    range: 20,
    speed: [1.5,1.3,1],
    dame: [25,35,50],
    color: "230, 195, 0"
  },
  { //WATER
    cost: [2,4,6],
    range: 30,
    speed: [1,0.7,0.5],
    dame: [10,15,20],
    freeze: [20,25,30],
    color: "0, 160, 255"
  },
  { //POISON
    cost: [2,4,6],
    range: 20,
    speed: [1.5,1.3,1],
    poison: [3,5,7],
    color: "0, 224, 41"
  },
  { //FIRE
    cost: [2,4,6],
    range: 20,
    speed: [2,1,0.5],
    dame: [15,30,45],
    color: "224, 63, 0"
  },
  { //GROUND
    cost: [2,4,6],
    range: 20,
    speed: [1.5,1.3,1],
    dame: [15,30,45],
    stun: [25,35,45],
    color: "110, 91, 83"
  }
]
