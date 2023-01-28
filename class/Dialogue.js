"use es6";

import { frameRate } from "../constants.js";

const Dialogue = class {
  constructor({ text, actor, fontSize = 35 }) {
    this.text = text;
    this.actor = actor;
    this.currentTextPosition = 0;
    this.printingSpeed = 0.1 * frameRate;
    this.currentPrintingAnimationFrame = 0;
    this.currentTransform = 0;
    this.maxTransform = 0.01;
    this.transformAnimationLength = 1.2 * frameRate;
    this.currentTransformAnimationFrame = 0;
    this.currentTransformDirection = 1;
    this.nextDialogueCursor = false;
    this.fontSize = fontSize;
  }

  skipDialogue() {
    this.currentTextPosition = this.text.length - 1;
    this.nextDialogueCursor = true;
  }

  printNextLetter() {
    this.currentPrintingAnimationFrame++;
    if (
      this.currentPrintingAnimationFrame > this.printingSpeed &&
      this.currentTextPosition < this.text.length
    ) {
      this.currentTextPosition++;
      this.currentPrintingAnimationFrame = 0;
    }

    if (this.currentTextPosition >= this.text.length) {
      this.nextDialogueCursor = true;
    }
  }

  updateAnimationTransform() {
    this.currentTransformAnimationFrame += this.currentTransformDirection;
    if (
      Math.abs(this.currentTransformAnimationFrame) >=
      this.transformAnimationLength
    ) {
      this.currentTransformDirection = -this.currentTransformDirection;
    }

    this.currentTransform =
      (this.currentTransformAnimationFrame / this.transformAnimationLength) *
      this.maxTransform;
  }

  update() {
    this.printNextLetter();
    this.updateAnimationTransform();
  }
};

export default Dialogue;
