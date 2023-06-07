const DPI = 300;
const paperWidth = 147;
const paperHeight = 105;

const margin = 50;

const message = "This is a super secret message encoded onto a postcard meet me at the clock tower at six on the fith";

const setTextSize = 40;

const FOLD = true;

function setup() {
  createCanvas((paperWidth * DPI) / 25.4, (paperHeight * DPI) / 25.4, SVG);

  textFont("Courier New");
  textStyle(BOLD);
  textAlign(LEFT, BASELINE);

  splitMessage = message.toLowerCase().split(" ");
}

function draw() {
  background("lightblue");

  textSize(setTextSize);

  let { outputWords, gratePositions } = getWordsToDisplay(splitMessage);
  console.log(outputWords);
  console.log(gratePositions);

  let widthOfChar = setTextSize * 0.601;
  let lineHeight = setTextSize;
  let currentLineY = margin + lineHeight;
  let lineX = margin;

  // Drawing the text
  for (let line of outputWords) {
    let currentLineX = lineX;
    for (let word of line) {
      text(word, currentLineX, currentLineY);
      currentLineX += word.length * widthOfChar;
    }
    currentLineY += lineHeight;
  }

  // Drawing the rectangles
  rectMode(CENTER);
  noFill();
  strokeWeight(3);
  for (let line of gratePositions) {
    for (let box of line) {
      rect(...box);
    }
  }

  rectMode(CORNER);
  // Drawing vertical divide line
  line(width * (83 / paperWidth), margin, width * (83 / paperWidth), height - margin);

  // Drawing address lines
  let currentHeight = height * (49 / paperHeight);
  let lineSpacing = height * (10 / paperHeight);
  let lineLength = width * (54 / paperWidth);
  for (let i = 0; i < 6; i++) {
    line(width - margin - lineLength, currentHeight, width - margin, currentHeight);
    currentHeight += lineSpacing;
  }

  // Drawing fold line
  // push();
  // stroke(100);
  // strokeWeight(1);
  // setLineDash([15, 40]);
  // line(margin, height / 2, width - margin, height / 2);
  // pop();

  // Drawing stamp location
  setLineDash([15, 15]);
  rect(width - width * (21 / paperWidth) - margin, margin, width * (21 / paperWidth), height * (24 / paperHeight));
  noLoop();
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function getWordsToDisplay(mssg) {
  let widthOfChar = setTextSize * 0.601;
  let lineHeight = setTextSize;

  let numLines = floor((height / 2 - margin * 2) / lineHeight);
  let lineWidth = width * (83 / paperWidth) - 2 * margin;

  let wordsPerLine = ceil(mssg.length / numLines);
  let charsPerLine = lineWidth / widthOfChar;

  let currentLineY = margin + lineHeight / 2;

  let outputWords = [];
  let gratePositions = [];

  // For each line generate the words including the message
  for (let i = 0; i < numLines; i++) {
    let thisLineMsgWords = [];
    let theseGratePositions = [];

    // Get as many words in this line as possible up to - wordsPerLine
    for (let k = 0; k < wordsPerLine; k++) {
      if (!mssg.length) break;
      thisLineMsgWords.push(mssg.shift());
    }

    // How many characters are reserved for the message
    let lenofMessageWords = thisLineMsgWords.join("").length;

    let fillerWords = [];

    // How many characters need to be filled with filler words
    let charsToBeFilled = charsPerLine - lenofMessageWords;

    let tries = 0;

    while (charsToBeFilled > 0) {
      let thisWord = random(popWords);
      if (thisWord.length < charsToBeFilled) {
        fillerWords.push(thisWord);
        charsToBeFilled -= thisWord.length;
      } else {
        if (tries > 2) {
          // Try 4 times to find a word that fits on the line
          break;
        } else {
          tries++;
        }
      }
    }

    console.log(fillerWords);

    // Insert message words for this line into fillerWords
    let startIndex = 0;
    for (let i = 0; i < thisLineMsgWords.length; i++) {
      let word = thisLineMsgWords[i];
      let index = random(startIndex, fillerWords.length - (thisLineMsgWords.length - i)); // Pick random index between last word and the end making sure to leave room for rest of words
      fillerWords.splice(index, 0, word);
      startIndex = index + 2; // Leave at least one word between message words

      let charsToLeft = fillerWords.slice(0, index).join("").length;
      let yPos;
      if (FOLD) {
        yPos = height - (currentLineY + lineHeight / 4); // Reflect around midline for folded postcard
      } else {
        yPos = currentLineY + lineHeight / 4; // Don't reflect
      }
      theseGratePositions.push([margin + charsToLeft * widthOfChar + (word.length * widthOfChar) / 2, yPos, word.length * widthOfChar, lineHeight - lineHeight / 4]);
    }

    currentLineY += lineHeight; // Go to next line
    gratePositions.push(theseGratePositions);
    outputWords.push(fillerWords);
  }

  return { outputWords, gratePositions };
}
