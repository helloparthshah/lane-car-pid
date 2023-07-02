class Car {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.PID = new PIDController(0.1, 0.01, 0.01);
        this.lane = 0;
        this.speed = 0;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setLane(laneX) {
        this.lane = laneX;
    }

    update() {
        // use the pid controller to turn the car to the center of the lane
        // remember angles are measured from the y axis
        const targetAngle = -atan2(100, this.lane - this.x);
        const currentAngle = atan2(sin(this.angle), cos(this.angle)) - PI / 2;
        // draw current angle and target angle in different colors
        stroke(255, 0, 0);
        line(this.x, this.y, this.x + cos(currentAngle) * 50, this.y + sin(currentAngle) * 50);
        stroke(0, 255, 0);
        line(this.x, this.y, this.x + cos(targetAngle) * 50, this.y + sin(targetAngle) * 50);
        const turn = this.PID.calculate(currentAngle, targetAngle, 1 / 60);
        this.angle += turn;
        this.x += cos(this.angle - PI / 2) * this.speed;
    }

    getSpeedX(maxSpeed) {
        return cos(this.angle) * maxSpeed;
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle + PI / 2);
        rectMode(CENTER);
        noStroke();
        fill(255, 0, 0);
        rect(0, 0, 40, 25);
        pop();
        this.update();
    }
}

class PIDController {
    constructor(Kp, Ki, Kd) {
        this.Kp = Kp; // Proportional gain
        this.Ki = Ki; // Integral gain
        this.Kd = Kd; // Derivative gain

        this.prevError = 0;
        this.integral = 0;
    }

    calculate(controlVariable, targetValue, deltaTime) {
        const error = targetValue - controlVariable;
        this.integral += error * deltaTime;
        const derivative = (error - this.prevError) / deltaTime;

        const output = this.Kp * error + this.Ki * this.integral + this.Kd * derivative;

        this.prevError = error;

        return output;
    }
}