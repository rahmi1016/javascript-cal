//THE TOGGLE THEMES PART
var dots = document.getElementsByClassName("toggleDot");
var arr = [...dots];
var body = document.querySelector("body");

//toggle button and class container
arr.forEach((element) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";
    arr
      .filter(function (item) {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
        if (element.classList.contains("one")) {
          body.className = "theme-1";
        }
        if (element.classList.contains("two")) {
          body.className = "theme-2";
        }
        if (element.classList.contains("three")) {
          body.className = "theme-3";
        }
      });
  });
});

//prefers-color-scheme
const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const runColorMode = (fn) => {
  if (!window.matchMedia) {
    body.className = "theme-3";
    document.querySelector("span.one").style.opacity = "1";
    document.querySelector("span.two").style.opacity = "0";
    document.querySelector("span.three").style.opacity = "0";
  }
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  fn(query.matches);
  query.addEventListener("change", (event) => fn(event.matches));
};

runColorMode((isDarkMode) => {
  if (!isDarkMode) {
    body.className = "theme-2";
    document.querySelector("span.one").style.opacity = "0";
    document.querySelector("span.two").style.opacity = "1";
    document.querySelector("span.three").style.opacity = "0";
  } else if (isDarkMode) {
    body.className = "theme-3";
    document.querySelector("span.one").style.opacity = "0";
    document.querySelector("span.two").style.opacity = "0";
    document.querySelector("span.three").style.opacity = "1";
  }
});

//THE CALCULATOR PARTS
//REGEX
const isOperator = /[*/+-]/;
const endWithOperator = /[*/+-]$/;
const endWithMinus = /\-$/;

let firstNum = true;
let evaluated = false;

//Numbers
function numberInput(number) {
  let screenDisplay = document.getElementById("screen");
  let historyDisplay = document.getElementById("history");

  //number button clicked as a first number
  if (firstNum) {
    if (number === 0) {
      return;
    } else {
      screenDisplay.innerText = number;
      historyDisplay.innerText = number;
      firstNum = false;
    }
  }
  //not as first number
  else {
    if (evaluated) {
      //the clicked number is a zero
      if (number === 0) {
        screenDisplay.innerText = number;
        historyDisplay.innerText = number;
        evaluated = false;
      }
      // the clicked number other than zero
      else {
        screenDisplay.innerText = number;
        historyDisplay.innerText = number;
        evaluated = false;
      }
    } else {
      //if the length of history display is more than 15
      if (screenDisplay.innerText.length > 15) {
        return;
      }
      //if the last clicked button is number
      if (!isOperator.test(historyDisplay.innerText.slice(-1))) {
        screenDisplay.innerText += number;
        historyDisplay.innerText += number;
        firstNum = false;
      }

      ////if the last clicked button is an operator
      else {
        //if the last button clicked is "-"
        if (endWithMinus.test(historyDisplay.innerText)) {
          if (historyDisplay.innerText.length == 1 && number == 0) {
            return;
          } else {
            screenDisplay.innerText += number;
            historyDisplay.innerText += number;
          }
        }
        //if the last button clicked is other than "-"
        else {
          screenDisplay.innerText = number;
          historyDisplay.innerText += number;
        }
      }
    }
  }
}

//Operator
function operatorInput(ops) {
  const screenDisplay = document.getElementById("screen");
  const historyDisplay = document.getElementById("history");

  if (firstNum) {
    //if the the first number is a "-" sign
    if (ops === "-") {
      screenDisplay.innerText = ops;
      historyDisplay.innerText = ops;
      firstNum = false;
    }
    //if other operators then return
    else {
      return;
    }
  }
  //not the first clicked button
  else {
    // if the last clicked button is a number
    if (!isOperator.test(historyDisplay.innerText.slice(-1))) {
      if (evaluated) {
        historyDisplay.innerText = screenDisplay.innerText;
        if ((ops == "+") | (ops == "-")) {
          screenDisplay.innerText = ops;
          historyDisplay.innerText += ops;
        }
        if (ops == "*") {
          screenDisplay.innerText = "×";
          historyDisplay.innerText += ops;
        }
        if (ops == "/") {
          screenDisplay.innerText = "÷";
          historyDisplay.innerText += ops;
        }
        evaluated = false;
      } else {
        if ((ops == "+") | (ops == "-")) {
          screenDisplay.innerText = ops;
          historyDisplay.innerText += ops;
        }
        if (ops == "*") {
          screenDisplay.innerText = "×";
          historyDisplay.innerText += ops;
        }
        if (ops == "/") {
          screenDisplay.innerText = "÷";
          historyDisplay.innerText += ops;
        }
      }
    }
    // if the last clicked button is an operator
    else {
      if (ops == "-") {
        screenDisplay.innerText = ops;
        historyDisplay.innerText += ops;
      } else {
        return;
      }
    }
  }
}

