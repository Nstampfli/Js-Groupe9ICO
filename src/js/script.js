const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Load Image

const fst_Building = new Image();
const man = new Image();
const streetfloor = new Image();
const cars = new Image();
const sky = new Image();

fst_Building.src = "../assets/fst_Building.png";
scd_Building.src = "../assets/sc_Building.png"
man.src = "../assets/man.png";
streetfloor.src = "../assets/streetfloor.png";
cars.src = "../assets/cars.png";
sky.src = "../assets/sky.png";

//Var

let manX = 150;
let manY = 400;
let obstacles = [];
obstacles[0] = {
  x: canvas.width,
  y: 500
};
let speed = 5;
let posobs;

//Hit Box
function hitbox() {
  for (let i = 0; i < obstacles.length; i++) {
    if (
      obstacles[i].y <= manY + man.height &&
      manX + man.width > obstacles[i].x
    ) {
      console.log("lol");
    }
  }
}

//Obstacles deplacement
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
function jump(event) {
  switch (event.key) {
    case "ArrowUp":
      if (manY === 400) {
        manY -= 150;
      }
      break;
    /*case "ArrowLeft":
      if (monsterX > 40) {
        monsterX -= direction;
      }
      break;*/
    default:
      break;
  }
}
//Draw
function draw() {
  context.drawImage(sky, 0, 0);
  context.drawImage(streetfloor, 0, canvas.height - streetfloor.height);
  obs();
  window.addEventListener("keydown", jump);
  context.drawImage(man, manX, manY);
  hitbox();
  requestAnimationFrame(draw);
}

draw();
