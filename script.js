const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const display = document.querySelector("[data-new-operand]");
const prevDisplay = document.querySelector("[data-prev-operand]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equal]");
const decimalBtn = document.querySelector("[data-decimal]");
let equalPressed = false;
let operatorClicked = false;

function updateDisplay(input) {
   display.innerText += input;
}

numbers.forEach((number) => {
   number.addEventListener("click", () => {
      operatorClicked = false;
      if (equalPressed) {
         clear();
         equalPressed = false;
         updateDisplay(number.innerText);
      } else {
         updateDisplay(number.innerText);
      }
   });
});

clearBtn.addEventListener("click", clear);

function operatorClickEvent(operator) {
   let prevInput = prevDisplay.innerText;
   if (prevInput == "") {
      if (display.innerText !== "") {
         prevDisplay.innerText = display.innerText + operator;
         display.innerText = "";
         operatorClicked = true;
      }
      equalPressed = false;
      return;
   } else {
      operatorClicked = true;
      const prevNum = [...prevInput];
      if (operatorClicked) {
         if (display.innerText == "") {
            prevNum[prevNum.length - 1] = operator;
            prevDisplay.innerText = prevNum.join("");
            display.innerText = "";
         } else {
            const computedValue = eval(prevInput + display.innerText);
            prevDisplay.innerText = computedValue + " " + operator;
            display.innerText = "";
         }
      }
   }
}

function deleteNum() {
   if (display.innerText !== "") {
      const oldValue = display.innerText;
      const numbersArr = [...oldValue];
      numbersArr.pop();
      const newValue = numbersArr.join("");
      display.innerText = newValue;
   }
}

operators.forEach((operator) => {
   operator.addEventListener("click", () =>
      operatorClickEvent(operator.innerText)
   );
});

deleteBtn.addEventListener("click", deleteNum);

equalBtn.addEventListener("click", () => {
   operatorClicked = false;
   const prevNum = prevDisplay.innerText;
   const newNum = display.innerText;
   if (newNum && prevNum !== "") {
      display.innerText = eval(prevNum + newNum);
      prevDisplay.innerText = "";
      equalPressed = true;
   }
});

function clear() {
   display.textContent = "";
   prevDisplay.textContent = "";
}

decimalBtn.addEventListener("click", () => {
   const input = display.innerText;
   if ([...input].includes(".") || display.innerText == "") {
      return;
   } else {
      updateDisplay(".");
   }
});
