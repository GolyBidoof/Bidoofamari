"use es6";

import { frameRate } from "../constants.js";

const Sprite = class {
  constructor({ imageUrls, sizeX = 16, sizeY = 16, defaultScale = 2 }) {
    this.animationSpeed = 0.5 * frameRate;
    this.rotationAnimationSpeed = 0.0005 * frameRate;
    this.currentTimerFrame = 0;
    this.currentFrame = 0;
    this.frameCount = imageUrls.length;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.currentRotationAngle = 0;
    this.spriteReady = false;
    this.framesReady = [];
    this.frames = [];
    this.defaultScale = defaultScale;
    imageUrls.forEach((imageUrl) => {
      const image = new Image();
      image.src = imageUrl;
      image.onload = this.flipFrameReady.bind(this, this.frames.length);
      this.frames.push(image);
      this.framesReady.push(false);
    });
  }

  flipFrameReady(currentId) {
    this.framesReady[currentId] = true;
    if (!this.framesReady.some((val) => val === false)) {
      this.spriteReady = true;
    }
  }

  updateFrame() {
    this.currentTimerFrame++;
    if (this.currentTimerFrame > this.animationSpeed) {
      this.currentTimerFrame = 0;
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }
    debugger;
    this.currentRotationAngle =
      (this.currentRotationAngle + this.rotationAnimationSpeed) % 360;
  }
};

export default Sprite;
