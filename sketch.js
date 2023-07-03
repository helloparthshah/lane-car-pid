
let car;
let road;

let carSpeed = 10;

let speedSlider;
let speedP;
let kpSlider;
let kpP;
let kiSlider;
let kiP;
let kdSlider;
let kdP;


var w = window.innerWidth;
var h = window.innerHeight;
let canvas;

let atvImg;
function preload() {
  atvImg = loadImage("atv.png");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(w, h);
  road = new Road(5, carSpeed);
  car = new Car(w / 2 - 50, carSpeed, road.getLaneWidth() / 1.2, road.getLaneWidth() / 2);
  road.setLane(width / 2);
  car.setLane(road.getLaneX());

  let controls = document.getElementById("controls");

  speedP = createP("Speed " + carSpeed);
  speedP.parent(controls);
  speedSlider = createSlider(0, 20, carSpeed, 0.1);
  speedSlider.parent(controls);

  kpP = createP("Kp " + 0.1);
  kpP.parent(controls);
  kpSlider = createSlider(0, 0.2, 0.1, 0.001);
  kpSlider.parent(controls);

  kiP = createP("Ki " + 0.01);
  kiP.parent(controls);
  kiSlider = createSlider(0, 0.05, 0.01, 0.001);
  kiSlider.parent(controls);

  kdP = createP("Kd " + 0.01);
  kdP.parent(controls);
  kdSlider = createSlider(0, 0.05, 0.01, 0.001);
  kdSlider.parent(controls);
}

window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w, h);
}

// check if mouse is pressed
function mousePressed() {
  // check if not clicked on the controls
  if (mouseX > controls.offsetWidth && mouseY > height - controls.offsetHeight) {
    return;
  }
  // move the car to the mouse position
  road.setLane(mouseX);
  car.setLane(road.getLaneX());
}

function draw() {
  let carSpeed = speedSlider.value();
  speedP.html("Speed " + carSpeed);
  let kp = kpSlider.value();
  kpP.html("Kp " + kp);
  let ki = kiSlider.value();
  kiP.html("Ki " + ki);
  let kd = kdSlider.value();
  kdP.html("Kd " + kd);

  car.changePid(kp, ki, kd)
  car.setSpeed(carSpeed);
  background(100);
  road.draw();
  road.setSpeed(car.getSpeedX(carSpeed));
  car.draw();

  let fps = frameRate();
  noStroke();
  fill(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}
