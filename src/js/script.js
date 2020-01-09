const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Load Image

const bridge = new Image();
const station = new Image();
const firstBuilding = new Image();
const secondBuilding = new Image();
const train = new Image();
const man = new Image();
const streetFloor = new Image();
const pinkCar = new Image();
const redCar = new Image();
const stroller = new Image();
const sky = new Image();
const lightning = new Image();

firstBuilding.src = "../assets/green_building.png";
train.src = "../assets/train.png";
secondBuilding.src = "../assets/blue_building.png";
bridge.src = "../assets/bridge.png";
station.src = "../assets/station.png";
man.src = "../assets/run3.gif";
streetFloor.src = "../assets/streetfloor.png";
pinkCar.src = "../assets/pink_car.png";
redCar.src = "../assets/red_car.png";
stroller.src = "../assets/stroller.png";
sky.src = "../assets/sky.png";
lightning.src = "../assets/eclair.png";

// Position
let time = 120;
let manX = 150;
let manY = 500;

let obstacles = [];
obstacles[0] = {
  x: canvas.width,
  y: 540
};

let pinkCars = [];
pinkCars[0] = {
  x: canvas.width,
  y: 540
};

let redCars = [];
redCars[0] = {
  x: canvas.width + 500,
  y: 540
};

let strollers = [];
strollers[0] = {
  x: canvas.width + 1000,
  y: 540
};

let stationBuilding = [];
stationBuilding[0] = {
  x: canvas.width,
  y: 150
};
let trainMov = [];
trainMov[0] = {
  x: -540,
  y: 400
};

let building = [];
building[0] = {
  x: canvas.width,
  y: 190
};
let building2 = [];
building2[0] = {
  x: canvas.width,
  y: 278
};

let lightnings = [];
lightnings[0] = {
  x: 13666,
  y: 300
};

//Creation of variable & their value
let life = 3;
let damage = false;
let jumpUp;
let jumpDown;
let timeInterval;
let randomObs;
let invincible = false;
let buildingCreate = true;
let jumps = false;
let bonusCondition = false;

//speed
let pinkCarSpeed = 5;
let redCarSpeed = 4;
let strollerSpeed = 3.5;
let speedBuild = 1;
let speedBuild2 = 0.3;
let speedTrain = 0.15;
let speedStation = 0.07;
let speedLeft = 5;
let speedRight = 5;

//Hit Box
function hitbox(arrayName, imgName) {
  for (let i = 0; i < arrayName.length; i++) {
    if (
      !invincible &&
      arrayName[i].y <= manY + man.height &&
      manX + man.width >= arrayName[i].x &&
      manX <= arrayName[i].x + imgName.width
    ) {
      damage = true;
      if (life > 0 && damage == true) {
        life--;
        speedTrain = 1;
        setTimeout(() => {
          damage = false;
          speedTrain = 0.15;
        }, 2000);
      }
      if (life == 0 && damage == true) {
        speedTrain = 20;
      }
      invincible = true;
      setTimeout(() => (invincible = false), 3000);
    }
  }
}
function bonusHitbox() {
  for (let i = 0; i < lightnings.length; i++) {
    if (
      bonusCondition == false &&
      lightnings[i].y + lightning.height >= manY &&
      manX + man.width >= lightnings[i].x &&
      manX <= lightnings[i].x + lightning.width
    ) {
      bonusCondition = true;
      speedRight = 20;
      speedLeft = 20;
      setTimeout(() => {
        speedRight = 5;
        speedLeft = 5;
        bonusCondition = false;
        console.log("2");
      }, 5000);
    }
  }
}

function lifeStyle() {
  context.fillStyle = "#000";
  context.font = "30px Verdana";
  context.fillText("Vie : " + life, 0, 30);
}

function remove() {
  for (let i = 0; i < pinkCars.length; i++) {
    if (pinkCars[i].x + pinkCar.width <= 0) {
      pinkCars.shift(i, 1);
    }
  }
  for (let i = 0; i < redCars.length; i++) {
    if (redCars[i].x + redCar.width <= 0) {
      redCars.shift(i, 1);
    }
  }
  for (let i = 0; i < strollers.length; i++) {
    if (strollers[i].x + stroller.width <= 0) {
      strollers.shift(i, 1);
    }
  }
  for (let i = 0; i < building.length; i++) {
    if (building[i].x + firstBuilding.width <= 0) {
      building.shift(i, 1);
    }
  }
  for (let i = 0; i < building2.length; i++) {
    if (building2[i].x + secondBuilding.width <= 0) {
      building2.shift(i, 1);
    }
  }
}

// function movement train (in progress : associate with life & time)
function trainAction() {
  for (let i = 0; i < trainMov.length; i++) {
    context.drawImage(train, trainMov[i].x, trainMov[i].y);
    trainMov[i].x += speedTrain;
  }
}

