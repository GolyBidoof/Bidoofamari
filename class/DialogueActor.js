"use es6";

import { frameRate } from "../constants.js";

const DialogueActor = class {
  constructor(name, imageUrl) {
    this.name = name;
    this.imageReady = false;
    const image = new Image();
    this.image = image;
    this.image.src = imageUrl;
    this.image.onload = this.flipImageReady.bind(this);
    this.animationFrame = 0;
    this.animationDirection = 1;
    this.maxAnimationFrame = 0.8 * frameRate;
    this.currentXAngle = 0;
    this.currentSquish = 0;
    this.rotationSize = 3;
    this.squishSize = 1;
  }

  advanceAnimationFrame() {
    this.animationFrame += this.animationDirection;
    this.currentXAngle =
      this.rotationSize * (this.animationFrame / this.maxAnimationFrame);
    this.currentSquish =
      this.squishSize * (this.animationFrame / this.maxAnimationFrame);

    if (
      this.animationFrame > this.maxAnimationFrame ||
      this.animationFrame < -this.maxAnimationFrame
    ) {
      this.animationDirection = -this.animationDirection;
    }
  }

  flipImageReady() {
    this.imageReady = true;
  }
};

export default DialogueActor;
