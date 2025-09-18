var randomNum1 = 0;
var randomNum2 = 0;

function generateRandomNum() {
  var newNum = Math.floor(Math.random() * 6) + 1;
  return newNum;
}

function rollIt() {
  randomNum1 = generateRandomNum();
  randomNum2 = generateRandomNum();
  document.getElementsByClassName(
    "img1"
  )[0].src = `./images/dice${randomNum1}.png`;
  document.getElementsByClassName(
    "img2"
  )[0].src = `./images/dice${randomNum2}.png`;
  document.getElementsByClassName("dice_container")[0].style.display = "flex";
  
  let instruction = document.getElementById("instruction");

  if (randomNum1 > randomNum2) {
    instruction.textContent = "🚩 Player 1 Wins!";
  } else if (randomNum2 > randomNum1) {
    instruction.textContent = "Player 2 Wins! 🚩";
  } else {
    instruction.textContent = "Draw! 🎲";
  }
}
