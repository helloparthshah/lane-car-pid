class Road {
    constructor(nLanes, speed) {
        this.nLanes = nLanes;
        this.phase = 0;
        this.speed = speed;
        this.currentLane = 0;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    getLaneWidth() {
        return width / this.nLanes;
    }

    getLaneX() {
        return this.currentLane * width / this.nLanes + width / this.nLanes / 2;
    }

    setLane(x) {
        // set lane number using the x coordinate
        this.currentLane = floor(x / (width / this.nLanes));
    }

    update() {
        this.phase += this.speed;
    }

    draw() {
        let laneWidth = width / this.nLanes;
        for (let i = 0; i < this.nLanes; i++) {
            strokeWeight(1);
            stroke(255);
            line(i * laneWidth, 0, i * laneWidth, height);
            let nSections = 15;
            for (let j = this.phase % (height / nSections); j < height; j += (height / nSections)) {
                if (i == this.currentLane) {
                    stroke(0, 0, 255);
                } else {
                    stroke(255);
                }
                strokeWeight(3);
                line(i * laneWidth + laneWidth / 2, j, i * laneWidth + laneWidth / 2, j + (height / nSections / 2));
            }
        }
        this.update();
    }
}