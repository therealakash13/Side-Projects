// Accordion toggle
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const tab = header.parentElement;
    const content = tab.querySelector(".accordion-content");

    // close others
    document.querySelectorAll(".accordion-content").forEach((c) => {
      if (c !== content) {
        c.classList.remove("open");
      }
    });
    document.querySelectorAll(".accordion .tab").forEach((t) => {
      if (t !== tab) {
        t.classList.remove("active");
      }
    });

    // toggle clicked
    content.classList.toggle("open");
    tab.classList.toggle("active");
  });
});

document.getElementById("getOpRes").addEventListener("click", operation);

// Calculator functions
function remainingTimeCalculator() {
  var age = document.getElementById("age").value;
  if (age > 90) {
    document.querySelector("#result").innerHTML = "Age can't exceed 90";
  } else if (age < 5) {
    document.querySelector("#result").innerHTML = "Go study bro !";
  } else if (age < 0) {
    document.querySelector("#result").innerHTML = "Age cant be zero !";
  } else {
    var years = 90 - age;
    var months = years * 12;
    var weeks = years * 52;
    var days = years * 365;
    document.querySelector("#result").innerHTML =
      "You have " +
      days +
      " days, " +
      weeks +
      " weeks, and " +
      months +
      " months left.";
  }
}

function bmiCalculator() {
  var height = document.getElementById("height").value;
  var weight = document.getElementById("weight").value;
  var bmi = Number(weight) / Number(height) ** 2; // Can use Math.pow(height,2)
  if (bmi < 18) {
    document.getElementById("bmiResult").innerHTML =
      Math.floor(bmi) + " 'Underweight ! You are cooked...' ";
  } else if (bmi >= 18 && bmi < 25) {
    document.getElementById("bmiResult").innerHTML =
      Math.floor(bmi) + " 'Normal ! Nice...' ";
  } else if (bmi >= 25 && bmi < 30) {
    document.getElementById("bmiResult").innerHTML =
      Math.floor(bmi) + " 'Overweight ! You cant let it slide...' ";
  } else if (bmi >= 30 && bmi < 35) {
    document.getElementById("bmiResult").innerHTML =
      Math.floor(bmi) + " 'Obese ! Do something about it bro...' ";
  } else if (bmi >= 35) {
    document.getElementById("bmiResult").innerHTML =
      Math.floor(bmi) + " 'Extremely Obese ! Max difficulty...' ";
  } else {
    document.getElementById("bmiResult").innerHTML = " 'Cant calculate !' ";
  }
}

function loveCalc() {
  n = 100;
  var num = Math.random();
  document.getElementById("loveResult").innerHTML =
    "Love Score: " + Math.floor(num * n + 1) + " %";
}

function checkLeapYear() {
  var year = document.getElementById("year").value;
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    document.getElementById("leapResult").innerText = `${year} is a Leap Year!`;
  } else {
    document.getElementById(
      "leapResult"
    ).innerText = `${year} is not a Leap Year!`;
  }
}

function runFizzBuzz() {
  const num = document.getElementById("fizzbuzzNum").value;
  let output = "";
  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0 && i % 5 === 0) output += "FizzBuzz, ";
    else if (i % 3 === 0) output += "Fizz, ";
    else if (i % 5 === 0) output += "Buzz, ";
    else output += i + ", ";
  }
  document.getElementById("fizzbuzzResult").innerText = output;
}

function genFibonacci() {
  const num = document.getElementById("fibNum").value;
  let n1 = 0,
    n2 = 1,
    result = "";
  for (let i = 1; i <= num; i++) {
    result += n1 + " ";
    [n1, n2] = [n2, n1 + n2];
  }
  document.getElementById("fibResult").innerText = result;
}

function operation() {
  var op1 = Number(document.getElementById("operand1").value);
  var op2 = Number(document.getElementById("operand2").value);
  var selectedElement = document.getElementById("operation");
  var index = selectedElement.selectedIndex;
  var optionc = selectedElement.options[index];
  var res = 0;
  if (isNaN(op1) || isNaN(op2) || optionc.value === "none") {
    document.getElementById("opResult").innerHTML =
      "Please enter two number and select an operation !";
  } else {
    switch (optionc.value) {
      case "add":
        res = op1 + op2;
        break;
      case "sub":
        res = op1 - op2;
        break;
      case "prod":
        res = op1 * op2;
        break;
      case "div":
        op2 === 0
          ? (document.getElementById("opResult").innerHTML =
              "Cant perform this operation !")
          : (res = op1 / op2);
        break;
      default:
        document.getElementById("opResult").innerHTML =
          "Cant perform this operation !";
        break;
    }
    document.getElementById(
      "opResult"
    ).innerHTML = `Result is ${res}`;
  }
}
