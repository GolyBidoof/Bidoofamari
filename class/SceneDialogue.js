"use es6";

import { buttonAudio } from "../constants.js";

const SceneDialogue = class {
  constructor(dialogueList, dialogueArrow) {
    this.dialogueList = dialogueList;
    this.dialogueArrow = dialogueArrow;
    this.currentDialogue = 0;
  }

  advanceDialogue() {
    if (this.currentDialogue < this.dialogueList.length - 1) {
      this.currentDialogue++;
      buttonAudio.currentTime = 0.25;
      buttonAudio.play();
    }
  }
};

export default SceneDialogue;
