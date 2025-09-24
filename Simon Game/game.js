var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + (level + 1));

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  level++;
}

function playSound(name) {
  var file = "./sounds/" + name + ".mp3";
  var audio = new Audio(file);
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(() => {
    $("." + currentColour).removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Space to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(function () {
  $(document).keypress(function (event) {
    if (!started && event.code === "Space") {
      nextSequence();
      started = true;
    }
  });

  $(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
});
