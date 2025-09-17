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

// Calculator functions
function calcRemaining() {
  const target = new Date(document.getElementById("targetDate").value);
  const now = new Date();
  const diff = target - now;
  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("result").innerText = `${days} days remaining`;
  } else {
    document.getElementById("result").innerText = "Date has passed!";
  }
}

function calcBMI() {
  const h = document.getElementById("height").value / 100;
  const w = document.getElementById("weight").value;
  if (h && w) {
    const bmi = (w / (h * h)).toFixed(2);
    document.getElementById("bmiResult").innerText = `Your BMI is ${bmi}`;
  }
}

function checkLeap() {
  const year = document.getElementById("year").value;
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
    if (i % 3 === 0 && i % 5 === 0) output += "FizzBuzz ";
    else if (i % 3 === 0) output += "Fizz ";
    else if (i % 5 === 0) output += "Buzz ";
    else output += i + " ";
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
