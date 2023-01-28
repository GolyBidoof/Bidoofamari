"use es6";

import Dialogue from "./class/Dialogue.js";
import DialogueArrow from "./class/DialogueArrow.js";
import DialogueBackgroundCircle from "./class/DialogueBackgroundCircle.js";
import SceneDialogue from "./class/SceneDialogue.js";
import DialogueActor from "./class/DialogueActor.js";
import { frameRate } from "./constants.js";
import BackgroundTile from "./class/BackgroundTile.js";
import Sprite from "./class/Sprite.js";

let contexts;
let previousDelta = 0;

const circles = [];

for (let i = 100; i < 1280 - 80; i += 50) {
  circles.push(new DialogueBackgroundCircle(i, 100));
}

const QueSeraSeraLyrics = [
  { text: "I know you love me" },
  { text: "I wanna wad you up into my life" },
  { text: "Let's roll up to be a single star in the sky" },
  { text: "I hear you calling me" },
  { text: "I wanna wad you up into my life" },
  { text: "Let's lump up to make a single star in the sky" },
  { text: "To you, to you", fontSize: 50 },
  { text: "I'm so in love with you" },
  { text: "I wanna wad you up into my life" },
  { text: "Let's roll up to be a single star in the sky" },
  { text: "I need you to feel me" },
  { text: "I wanna wad you up into my life" },
  { text: "Let's lump up to make a single star in the sky" },
  { text: "To you…", fontSize: 50 },
  { text: "I know you love me" },
  { text: "I wanna wad you up into my life" },
  { text: "Let's roll up to be a single star in the sky" },
  { text: "I hear you calling me" },
  { text: "I wanna wad you up into my life" },
  { text: "Let's lump up to make a single star in the sky" },
  { text: "To you, oh to you", fontSize: 45 },
  { text: "Yes to you", fontSize: 60 },
];

const floshedActor = new DialogueActor("floshed", "floshed_emoji.png");

const QueSeraSera = QueSeraSeraLyrics.map(
  (line) =>
    new Dialogue({
      text: line.text,
      actor: floshedActor,
      fontSize: line.fontSize,
    })
);
const dialogueArrow = new DialogueArrow();
const sceneDialogues = new SceneDialogue(QueSeraSera, dialogueArrow);
const grassTileMiddle = new BackgroundTile({
  imageUrl: "./tiles/grass-verdantgreen.png",
  startX: 32,
  startY: 0,
});
const dirtTileMiddle = new BackgroundTile({
  imageUrl: "./tiles/grass-verdantgreen.png",
  startX: 32,
  startY: 32,
});
const backgroundSky = new BackgroundTile({
  imageUrl: "./tiles/background-cania.png",
  sizeX: 1024,
  sizeY: 768,
  defaultScale: 1,
});

const bidoof = new Sprite({
  imageUrls: ["./sprites/bidoof.png", "./sprites/bidoof2.png"],
  sizeX: 20,
  sizeY: 15,
});

const drawBidoof = (ctx, xOffset, yOffset, rOffset) => {
  if (bidoof.spriteReady) {
    ctx.save();
    ctx.translate(1280 / 2, 500);
    ctx.rotate(bidoof.currentRotationAngle + rOffset);
    ctx.drawImage(
      bidoof.frames[bidoof.currentFrame],
      xOffset,
      yOffset,
      bidoof.defaultScale * bidoof.sizeX,
      bidoof.defaultScale * bidoof.sizeY
    );
    ctx.restore();
  }
};

const drawBackground = (ctx) => {
  if (backgroundSky.imageReady) {
    for (
      let i = 0;
      i < 1280 + backgroundSky.sizeX * backgroundSky.defaultScale;
      i += backgroundSky.sizeX * backgroundSky.defaultScale
    )
      ctx.drawImage(
        backgroundSky.image,
        i + backgroundSky.currentOffsetX,
        0,
        backgroundSky.sizeX * backgroundSky.defaultScale,
        backgroundSky.sizeY * backgroundSky.defaultScale
      );
  }
  backgroundSky.updateOffset();
};

const drawGrassTileMap = (ctx) => {
  for (
    let i = 0;
    i < 1280 + grassTileMiddle.sizeX * grassTileMiddle.defaultScale;
    i += 64
  ) {
    if (grassTileMiddle.imageReady && dirtTileMiddle.imageReady) {
      ctx.drawImage(
        grassTileMiddle.image,
        grassTileMiddle.startX,
        grassTileMiddle.startY,
        grassTileMiddle.sizeX,
        grassTileMiddle.sizeY,
        Math.round(i + grassTileMiddle.currentOffsetX),
        600,
        grassTileMiddle.sizeX * grassTileMiddle.defaultScale,
        grassTileMiddle.sizeY * grassTileMiddle.defaultScale
      );

      ctx.drawImage(
        dirtTileMiddle.image,
        dirtTileMiddle.startX,
        dirtTileMiddle.startY,
        dirtTileMiddle.sizeX,
        dirtTileMiddle.sizeY,
        Math.round(i + dirtTileMiddle.currentOffsetX),
        600 + grassTileMiddle.sizeX * grassTileMiddle.defaultScale,
        dirtTileMiddle.sizeX * dirtTileMiddle.defaultScale,
        dirtTileMiddle.sizeY * dirtTileMiddle.defaultScale
      );
    }
  }
  grassTileMiddle.updateOffset();
  dirtTileMiddle.updateOffset();
};

