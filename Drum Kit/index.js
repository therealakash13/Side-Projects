var buttons = document.getElementsByClassName("drum");

for (i = 0; i < buttons.length; i++) {
  document.getElementsByClassName("drum")[i].addEventListener("click", clickHandler);
}

function clickHandler() {
  alert("A button is clicked");
}
