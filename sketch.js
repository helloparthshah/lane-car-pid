
let car;
let road;

let carSpeed = 2;
let speedSlider;

function setup() {
  createCanvas(400, 400);
  car = new Car(200, height - 30, carSpeed);
  road = new Road(3, carSpeed);
  road.setLane(width / 2);
  car.setLane(road.getLaneX());
  speedSlider = createSlider(0, 10, carSpeed, 0.1);
  speedSlider.position(width / 2 - 100, height + 10);
}

// check if mouse is pressed
function mousePressed() {
  // move the car to the mouse position
  road.setLane(mouseX);
  car.setLane(road.getLaneX());
}

function draw() {
  let carSpeed = speedSlider.value();
  car.setSpeed(carSpeed);
  background(100);
  road.draw();
  road.setSpeed(car.getSpeedX(carSpeed));
  car.draw();
}