const drawCircles = (ctx) => {
  circles.forEach((circle) => {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.ellipse(
      circle.currentX,
      circle.currentY,
      90,
      100,
      circle.currentRotation,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
  });

  circles.forEach((circle) => {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.ellipse(
      circle.currentX,
      circle.currentY,
      90 - 10,
      100 - 10,
      circle.currentRotation,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
  });

  circles.forEach((circle) => {
    circle.advanceFrame();
  });
};
const drawDialogue = (ctx, dialogue) => {
  if (dialogue.actor.imageReady) {
    ctx.save();
    ctx.translate(120, 90);
    ctx.rotate((dialogue.actor.currentXAngle * Math.PI) / 180);
    ctx.drawImage(
      dialogue.actor.image,
      -50,
      -50,
      100 - dialogue.actor.currentSquish,
      100
    );
    ctx.restore();
    dialogue.actor.advanceAnimationFrame();
  }

  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.lineWidth = 1;
  ctx.font = "20px Jura";
  ctx.fillText(dialogue.actor.name, 250 - 30, 100 - 40);
  ctx.moveTo(250 - 30, 100 - 35);
  ctx.lineTo(250 - 30 + 200, 100 - 35);
  ctx.stroke();
  ctx.font = `${dialogue.fontSize}px Jura`;
  ctx.setTransform(1, dialogue.currentTransform, 0, 1, 0, 0);
  ctx.fillText(
    dialogue.text.substring(0, dialogue.currentTextPosition),
    250,
    100
  );
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.lineWidth = 1;
  dialogue.update();
};

const drawNextArrow = (ctx, dialogue) => {
  if (!dialogue.nextDialogueCursor) return;

  ctx.beginPath();

  ctx.moveTo(dialogueArrow.currentX - 5, dialogueArrow.currentY - 2);
  ctx.lineTo(dialogueArrow.currentX + 20, dialogueArrow.currentY + 27);
  ctx.lineTo(dialogueArrow.currentX + 45, dialogueArrow.currentY - 2);

  ctx.fillStyle = "green";
  ctx.fill();

  ctx.beginPath();

  ctx.moveTo(dialogueArrow.currentX, dialogueArrow.currentY);
  ctx.lineTo(dialogueArrow.currentX + 20, dialogueArrow.currentY + 25);
  ctx.lineTo(dialogueArrow.currentX + 40, dialogueArrow.currentY);

  ctx.fillStyle = "black";
  ctx.fill();

  dialogueArrow.advanceFrame();
};

const drawNextDialogue = (ctx, sceneDialogues) => {
  drawDialogue(
    ctx,
    sceneDialogues.dialogueList[sceneDialogues.currentDialogue]
  );
  drawNextArrow(
    ctx,
    sceneDialogues.dialogueList[sceneDialogues.currentDialogue]
  );
};

const BidoofKatamariParams = [];
for (let i = 0; i < 200; i++) {
  BidoofKatamariParams.push([
    Math.random() * 200 - 100,
    Math.random() * 200 - 100,
    Math.random() * 360,
  ]);
}

const drawCanvas = (currentDelta) => {
  requestAnimationFrame(drawCanvas);
  const delta = currentDelta - previousDelta;

  if (frameRate && delta < 1000 / frameRate) {
    return;
  }

  previousDelta = currentDelta;

  contexts.forEach((ctx) => {
    ctx.imageSmoothingEnabled = false;
    //invalidate
    ctx.clearRect(0, 0, 1280, 720);

    //background

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    drawBackground(ctx);
    BidoofKatamariParams.forEach(([x, y, r]) => {
      drawBidoof(ctx, x, y, r);
    });

    bidoof.updateFrame();

    drawGrassTileMap(ctx);

    //dialogue background
    drawCircles(ctx);

    //dialogue
    drawNextDialogue(ctx, sceneDialogues);
  });
};

const handleClick = () => {
  if (
    sceneDialogues.dialogueList[sceneDialogues.currentDialogue]
      .nextDialogueCursor
  )
    sceneDialogues.advanceDialogue();
  else
    sceneDialogues.dialogueList[sceneDialogues.currentDialogue].skipDialogue();
};

window.onload = () => {
  const canvas = document.getElementById("maincanvas");
  const secondaryCanvas = document.getElementById("secondarycanvas");

  canvas.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      handleClick();
    },
    false
  );

  contexts = [canvas.getContext("2d"), secondaryCanvas.getContext("2d")];

  WebFont.load({
    google: {
      families: ["Jura:400"],
    },
    active: function () {
      drawCanvas(0);
    },
  });
};
