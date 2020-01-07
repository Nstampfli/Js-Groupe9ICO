const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Load Image

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
  y: 500
};
let speed = 5;

let speed_build =1.3;
let speed_build2 =0.2;
/*let speed_build3 =1.5;      <Add building 3 if needed>*/
let building = [];
building[0] = {
  x: canvas.width,
  y: 150
};
let building2 = [];
building2[0] = {
  x: canvas.width,
  y: 150
};
/*let building3 = [];  <Add building 3 if needed>
building[0] = {
  x: canvas.width,
  y: 150
};*/
let invincible = false;

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
    } else if (obstacles[i].x + cars.width <= 0) {
      obstacles.shift(i, 1);
    }
  }
}

//Obs Movement speed
function obs() {
  for (let i = 0; i < obstacles.length; i++) {
    context.drawImage(cars, obstacles[i].x, obstacles[i].y);
    obstacles[i].x -= speed;
    if (obstacles[i].x === 661) {
      obstacles.push({
        x: canvas.width,
        y: 500
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
        y: 250
      });
    }
  }

//building 2
  for (let i = 0; i < building2.length; i++) {
    context.drawImage(scd_Building, building2[i].x, building2[i].y);
    building2[i].x -= speed_build2;

    if (building2[i].x === 664) {
      building2.push({
        x: canvas.width,
        y: 250
      });
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
}

// Jump function
function jump(event) {
  switch (event.keyCode) {
    case 32:
      if (manY === 400) {
        manY -= 150;
      }
      break;
    case 40:
      if (manY < 400) {
        manY += 150;
      }
    default:
      break;
  }
}
//Draw
function draw() {
  context.drawImage(sky, 0, 0);
  context.drawImage(scd_Building, 1166, 255);
  context.drawImage(train, 0, 300);
  context.drawImage(streetfloor, 0, canvas.height - streetfloor.height);
  build();
  obs();
  window.addEventListener("keydown", jump);
  context.drawImage(man, manX, manY);
  hitbox();
  requestAnimationFrame(draw);
}

draw();
