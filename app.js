"use strict";

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let conatiner = document.querySelector(".msg-container");
let newGame = document.querySelector("#new-btn");
let msg = document.querySelector(".msg");
let count = 0;
let checkVal = true;
//

let turnO = true; // player X , player O
//
// Winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count = count + 1;

    if (turnO) {
      box.style.color = "#03346E";
      box.textContent = "X";
      turnO = false;
    } else {
      box.style.color = "#387F39";
      box.textContent = "O";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    if (count === 9 && checkVal) {
      checkDraw();
    }
  });
});
//
// disable all Boxes
const disableBoxes = () => {
  for (let i of boxes) {
    i.disabled = true;
  }
};

///
//check for winner
//
const showWinner = (winner) => {
  msg.innerText = `Congratutalitions, winner is ${winner}`;
  conatiner.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  for (let patterns of winPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;

    let pos2val = boxes[patterns[1]].innerText;

    let pos3val = boxes[patterns[2]].innerText;

    //
    // check if the box is not empty
    if (pos1Val != "" && pos2val != "" && pos3val != "") {
      if (pos1Val === pos2val && pos2val === pos3val) {
        showWinner(pos1Val);
        checkVal = false;
      }
    }
  }
};
//
//Enable boxes Function
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.textContent = "";
  }
};
//Chnage winner message
const closeWinner = () => {
  conatiner.classList.add("hide");
};

//
//
// NewGame the game
const resetGame = function () {
  turnO = true;
  count = 0;
  checkVal = true;
  enableBoxes();
  closeWinner();
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
//
// Check for draw condition
const checkDraw = () => {
  conatiner.classList.remove("hide");
  msg.textContent = "Game over, Start the new game!";
};
