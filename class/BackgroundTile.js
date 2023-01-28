"use es6";

import { frameRate } from "../constants.js";

const BackgroundTile = class {
  constructor({
    imageUrl,
    startX,
    startY,
    sizeX = 16,
    sizeY = 16,
    defaultScale = 4,
  }) {
    this.currentOffsetX = 0;
    this.currentOffsetY = 0;
    this.updateSpeed = 0.02 * frameRate;
    this.defaultScale = defaultScale;
    this.startX = startX;
    this.startY = startY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.imageReady = false;
    const image = new Image();
    this.image = image;
    this.image.src = imageUrl;
    this.image.onload = this.flipImageReady.bind(this);
  }

  flipImageReady() {
    this.imageReady = true;
  }

  updateOffset() {
    this.currentOffsetX =
      (this.currentOffsetX - this.updateSpeed) %
      (this.sizeX * this.defaultScale);
  }
};

export default BackgroundTile;
