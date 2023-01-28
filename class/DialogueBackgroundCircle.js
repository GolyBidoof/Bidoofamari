"use es6";

import { frameRate } from "../constants.js";

const DialogueBackgroundCircle = class {
  constructor(defaultX, defaultY) {
    this.defaultX = defaultX;
    this.defaultY = defaultY;
    this.defaultRotation = 0;
    this.destinationX = defaultX;
    this.destinationY = defaultY;
    this.destinationRotation = 0;
    this.distanceX = 0;
    this.distanceY = 0;
    this.distanceRotation;
    this.currentPathFrame = 0;
    this.maxPathFrame = 0;
    this.speed = 3;
    this.randomnessCoefficient = 10;

    this.rotationDirection =
      Math.ceil(Math.random()) * (Math.round(Math.random()) ? 1 : -1);

    this.currentX =
      this.defaultX +
      Math.ceil(Math.random() * this.randomnessCoefficient) *
        (Math.round(Math.random()) ? 1 : -1);
    this.currentY =
      this.defaultY +
      Math.ceil(Math.random() * this.randomnessCoefficient) *
        (Math.round(Math.random()) ? 1 : -1);
    this.currentRotation =
      this.defaultRotation +
      Math.ceil(Math.random() * this.rotationDirection) *
        (Math.round(Math.random()) ? 1 : -1);
  }

  shouldCalculatePath() {
    if (this.currentPathFrame >= this.maxPathFrame) {
      return true;
    }
    return false;
  }

  calculateNewPath() {
    this.currentPathFrame = 0;

    this.destinationX =
      this.defaultX +
      Math.ceil(Math.random() * this.randomnessCoefficient) *
        (Math.round(Math.random()) ? 1 : -1);
    this.destinationY =
      this.defaultY +
      Math.ceil(Math.random() * this.randomnessCoefficient) *
        (Math.round(Math.random()) ? 1 : -1);

    this.distanceX = this.destinationX - this.currentX;
    this.distanceY = this.destinationY - this.currentY;
    this.rotationDirection =
      Math.ceil(Math.random()) * (Math.round(Math.random()) ? 1 : -1);

    this.maxPathFrame =
      (Math.sqrt(Math.pow(this.distanceX, 2) + Math.pow(this.distanceY, 2)) /
        this.speed) *
      frameRate;
  }

  advanceFrame() {
    if (this.shouldCalculatePath()) {
      this.calculateNewPath();
    }

    this.currentX = this.currentX + (this.distanceX * 1) / this.maxPathFrame;
    this.currentY = this.currentY + (this.distanceY * 1) / this.maxPathFrame;
    this.currentRotation =
      this.currentRotation +
      ((this.speed * 1000) / frameRate) *
        (this.rotationDirection > 0 ? Math.PI / 10000 : -Math.PI / 10000);
    this.currentPathFrame++;
  }
};

export default DialogueBackgroundCircle;