// function Random Obs
function randomArray() {
  randomObs = [addFirstCar, addSecondCar, addStrollers];
  randomObs[Math.floor(Math.random() * 3)]();
}

// Obs Movement Speed
function firstCarsCreate() {
  for (let i = 0; i < pinkCars.length; i++) {
    context.drawImage(pinkCar, pinkCars[i].x, pinkCars[i].y);
    pinkCars[i].x -= pinkCarSpeed;
  }
}


function secondCarsCreate() {
  for (let i = 0; i < redCars.length; i++) {
    context.drawImage(redCar, redCars[i].x, redCars[i].y);
    redCars[i].x -= redCarSpeed;
  }
}

function strollersCreate() {
  for (let i = 0; i < strollers.length; i++) {
    context.drawImage(stroller, strollers[i].x, strollers[i].y);
    strollers[i].x -= strollerSpeed;
  }
}

function addFirstCar() {
  pinkCars.push({
    x: canvas.width,
    y: 540
  });
}

function addSecondCar() {
  redCars.push({
    x: canvas.width,
    y: 540
  });
}

function addStrollers() {
  strollers.push({
    x: canvas.width,
    y: 540
  });
}

// Building movement speed

// Building 1
function build() {
  for (let i = 0; i < building.length; i++) {
    context.drawImage(firstBuilding, building[i].x, building[i].y);
    building[i].x -= speedBuild;
    if (building[i].x === 664) {
      building.push({
        x: canvas.width,
        y: 190
      });
    }
  }
}

// Building 2
function build2() {
  for (let i = 0; i < building2.length; i++) {
    context.drawImage(secondBuilding, building2[i].x, building2[i].y);
    building2[i].x -= speedBuild2;
    if (parseInt(building2[i].x, 10) === 664 && buildingCreate == true) {
      building2.push({
        x: canvas.width,
        y: 278
      });
      buildingCreate = false;
      setTimeout(() => (buildingCreate = true), 1000);
    }
  }
}

// Building Train Station
function buildStation() {
  for (let i = 0; i < stationBuilding.length; i++) {
    context.drawImage(station, stationBuilding[i].x, stationBuilding[i].y);
    stationBuilding[i].x -= speedStation;

    //console.log(stationBuilding[i].x);
    if (parseInt(stationBuilding[i].x, 10) + station.width <= 1366) {
      speedStation = 0;
    }
  }
}
// Bonus movement speed and push
function bonusspawn() {
  lightnings.push({
    x: canvas.width,
    y: 300
  });
}

function bonus() {
  for (let i = 0; i < lightnings.length; i++) {
    context.drawImage(lightning, lightnings[i].x, lightnings[i].y);
    lightnings[i].x -= 10;
    if (lightnings[i].x === 666) {
      setTimeout(bonusspawn, Math.floor(Math.random() * 20000 + 20000));
    }
  }
}
// Hero Jump function & Movement
function jumping() {
  jumps = true;
  jumpUp = setInterval(() => {
    manY--;
    if (manY < 315) {
      clearInterval(jumpUp);
      jumpDown = setInterval(() => {
        manY++;
        if (manY == 500) {
          clearInterval(jumpDown);
          jumps = false;
        }
      }, 5);
    }
  }, 5);
}
function mooveleft() {
  manX -= speedLeft;
}
function mooveright() {
  manX += speedRight;
}

function jump(event) {
  switch (event.keyCode) {
    case 38:
      if (jumps == false) {
        jumping();
      }
      break;
    case 37:
      if (manX > 0) {
        mooveleft();
      }
      break;
    case 39:
      if (manX + man.width < canvas.width) {
        mooveright();
      }
      break;
    default:
      break;
  }
}

//Timer function
function timer() {
  if (time > 0) {
    timeInterval = setInterval(() => {
      time--;
      if (time === 0) {
        clearInterval(timeInterval);
      }
    }, 1000);
  }
}
function timerStyle() {
  context.fillStyle = "#000";
  context.font = "30px Verdana";
  context.fillText(time, 1300, 30);
}

//Draw function
function draw() {
  context.drawImage(sky, 0, 0);
  build2();
  trainAction();
  buildStation();
  context.drawImage(bridge, 0, 450);
  context.drawImage(bridge, 523, 450);
  context.drawImage(bridge, 1046, 450);
  build();
  context.drawImage(streetFloor, 0, canvas.height - streetFloor.height);
  context.drawImage(man, manX, manY);
  bonus();
  lifeStyle();
  firstCarsCreate();
  secondCarsCreate();
  strollersCreate();
  window.addEventListener("keydown", jump);
  hitbox(pinkCars, pinkCar);
  hitbox(redCars, redCar);
  hitbox(strollers, stroller);
  bonusHitbox();
  remove();
  timerStyle();
  requestAnimationFrame(draw);
}

draw();

setTimeout(() => {
  
  setInterval(randomArray, 3000);
}, 4500);

timer();