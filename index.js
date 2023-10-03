const keys = document.querySelectorAll(".keys-btn");

const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    if (value === "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value === "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = organizeInput(input);
    } else if (value === "=") {
      let result = eval(PerpareInput(input));
      display_output.innerHTML = organizeOutput(result);
    } else if (value === "brackets") {
      if (
        !input.includes("(") ||
        input == "" ||
        (input.includes("(") &&
          input.includes(")") &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.includes("(") && !input.includes(")")) ||
        (input.includes("(") &&
          input.includes(")") &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = organizeInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = organizeInput(input);
      }
    }
  });
}

const organizeInput = (input) => {
  let input_arr = input.split("");
  let input_leng = input_arr.length;

  for (let i = 0; i < input_leng; i++) {
    if (input_arr[i] == "*") {
      input_arr[i] = ` <span class="operator">x</span> `;
    } else if (input_arr[i] == "/") {
      input_arr[i] = ` <span class="operator">÷</span> `;
    } else if (input_arr[i] == "+") {
      input_arr[i] = ` <span class="operator">+</span> `;
    } else if (input_arr[i] == "-") {
      input_arr[i] = ` <span class="operator">-</span> `;
    } else if (input_arr[i] == "(") {
      input_arr[i] = `<span class="brackets">(</span>`;
    } else if (input_arr[i] == ")") {
      input_arr[i] = `<span class="brackets">)</span>`;
    } else if (input_arr[i] == "%") {
      input_arr[i] = `<span class="percent">%</span>`;
    }
  }
  return input_arr.join("");
};

const organizeOutput = (output) => {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_arr = output_string.split("");

  if (output_arr.length > 3) {
    for (let i = output_arr.length - 3; i > 0; i -= 3) {
      output_arr.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_arr.push(".");
    output_arr.push(decimal);
  }

  return output_arr.join("");
};

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PerpareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
