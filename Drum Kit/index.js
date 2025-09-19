var buttons = document.getElementsByClassName("drum");

for (i = 0; i < buttons.length; i++) {
  document
    .getElementsByClassName("drum")
    [i].addEventListener("click", function () {
      sound(this.innerHTML);
      pressedAnimation(this.innerHTML);
    });
}

document.addEventListener("keydown", function (event) {
  sound(event.key);
  pressedAnimation(event.key);
});

function sound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("./sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("./sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("./sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("./sounds/snare.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("./sounds/crash.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("./sounds/kick-bass.mp3");
      audio.play();
      break;

    default:
      break;
  }
}

function pressedAnimation(button) {
  var button = document.querySelector("." + button);
  
  button.classList.add("pressed");

  setTimeout(function () {
    button.classList.remove("pressed");
  }, 300);
}