//Decimal
function decimalInput(dot) {
  const screenDisplay = document.getElementById("screen");
  const historyDisplay = document.getElementById("history");

  if (firstNum) {
    screenDisplay.innerText = "0" + dot;
    historyDisplay.innerText = "0" + dot;
    firstNum = false;
  }
  //Not as first number
  else {
    if (evaluated) {
      return;
    } else {
      //if the first button clicked is a "-" sign
      if (historyDisplay.innerText == "-") {
        screenDisplay.innerText = "-0" + dot;
        historyDisplay.innerText = "-0" + dot;
      }
      //if the last button clicked is an operator
      if (isOperator.test(historyDisplay.innerText.slice(-1))) {
        screenDisplay.innerText = "0" + dot;
        historyDisplay.innerText += "0" + dot;
      }
      //if the last button is a number
      if (!isOperator.test(historyDisplay.innerText.slice(-1))) {
        //if the screen display contain dot
        if (screenDisplay.innerText.includes(dot)) {
          return;
        } else {
          screenDisplay.innerText += dot;
          historyDisplay.innerText += dot;
        }
      }
    }
  }
}

//Reset
function resetOp() {
  const screenDisplay = document.getElementById("screen");
  const historyDisplay = document.getElementById("history");
  screenDisplay.innerText = "";
  historyDisplay.innerText = "";
  firstNum = true;
  evaluated = false;
}

//Backspace
function backspaceOp() {
  const screenDisplay = document.getElementById("screen");
  const historyDisplay = document.getElementById("history");

  if (firstNum) {
    return;
  } else {
    let screen = screenDisplay.innerText;
    let history = historyDisplay.innerText;
    screenDisplay.innerText = screen.slice(0, -1);
    historyDisplay.innerText = history.slice(0, -1);
  }
}

//Result
function equalOp(equal) {
  const screenDisplay = document.getElementById("screen");
  const historyDisplay = document.getElementById("history");

  if (firstNum) {
    return;
  } else {
    let expression = historyDisplay.innerText;
    let answer = (eval(expression) * 1000000000000) / 1000000000000;
    answer = parseFloat(answer.toFixed(10));
    var strAnswer = answer.toString();
    if (strAnswer.length > 16) {
      answer = answer.toExponential(10);
    } else {
      answer = answer;
    }
    screenDisplay.innerText = answer;
    historyDisplay.innerText += equal + answer;
    evaluated = true;
  }
}

//Activate buttons on keyboards
document.addEventListener("keydown", keyPressed);

//function to give keyboard keys value to calculator
function keyPressed(e) {
  e.preventDefault();
  var equal = document.getElementById("equal").value;
  var dot = document.getElementById("dot").value;

  var isNumber = isFinite(e.key);

  if (e.key == "Delete") {
    resetOp();
    return;
  }

  if (e.key == "Enter") {
    equalOp(equal);
  }

  if (e.key == ".") {
    decimalInput(dot);
  }

  if (e.key == "Backspace") {
    backspaceOp();
  }

  if (isNumber) {
    numberInput(e.key);
  }

  if (isOperator.test(e.key)) {
    operatorInput(e.key);
  }
}

document.addEventListener("keydown", function (event) {
  event.preventDefault();
  if (event.ctrlKey && event.key === "v") {
    navigator.clipboard
      .readText()
      .then((text) => {
        var isNumber = isFinite(text);
        if (isNumber) {
          var copy_number = text;
          firstNum = true;
          numberInput(copy_number);
        }
      })
      .catch((err) => {
        console.error("Failed to read clipboard content:", err);
      });
  }
  if (event.ctrlKey && event.key === "c") {
    screenDisplay = document.getElementById("screen");
    navigator.clipboard.writeText(screenDisplay.innerText);
  }
});
