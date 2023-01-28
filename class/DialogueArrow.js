"use es6";

import { frameRate } from "../constants.js";

const DialogueArrow = class {
  constructor() {
    this.defaultX = 1100;
    this.defaultY = 125;
    this.currentX = this.defaultX;
    this.currentY = this.defaultY;
    this.currentAnimationFrame = 0;
    this.totalAnimationFrames = 5;
    this.arrowFrameRate = 5;
    this.stepsSinceLastAnimationSkip = 0;
    this.changeOfYOnStep = 5;
  }

  advanceFrame() {
    this.stepsSinceLastAnimationSkip++;
    if (this.stepsSinceLastAnimationSkip > frameRate / this.arrowFrameRate) {
      this.currentY =
        this.defaultY + this.currentAnimationFrame + this.changeOfYOnStep;
      this.stepsSinceLastAnimationSkip = 0;
      this.currentAnimationFrame =
        (this.currentAnimationFrame + 1) % this.totalAnimationFrames;
    }
  }
};

export default DialogueArrow;
