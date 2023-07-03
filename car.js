class Car {
    constructor(x, speed, carWidth, carHeight) {
        this.x = x;
        this.width = carWidth;
        this.height = carHeight;
        this.y = height - carHeight - 40;
        this.angle = 0;
        this.targetAngle = 0;
        this.PID = new PIDController(0.1, 0.01, 0.01);
        this.lane = 0;
        this.speed = speed;

        this.lookahead = 100;
    }

    changePid(Kp, Ki, Kd) {
        this.PID.setKp(Kp);
        this.PID.setKi(Ki);
        this.PID.setKd(Kd);
    }

    setSpeed(speed) {
        this.speed = speed;
        this.lookahead = this.height * speed / 6;
    }

    setLane(laneX) {
        this.lane = laneX;
    }

    update() {
        // use the pid controller to turn the car to the center of the lane
        // remember angles are measured from the y axis
        const targetAngle = -atan2(this.lookahead, this.lane - this.x);
        const currentAngle = atan2(sin(this.angle), cos(this.angle)) - PI / 2;
        stroke(0, 255, 0);
        line(this.x, this.y, this.lane, this.y - this.lookahead);
        stroke(255, 255, 0);
        line(this.x, this.y, this.x + cos(currentAngle) * this.height * 2, this.y + sin(currentAngle) * this.height * 2);
        let fps = frameRate();
        if (fps == 0) {
            fps = 60;
        }
        const turn = this.PID.calculate(currentAngle, targetAngle, 1 / fps);

        this.targetAngle += turn;
        this.angle += (this.targetAngle - this.angle) * 0.1;
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
        rect(0, 0, this.width, this.height);
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

    setKp(Kp) {
        this.Kp = Kp;
    }

    setKi(Ki) {
        this.Ki = Ki;
    }

    setKd(Kd) {
        this.Kd = Kd;
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