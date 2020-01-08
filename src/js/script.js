const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Load Image

const bridge = new Image();
const fst_Building = new Image();
const scd_Building = new Image();
const train = new Image();
const man = new Image();
const streetfloor = new Image();
const cars = new Image();
const sky = new Image();

fst_Building.src = "../assets/green_building.png";
train.src = "../assets/train.png";
scd_Building.src = "../assets/blue_building.png";
bridge.src = "../assets/bridge.png";
man.src = "../assets/man.png";
streetfloor.src = "../assets/streetfloor.png";
cars.src = "../assets/cars.png";
sky.src = "../assets/sky.png";

//Position

let manX = 150;
let manY = 400;
let obstacles = [];
obstacles[0] = {
  x: canvas.width,
  y: 540
};
let speed = 5;
let speed_build = 1;
let speed_build2 = 0.2;
let speedTrain = 0.13;
let jumpup;
let jumpdown;

/*let speed_build3 =1.5;      <Add building 3 if needed>*/
let building = [];
building[0] = {
  x: canvas.width,
  y: 205
};
let building2 = [];
building2[0] = {
  x: canvas.width,
  y: 255
};
/*let building3 = [];  <Add building 3 if needed>
building[0] = {
  x: canvas.width,
  y: 150
};*/
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
      manX <= obstacles[i].x + cars.width
    ) {
      console.log("lol");
      invincible = true;
      setTimeout(() => (invincible = false), 1500);
    }
  }
}

function remove() {
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x + cars.width <= 0) {
      obstacles.shift(i, 1);
    }
  }
  for (let i = 0; i < building.length; i++) {
    if (building[i].x + fst_Building.width <= 0) {
      building.shift(i, 1);
    }
  }
  for (let i = 0; i < building2.length; i++) {
    if (building2[i].x + scd_Building.width <= 0) {
      building2.shift(i, 1);
    }
  }
}

//function movement train associate with life & time
function trainAction() {
  for (let i = 0; i < trainMov.length; i++) {
    context.drawImage(train, trainMov[i].x, trainMov[i].y);
    trainMov[i].x += speedTrain;
    if (trainMov[i].x + train.width >= 960)
    
      speedTrain = 0;
  }
}

//function random obs     -----standby-----

//Obs Movement speed
function obs() {
  for (let i = 0; i < obstacles.length; i++) {
    context.drawImage(cars, obstacles[i].x, obstacles[i].y);
    obstacles[i].x -= speed;
    if (obstacles[i].x === 661) {
      obstacles.push({
        x: canvas.width,
        y: 540
      });
    }
  }
}

/* Building movement speed
building 1 */
function build() {
  for (let i = 0; i < building.length; i++) {
    context.drawImage(fst_Building, building[i].x, building[i].y);
    building[i].x -= speed_build;
    if (building[i].x === 664) {
      building.push({
        x: canvas.width,
        y: 205
      });
    }
  }
}
//building 2
function build2() {
  for (let i = 0; i < building2.length; i++) {
    context.drawImage(scd_Building, building2[i].x, building2[i].y);
    building2[i].x -= speed_build2;
    /*console.log(i);*/
    if (parseInt(building2[i].x, 10) === 664 && buildingcreate == true) {
      building2.push({
        x: canvas.width,
        y: 255
      });
      buildingcreate = false;
      setTimeout(() => (buildingcreate = true), 1000);
    }
  }
}

/*building 3
  for (let i = 0; i < building.length; i++) {
    context.drawImage(fst_Building, building[i].x, building[i].y);
    building[i].x -= speed_build;

    if (building[i].x === 664) {
      building.push({
        x: canvas.width,
        y: 150
      });
    }
  }
  */

// Jump function
function jumping() {
  jumps = true;
  jumpup = setInterval(() => {
    manY--;
    if (manY < 200) {
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

//Draw
function draw() {
  context.drawImage(sky, 0, 0);
  build2();
  context.drawImage(bridge, 0, 450);
  context.drawImage(bridge, 535, 450);
  context.drawImage(bridge, 1070, 450);
  trainAction();
  build();
  context.drawImage(streetfloor, 0, canvas.height - streetfloor.height);
  obs();
  window.addEventListener("keydown", jump);
  context.drawImage(man, manX, manY);
  hitbox();
  remove();
  requestAnimationFrame(draw);
}

draw();
