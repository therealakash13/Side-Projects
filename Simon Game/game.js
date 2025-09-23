var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColour;
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    if(level > 0){
        $("#level-title").text(`Level ${level}`)
    }
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(`./sounds/${randomChosenColour}.mp3`);
  $(`#${randomChosenColour}`).fadeOut(200).fadeIn(200);
  console.log(gamePattern);
  check(level)  
}

function playSound(name) {
  const audio = new Audio(name);
  audio.play();
}

$(".btn").on("click", function () {
  userClickedPattern.push(this.id);
  $(`.${this.id}`)
    .addClass("pressed")
    .fadeOut(100)
    .fadeIn(100)
    .removeClass("pressed");
  playSound(`./sounds/${this.id}.mp3`);
  console.log(userClickedPattern);
  check();
});

function check(level){
    if(gamePattern[gamePattern.length-1] === userClickedPattern[userClickedPattern.length-1]){
        level++
    }
}

$(function () {
  $(document).on("keypress", function (event) {
    if (event.code === "Space") {   
      nextSequence();
    }
  });
});
