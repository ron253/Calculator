class Calculator {
  constructor(curr, prev) {
    this.curr = curr;
    this.prev = prev;
    this.operator = " ";
    this.currOperand = " ";
    this.prevOperand = " ";
  }

  chooseOperation(operation) {
    if(this.currOperand === " " || this.operator !== " ") {
      return;
    }

    this.operator = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = " ";
  }


  appendNumber(button) {
    if(button === "." && this.curr.textContent.includes(".")) {
      return;
    }
    this.currOperand = this.currOperand + button;
  }


  updateDisplay() {
    this.curr.textContent = this.currOperand.toLocaleString("en");
    this.prev.textContent = `${this.prevOperand} ${this.operator}`;
  }

  calculate() {
    let computation;
    switch(this.operator) {
      case "+":
      computation =  Math.round(Number(this.prevOperand) + Number(this.currOperand));
      break;

      case "-":
      computation = Math.round(Number(this.prevOperand) - Number(this.currOperand));
      break;

      case "*":
      computation =  Math.round(Number(this.prevOperand) * Number(this.currOperand)) ;
      break;

      case "/":
      try {
        if(Number(this.currOperand) === 0) {
          throw "Cannot divide by zero!"
        }
        else {
          computation = Math.round(Number(this.prevOperand) / Number(this.currOperand));
        }
      }
      catch(msg) {
        computation = msg;
      }

      break;

      default:
      return;
    }
    this.currOperand = computation;
    this.prevOperand = " ";
    this.operator= " ";


  }


  delete() {
    this.currOperand = this.currOperand.substring(0, this.currOperand.length - 1);

  }

  clear() {
    this.currOperand = " ";
    this.prevOperand = " ";
    this.operator = " ";
  }



}


let operator = document.querySelectorAll(".data");
let number = document.querySelectorAll(".number");
let equal = document.querySelector(".equal");
let del = document.querySelector("#delete");
let clearAll = document.querySelector("#clear-all");
let current = document.querySelector(".col-current h1");
let previous = document.querySelector(".col-previous h1");
calculator = new Calculator(current, previous);
number.forEach(function(item) {
  item.addEventListener("click", function() {
    calculator.appendNumber(item.textContent);
    calculator.updateDisplay()
  })
})

operator.forEach(function(item) {
  item.addEventListener("click", function() {
    calculator.chooseOperation(item.textContent);
    calculator.updateDisplay();
  })
})

del.addEventListener("click", function() {
  calculator.delete();
  calculator.updateDisplay();
})

clearAll.addEventListener("click", function() {
  calculator.clear();
  calculator.updateDisplay();
})

equal.addEventListener("click", function() {
  calculator.calculate();
  calculator.updateDisplay();
})
