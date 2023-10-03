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
      display_output.innerHTML = organizeInput(input);
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
      input += value;
      display_input.innerHTML = organizeInput(input);
    }
  });
}

const organizeInput = (input) => {
  let input_arr = input.split("");
  let input_arr_length = input_arr.length;
  for (let i = 0; i < input_arr_length; i++) {
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
