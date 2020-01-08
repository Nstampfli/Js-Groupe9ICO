const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Load Image

const bridge = new Image();
const station = new Image();
const firstBuilding = new Image();
const secondBuilding = new Image();
const train = new Image();
const man = new Image();
const streetfloor = new Image();
const pinkCar = new Image();
const redCar = new Image();
const stroller = new Image();
const sky = new Image();

firstBuilding.src = "../assets/green_building.png";
train.src = "../assets/train.png";
secondBuilding.src = "../assets/blue_building.png";
bridge.src = "../assets/bridge.png";
station.src = "../assets/station.png";
man.src = "../assets/man.png";
streetfloor.src = "../assets/streetfloor.png";
pinkCar.src = "../assets/pink_car.png";
redCar.src = "../assets/red_car.png";
stroller.src = "../assets/stroller.png";
sky.src = "../assets/sky.png";

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
  x: canvas.width,
  y: 540
};

let strollers = [];
strollers[0] = {
  x: canvas.width,
  y: 540
};

let stationBuilding = [];
stationBuilding[0] ={
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

//Creation of variable & their value
let life = 3;
let damage = false;
let jumpup;
let jumpdown;
let toto;
let invincible = false;
let buildingcreate = true;
let jumps = false;

//speed
let pinkCarSpeed = 5;
let redCarSpeed = 4;
let strollerSpeed = 3;
let speed_build = 1;
let speed_build2 = 0.3;
let speedTrain = 0.15;
let speedStation = 0.07;
let speedleft = 5;
let speedright = 5;

//Hit Box
function hitbox(arrayname, imgname) {
  for (let i = 0; i < arrayname.length; i++) {
    if (
      !invincible &&
      arrayname[i].y <= manY + man.height &&
      manX + man.width >= arrayname[i].x &&
      manX <= arrayname[i].x + imgname.width
    ) {
      if (life > 0) {
        life--;
      }
      console.log("lol");
      invincible = true;
      setTimeout(() => (invincible = false), 1500);
    }
  }
}
function lifestyle() {
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
    //condition of speed movement malus associate with life & time [don't Work]
      if (life==3 && damage == false && timer >= 10){
        speedTrain = 0.15;
      }

      else if(life==2 && damage == true && timer >= 10 ){
        speedTrain += 1;
        SetTimeOut(() =>{ speedTrain = 0.15;
        damage =false, 5000
      });
    }
      else if(life==1 && damage == true && timer >= 10 ){
        speedTrain += 1;
        SetTimeOut(() =>{ speedTrain = 0.15;
        damage =false, 5000
      });
    }
      else if(life==0 && damage == true || timer <= 0 ){
        speedTrain += 5;
    }
    /*if (trainMov[i].x + train.width >= canvas.width - train.width) {
      speedTrain = 0;
    }*/
  }
}

// function Random Obs  
function getRandom() {
  return Math.floor(Math.random() * 3);
}

let randomObs;
function randomArray() {
  randomObs = [addFirstCar, addSecondCar, addStrollers];
  randomObs[Math.floor(Math.random() * 3)]();
}

// Obs Movement Speed
function firstCarsCreate() {
  for (let i = 0; i < pinkCars.length; i++) {
    context.drawImage(pinkCar, pinkCars[i].x, pinkCars[i].y);
    pinkCars[i].x -= pinkCarSpeed;
    //if (obstacles[i].x === 1141) {
    // setTimeout(function() {
    //   //console.log("draw car");
    //   obstacles.push({
    //     x: canvas.width,
    //     y: 540
    //   });
    // }, Math.floor(Math.random() * (3000 - 1500 + 1) + 500));
    //}
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
    building[i].x -= speed_build;
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
    building2[i].x -= speed_build2;
    if (parseInt(building2[i].x, 10) === 664 && buildingcreate == true) {
      building2.push({
        x: canvas.width,
        y: 278
      });
      buildingcreate = false;
      setTimeout(() => (buildingcreate = true), 1000);
    }
  }
}

// Building Train Station 
function buildStation() {
  for (let i = 0; i < stationBuilding.length; i++) {
    context.drawImage(station, stationBuilding[i].x, stationBuilding[i].y);
    stationBuilding[i].x -= speedStation;
    if (parseInt(stationBuilding[i].x, 10) + station.width <= 1366) {
      speedStation = 0;
      }
    }
  }

// Hero Jump function & Movement
function jumping() {
  jumps = true;
  jumpup = setInterval(() => {
    manY--;
    if (manY < 315) {
      clearInterval(jumpup);
      jumpdown = setInterval(() => {
        manY++;
        if (manY == 500) {
          clearInterval(jumpdown);
          jumps = false;
        }
      }, 5);
    }
  }, 5);
}
function mooveleft() {
  manX -= speedleft;
}
function mooveright() {
  manX += speedright;
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
    toto = setInterval(() => {
      time--;
      if (time === 0) {
        clearInterval(toto);
      }
    }, 1000);
  }
}
function timerstyle() {
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
  context.drawImage(streetfloor, 0, canvas.height - streetfloor.height);
  context.drawImage(man, manX, manY);
  lifestyle();
  firstCarsCreate();
  secondCarsCreate();
  strollersCreate();
  window.addEventListener("keydown", jump);
  hitbox(pinkCars, pinkCar);
  hitbox(redCars, redCar);
  hitbox(strollers, stroller);
  remove();
  timerstyle();
  requestAnimationFrame(draw);
}

draw();

setInterval(randomArray, 3000);

timer();
