const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Load Image

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

//Position
let ab = 120;
let manX = 150;
let manY = 400;
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
let pinkCarSpeed = 5;
let redCarSpeed = 4;
let strollerSpeed = 3;
let speed_build = 1;
let speed_build2 = 0.09;
let speedTrain = 0.13;
let speedStation = 2;
let jumpup;
let jumpdown;

/*let speed_build3 =1.5;      <Add building 3 if needed>*/
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
/*let building3 = [];  <Add building 3 if needed>
building[0] = {
  x: canvas.width,
  y: 150
};*/
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
let invincible = false;
let buildingcreate = true;
let jumps = false;

//Hit Box
function hitbox() {
  for (let i = 0; i < obstacles.length; i++) {
    if (
      !invincible &&
      obstacles[i].y <= manY + man.height &&
      manX + man.width >= obstacles[i].x &&
      manX <= obstacles[i].x + pinkCar.width
    ) {
      console.log("lol");
      invincible = true;
      setTimeout(() => (invincible = false), 1500);
    }
  }
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


//function movement train (in progress : associate with life & time)
function trainAction() {
  for (let i = 0; i < trainMov.length; i++) {
    context.drawImage(train, trainMov[i].x, trainMov[i].y);
    trainMov[i].x += speedTrain;
    if (trainMov[i].x + train.width >= canvas.width - train.width) {
      speedTrain = 0;
    }
  }
}

//function random obs     -----standby-----
function getRandom () {
  return Math.floor(Math.random() * 3);
}

let randomObs;
function randomArray() {
  randomObs = [addFirstCar, addSecondCar, addStrollers];
  randomObs[Math.floor(Math.random() * 3)]();
}

//Obs Movement speed
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

/* Building movement speed
building 1 */
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
//building 2
function build2() {
  for (let i = 0; i < building2.length; i++) {
    context.drawImage(secondBuilding, building2[i].x, building2[i].y);
    building2[i].x -= speed_build2;
    /*console.log(i);*/
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

/*building 3*/
function buildStation() {
  for (let i = 0; i < stationBuilding.length; i++) {
    context.drawImage(station, stationBuilding[i].x, stationBuilding[i].y);
    stationBuilding[i].x -= speedStation;
    console.log(stationBuilding[i].x);
     
    if (parseInt(stationBuilding[i].x, 10) + station.width <= 1366) {
      speedStation = 0;
      }
    }
  }
  
  function trainAction() {
    for (let i = 0; i < trainMov.length; i++) {
      context.drawImage(train, trainMov[i].x, trainMov[i].y);
      trainMov[i].x += speedTrain;
      if (trainMov[i].x + train.width >= 960) {
        speedTrain = 0;
      }
    }
  }

// Jump function
function jumping() {
  jumps = true;
  jumpup = setInterval(() => {
    manY--;
    if (manY < 225) {
      clearInterval(jumpup);
      jumpdown = setInterval(() => {
        manY++;
        if (manY == 400) {
          clearInterval(jumpdown);
          jumps = false;
        }
      }, 5);
    }
  }, 5);
}

function jump(event) {
  switch (event.keyCode) {
    case 32:
      if (jumps == false) {
        jumping();
      }
      break;

    default:
      break;
  }
}
function timer() {
  if (ab >= 0) {
    setInterval(() => {
      ab--;
    }, 1000);
  }
}
function timerstyle() {
  context.fillStyle = "#FFF";
  context.font = "30px Verdana";
  context.fillText(ab, 1300, 30);
}
//Draw
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
  firstCarsCreate();
  secondCarsCreate();
  strollersCreate();
  window.addEventListener("keydown", jump);
  hitbox();
  remove();
  timerstyle();
  requestAnimationFrame(draw);
}

draw();


setInterval(randomArray, 3000);

timer();

