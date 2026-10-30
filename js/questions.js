/**
 * Quizee - Coding Challenge Question Bank
 * Categorized by Difficulty (Easy, Medium, Hard) and Topics (JavaScript, HTML-CSS, Logic, Debugging)
 */

const QUESTION_BANK = [
  // ==========================================
  // EASY QUESTIONS
  // ==========================================
  {
    id: "e-js-1",
    difficulty: "easy",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What does the `typeof null` operator return in JavaScript?",
    code: "console.log(typeof null);",
    codeLanguage: "javascript",
    options: [
      "'null'",
      "'object'",
      "'undefined'",
      "'boolean'"
    ],
    correctIndex: 1,
    explanation: "In JavaScript, `typeof null` returns `'object'`. This is a famous historical bug from JS's first release in 1995. Values had type tags, and objects had tag 0 while `null` was represented as the NULL pointer (0x00)."
  },
  {
    id: "e-js-2",
    difficulty: "easy",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What will happen when pushing an element into a `const` array?",
    code: `const stack = ["A", "B"];
stack.push("C");
console.log(stack);`,
    codeLanguage: "javascript",
    options: [
      "Throws TypeError: Assignment to constant variable",
      "Successfully outputs ['A', 'B', 'C']",
      "Outputs ['C']",
      "Outputs undefined"
    ],
    correctIndex: 1,
    explanation: "`const` prevents reassignment of the variable identifier itself, but it does NOT freeze the object or array. Array mutation methods like `.push()`, `.pop()`, and `.splice()` work normally."
  },
  {
    id: "e-js-3",
    difficulty: "easy",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What is the key difference between `==` and `===` in JavaScript?",
    code: `console.log(5 == "5");  // Line 1
console.log(5 === "5"); // Line 2`,
    codeLanguage: "javascript",
    options: [
      "`==` is strict equality; `===` performs implicit type coercion",
      "`==` performs type coercion; `===` checks both value and type strictly",
      "Both do the exact same check",
      "`===` only works for primitive numbers"
    ],
    correctIndex: 1,
    explanation: "The double equals `==` (abstract equality) coerces operands to a common type before comparison (so `5 == '5'` is true). The triple equals `===` (strict equality) requires both type and value to match without coercion."
  },
  {
    id: "e-html-1",
    difficulty: "easy",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "Which HTML5 semantic element should wrap primary site navigation links?",
    code: `<!-- Which tag best belongs here? -->
<nav>
  <a href="/home">Home</a>
  <a href="/docs">Docs</a>
</nav>`,
    codeLanguage: "html",
    options: [
      "<section>",
      "<menu-bar>",
      "<nav>",
      "<navigation>"
    ],
    correctIndex: 2,
    explanation: "The `<nav>` element is the official HTML5 semantic tag intended for major navigational blocks, improving accessibility and assistive screen reader navigation."
  },
  {
    id: "e-css-1",
    difficulty: "easy",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "Which CSS display property turns a container into a flexible one-dimensional layout model?",
    code: `.container {
  display: flex;
  justify-content: center;
}`,
    codeLanguage: "css",
    options: [
      "display: block-flex;",
      "display: flex;",
      "display: inline-grid;",
      "display: flow-root;"
    ],
    correctIndex: 1,
    explanation: "`display: flex;` activates the CSS Flexible Box Layout module, enabling dynamic alignment, distribution of space, and flex item ordering along main and cross axes."
  },
  {
    id: "e-css-2",
    difficulty: "easy",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "In the CSS Box Model, what is the space between the content boundary and the border called?",
    code: `/* Box Model: Content -> ? -> Border -> Margin */`,
    codeLanguage: "css",
    options: [
      "Margin",
      "Padding",
      "Outline",
      "Gutter"
    ],
    correctIndex: 1,
    explanation: "Padding is the internal spacing between the element's content and its border. Margin is the external spacing outside the element's border separating it from neighbors."
  },
  {
    id: "e-logic-1",
    difficulty: "easy",
    category: "logic",
    categoryName: "Logic",
    question: "What is the evaluation result of the modulo expression `19 % 4`?",
    code: "const remainder = 19 % 4;",
    codeLanguage: "javascript",
    options: [
      "4",
      "3",
      "4.75",
      "1"
    ],
    correctIndex: 1,
    explanation: "The modulo operator `%` calculates the integer remainder of division. 19 divided by 4 is 4 with a remainder of 3 (because 4 * 4 = 16, and 19 - 16 = 3)."
  },
  {
    id: "e-logic-2",
    difficulty: "easy",
    category: "logic",
    categoryName: "Logic",
    question: "Which of the following values is considered TRUTHY in JavaScript conditionals?",
    code: `if (value) {
  console.log("Truthy!");
}`,
    codeLanguage: "javascript",
    options: [
      "0",
      "\"\"",
      "\"0\"",
      "undefined"
    ],
    correctIndex: 2,
    explanation: "The string `\"0\"` is a non-empty string, making it truthy. The falsy values in JS are `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined`, and `NaN`."
  },
  {
    id: "e-logic-3",
    difficulty: "easy",
    category: "logic",
    categoryName: "Logic",
    question: "How many times will this `for` loop body execute?",
    code: `let count = 0;
for (let i = 0; i < 6; i += 2) {
  count++;
}`,
    codeLanguage: "javascript",
    options: [
      "6 times",
      "3 times",
      "4 times",
      "2 times"
    ],
    correctIndex: 1,
    explanation: "The loop runs for `i = 0`, `i = 2`, and `i = 4`. When `i` reaches 6, the condition `6 < 6` evaluates to false, terminating the loop. Total executions = 3."
  },
  {
    id: "e-debug-1",
    difficulty: "easy",
    category: "debugging",
    categoryName: "Debugging",
    question: "What runtime error occurs when referencing `score` before its `let` declaration?",
    code: `console.log(score);
let score = 100;`,
    codeLanguage: "javascript",
    options: [
      "Logs undefined",
      "ReferenceError: Cannot access 'score' before initialization",
      "SyntaxError: Invalid token",
      "TypeError: score is not a function"
    ],
    correctIndex: 1,
    explanation: "Variables declared with `let` and `const` are hoisted into the Temporal Dead Zone (TDZ). Accessing them before their actual line of initialization throws a `ReferenceError`."
  },
  {
    id: "e-debug-2",
    difficulty: "easy",
    category: "debugging",
    categoryName: "Debugging",
    question: "What is the bug causing this function to not return the expected sum?",
    code: `function add(a, b) {
  const sum = a + b;
}
const result = add(3, 4);
console.log(result);`,
    codeLanguage: "javascript",
    options: [
      "Variables in functions must be declared with var",
      "The function lacks a return statement, so it returns undefined",
      "The parameters must be converted to numbers",
      "const is not allowed inside function blocks"
    ],
    correctIndex: 1,
    explanation: "A JavaScript function without an explicit `return` statement always returns `undefined` implicitly upon reaching the end of its block."
  },
  {
    id: "e-html-2",
    difficulty: "easy",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "Why should an `<img>` tag always include an `alt` attribute?",
    code: `<img src="avatar.png" alt="User profile avatar">`,
    codeLanguage: "html",
    options: [
      "It speeds up image loading over HTTP/2",
      "It provides alternative text for screen readers and fallbacks if the image fails",
      "It determines the natural aspect ratio of the image",
      "It is required by CSS for applying border-radius"
    ],
    correctIndex: 1,
    explanation: "The `alt` attribute provides essential context to screen reader users (accessibility) and displays descriptive replacement text if the image asset fails to load."
  },

  // ==========================================
  // MEDIUM QUESTIONS
  // ==========================================
  {
    id: "m-js-1",
    difficulty: "medium",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What is the primary difference between `Array.prototype.map()` and `Array.prototype.forEach()`?",
    code: `const nums = [1, 2, 3];
const res1 = nums.map(n => n * 2);
const res2 = nums.forEach(n => n * 2);`,
    codeLanguage: "javascript",
    options: [
      "`map` mutates the original array; `forEach` does not",
      "`map` returns a brand new transformed array; `forEach` returns undefined",
      "`forEach` executes asynchronously; `map` executes synchronously",
      "`map` cannot take an arrow function"
    ],
    correctIndex: 1,
    explanation: "`.map()` constructs and returns a new array holding the return value of each callback invocation. `.forEach()` merely executes side-effects for each item and always returns `undefined`."
  },
  {
    id: "m-js-2",
    difficulty: "medium",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What is logged to the console by this closure counter?",
    code: `function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
counter();
console.log(counter());`,
    codeLanguage: "javascript",
    options: [
      "1",
      "2",
      "undefined",
      "NaN"
    ],
    correctIndex: 1,
    explanation: "Due to closures, the returned function retains a reference to the `count` variable in its lexical environment. The first call increments `count` to 1, and the second call increments and returns 2."
  },
  {
    id: "m-js-3",
    difficulty: "medium",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What is the exact execution output sequence in this Event Loop example?",
    code: `console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");`,
    codeLanguage: "javascript",
    options: [
      "Start -> Timeout -> End",
      "Timeout -> Start -> End",
      "Start -> End -> Timeout",
      "End -> Start -> Timeout"
    ],
    correctIndex: 2,
    explanation: "`setTimeout` is queued to the macrotask (timer) queue, even with 0ms delay. The JavaScript call stack must finish executing all synchronous code ('Start', 'End') before the event loop pulls from the task queue."
  },
  {
    id: "m-html-1",
    difficulty: "medium",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "What does the `defer` attribute on a `<script>` tag do?",
    code: `<script src="bundle.js" defer></script>`,
    codeLanguage: "html",
    options: [
      "Executes the script immediately, pausing HTML parsing",
      "Downloads the script in the background and executes after HTML is fully parsed, in document order",
      "Executes the script only when the element is clicked",
      "Downloads the script only when the user scrolls to the bottom"
    ],
    correctIndex: 1,
    explanation: "`defer` downloads the script in parallel without blocking HTML parser execution. It guarantees execution in document order after the DOM has finished parsing, just before `DOMContentLoaded`."
  },
  {
    id: "m-css-1",
    difficulty: "medium",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "Which of the following CSS selectors has the highest specificity?",
    code: `/* Selector A */ header nav.active a { ... }
/* Selector B */ #main-nav a { ... }
/* Selector C */ a.btn.primary.active { ... }
/* Selector D */ div ul li a { ... }`,
    codeLanguage: "css",
    options: [
      "Selector A: header nav.active a",
      "Selector B: #main-nav a",
      "Selector C: a.btn.primary.active",
      "Selector D: div ul li a"
    ],
    correctIndex: 1,
    explanation: "CSS specificity is calculated as (ID, Class/Attribute/Pseudo-class, Element). Selector B has (1, 0, 1) because of the ID `#main-nav`. Even three classes (0, 3, 1) cannot override a single ID selector."
  },
  {
    id: "m-css-2",
    difficulty: "medium",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "In CSS Flexbox, what does `justify-content` align, versus `align-items`?",
    code: `.flex-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
    codeLanguage: "css",
    options: [
      "`justify-content` aligns along the cross axis; `align-items` along the main axis",
      "`justify-content` aligns along the main axis; `align-items` along the cross axis",
      "Both align along the vertical axis only",
      "`justify-content` sets element margins; `align-items` sets padding"
    ],
    correctIndex: 1,
    explanation: "In Flexbox, `justify-content` controls distribution of items along the main axis (default horizontal/row). `align-items` controls alignment along the perpendicular cross axis."
  },
  {
    id: "m-logic-1",
    difficulty: "medium",
    category: "logic",
    categoryName: "Logic",
    question: "What is the length of `unique` after deduplicating with ES6 `Set`?",
    code: `const numbers = [10, 20, 20, 30, 40, 40, 50];
const unique = [...new Set(numbers)];
console.log(unique.length);`,
    codeLanguage: "javascript",
    options: [
      "7",
      "5",
      "4",
      "undefined"
    ],
    correctIndex: 1,
    explanation: "A `Set` stores only unique values. Duplicates (20 and 40) are discarded, resulting in `[10, 20, 30, 40, 50]`, which has a length of 5."
  },
  {
    id: "m-logic-2",
    difficulty: "medium",
    category: "logic",
    categoryName: "Logic",
    question: "What will this string manipulation expression return?",
    code: `const str = "quizee";
const reversed = str.split("").reverse().join("");
console.log(reversed);`,
    codeLanguage: "javascript",
    options: [
      "'quizee'",
      "'eeziuq'",
      "['e', 'e', 'z', 'i', 'u', 'q']",
      "TypeError: str.reverse is not a function"
    ],
    correctIndex: 1,
    explanation: "`.split('')` converts the string into an array of characters, `.reverse()` reverses the array in place, and `.join('')` concatenates it back into the reversed string `'eeziuq'`."
  },
  {
    id: "m-debug-1",
    difficulty: "medium",
    category: "debugging",
    categoryName: "Debugging",
    question: "Why does `0.1 + 0.2 === 0.3` evaluate to `false` in JavaScript?",
    code: `console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2);         // 0.30000000000000004`,
    codeLanguage: "javascript",
    options: [
      "JavaScript automatically converts decimals to integers",
      "Floating-point numbers in IEEE 754 binary cannot represent some decimal fractions precisely",
      "The equality operator fails when comparing floats; double equals would be true",
      "It is a syntax error in ES6"
    ],
    correctIndex: 1,
    explanation: "JavaScript uses standard 64-bit IEEE 754 floating-point numbers. Fractions like 0.1 and 0.2 have repeating binary representations, leading to tiny rounding differences (0.30000000000000004)."
  },
  {
    id: "m-debug-2",
    difficulty: "medium",
    category: "debugging",
    categoryName: "Debugging",
    question: "What bug occurs when removing items with `.splice()` inside a forward `for` loop?",
    code: `const arr = [1, 2, 4, 5];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    arr.splice(i, 1);
  }
}
console.log(arr);`,
    codeLanguage: "javascript",
    options: [
      "Throws an IndexOutOfBounds error",
      "Skips the immediate next element (4) because elements shift left while i increments",
      "Correctly deletes all even numbers: [1, 5]",
      "Infinite loop freezes the browser"
    ],
    correctIndex: 1,
    explanation: "When element 2 is removed at index 1, element 4 shifts into index 1. But `i` advances to 2 on the next loop cycle, skipping index 1 and therefore missing 4. Iterate backwards or use `.filter()`!"
  },
  {
    id: "m-debug-3",
    difficulty: "medium",
    category: "debugging",
    categoryName: "Debugging",
    question: "What does `NaN === NaN` evaluate to, and how should you check for NaN?",
    code: `console.log(NaN === NaN);
console.log(Number.isNaN(NaN));`,
    codeLanguage: "javascript",
    options: [
      "`true`; check with `x === NaN`",
      "`false`; check with `Number.isNaN(x)` or `Object.is(x, NaN)`",
      "`undefined`; check with `typeof x === 'nan'`",
      "`TypeError`; NaN cannot be compared"
    ],
    correctIndex: 1,
    explanation: "`NaN` is the only value in JavaScript that is NOT equal to itself under both `==` and `===`. You must use `Number.isNaN(val)` or `Object.is(val, NaN)` to verify."
  },
  {
    id: "m-js-4",
    difficulty: "medium",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What is Event Delegation in DOM manipulation?",
    code: `document.getElementById("todo-list")
  .addEventListener("click", (e) => {
    if (e.target.matches("button.delete")) {
      deleteItem(e.target);
    }
  });`,
    codeLanguage: "javascript",
    options: [
      "Attaching listeners to every child node individually via a loop",
      "Attaching a single listener to a common parent element and leveraging event bubbling",
      "Canceling events before they can reach the browser window",
      "Delegating event handling to a Web Worker background thread"
    ],
    correctIndex: 1,
    explanation: "Event Delegation takes advantage of event bubbling by putting a single event listener on a parent container rather than registering separate listeners on dozens of dynamic children."
  },

  // ==========================================
  // HARD QUESTIONS
  // ==========================================
  {
    id: "h-js-1",
    difficulty: "hard",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What is the exact console output order between microtasks and macrotasks?",
    code: `console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");`,
    codeLanguage: "javascript",
    options: [
      "1, 2, 3, 4",
      "1, 4, 2, 3",
      "1, 4, 3, 2",
      "3, 1, 4, 2"
    ],
    correctIndex: 2,
    explanation: "1 and 4 log synchronously. The Promise `.then()` callback is queued as a microtask. The `setTimeout` callback is queued as a macrotask. Microtasks are ALWAYS drained before the next macrotask is processed, giving `1, 4, 3, 2`."
  },
  {
    id: "h-js-2",
    difficulty: "hard",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What will `dev.greet()` log to the console?",
    code: `const dev = {
  name: "Sarah",
  greet: () => {
    console.log("Hi, " + this.name);
  }
};
dev.greet();`,
    codeLanguage: "javascript",
    options: [
      "'Hi, Sarah'",
      "'Hi, undefined' (or window.name in browser)",
      "TypeError: dev.greet is not a function",
      "ReferenceError: name is not defined"
    ],
    correctIndex: 1,
    explanation: "Arrow functions do NOT bind their own `this`. Instead, they lexically capture `this` from the enclosing scope where `dev` is defined (which is the module/window scope, not the `dev` object literal)."
  },
  {
    id: "h-js-3",
    difficulty: "hard",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What will happen when mutating a nested property of a frozen object?",
    code: `const config = Object.freeze({
  theme: "dark",
  settings: {
    volume: 80
  }
});

config.settings.volume = 100;
console.log(config.settings.volume);`,
    codeLanguage: "javascript",
    options: [
      "Throws TypeError because config is frozen",
      "Logs 100 because Object.freeze() is shallow",
      "Logs 80; mutation is silently ignored",
      "Logs undefined"
    ],
    correctIndex: 1,
    explanation: "`Object.freeze()` is shallow. It prevents adding, removing, or changing properties directly on `config`, but nested objects (`settings`) remain completely mutable unless deep-frozen recursively."
  },
  {
    id: "h-js-4",
    difficulty: "hard",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What does this classic `var` loop with asynchronous timers log?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}`,
    codeLanguage: "javascript",
    options: [
      "0, 1, 2",
      "3, 3, 3",
      "undefined, undefined, undefined",
      "0, 0, 0"
    ],
    correctIndex: 1,
    explanation: "`var` is function-scoped (or globally scoped), so only a single shared `i` variable exists. By the time the 100ms timers execute, the loop has completed and `i` has incremented to 3. (Using `let` solves this via block scoping)."
  },
  {
    id: "h-css-1",
    difficulty: "hard",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "Which CSS Grid declaration creates an auto-responsive grid that wraps items without media queries?",
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}`,
    codeLanguage: "css",
    options: [
      "repeat(auto-fit, minmax(250px, 1fr))",
      "repeat(fit-content, 250px)",
      "repeat(all, 1fr 250px)",
      "flex-wrap: repeat(auto, minmax(250px))"
    ],
    correctIndex: 0,
    explanation: "`repeat(auto-fit, minmax(250px, 1fr))` creates as many columns of at least 250px as will fit, expanding them equally to fill remaining space (`1fr`), and collapsing empty tracks automatically."
  },
  {
    id: "h-css-2",
    difficulty: "hard",
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "Which of the following will create a NEW CSS Stacking Context on an element?",
    code: `/* Creating a new stacking context determines z-index ordering */`,
    codeLanguage: "css",
    options: [
      "display: block;",
      "opacity: 0.95; (any value less than 1)",
      "margin: 0 auto;",
      "font-weight: bold;"
    ],
    correctIndex: 1,
    explanation: "Properties like `opacity: < 1`, `transform`, `filter`, and `isolation: isolate` spawn an entirely new stacking context, isolating its children's `z-index` from outside elements."
  },
  {
    id: "h-logic-1",
    difficulty: "hard",
    category: "logic",
    categoryName: "Logic",
    question: "What is the Big-O worst-case time complexity of Binary Search on a sorted array?",
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    codeLanguage: "javascript",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correctIndex: 2,
    explanation: "Binary search cuts the search space in half at each iteration, resulting in a logarithmic time complexity of O(log n)."
  },
  {
    id: "h-logic-2",
    difficulty: "hard",
    category: "logic",
    categoryName: "Logic",
    question: "What is the output of `Array.prototype.flat(1)` on this multi-dimensional array?",
    code: `const matrix = [1, [2, 3], [4, [5, 6]]];
const flattened = matrix.flat(1);
console.log(flattened);`,
    codeLanguage: "javascript",
    options: [
      "[1, 2, 3, 4, 5, 6]",
      "[1, 2, 3, 4, [5, 6]]",
      "[[1, 2], [3, 4], [5, 6]]",
      "TypeError: flat is not a function"
    ],
    correctIndex: 1,
    explanation: "`flat(1)` only flattens one level deep. `[2, 3]` and `[4, [5, 6]]` are unnested one level, leaving `[5, 6]` intact inside the array: `[1, 2, 3, 4, [5, 6]]`. To flatten all, pass `Infinity`."
  },
  {
    id: "h-debug-1",
    difficulty: "hard",
    category: "debugging",
    categoryName: "Debugging",
    question: "What causes unexpected output when sorting numbers with `.sort()` without a comparator?",
    code: `const scores = [10, 5, 40, 25, 100];
scores.sort();
console.log(scores);`,
    codeLanguage: "javascript",
    options: [
      "Outputs [5, 10, 25, 40, 100]",
      "Outputs [10, 100, 25, 40, 5] because elements are cast to strings and sorted lexicographically",
      "Throws an error because numbers cannot be sorted",
      "Sorts in reverse numerical order"
    ],
    correctIndex: 1,
    explanation: "By default, `.sort()` converts array elements into strings and compares their UTF-16 code units. '100' comes before '25', and '40' before '5'. To sort numerically, always provide `(a, b) => a - b`."
  },
  {
    id: "h-debug-2",
    difficulty: "hard",
    category: "debugging",
    categoryName: "Debugging",
    question: "In single-page applications, what is a frequent cause of memory leaks in JavaScript?",
    code: `// Inside component lifecycle
window.addEventListener("resize", handleResize);
// What happens if handleResize is never removed when component unmounts?`,
    codeLanguage: "javascript",
    options: [
      "The browser automatically garbage-collects all window listeners on DOM changes",
      "Retained event listener closures prevent referenced DOM elements and state from being garbage-collected",
      "The window object crashes immediately",
      "There is no memory penalty for global listeners"
    ],
    correctIndex: 1,
    explanation: "Global listeners registered on `window` or `document` retain references to the callback and any closures/DOM nodes it closes over. If `removeEventListener` is omitted on cleanup, those objects cannot be garbage collected, creating memory leaks."
  },
  {
    id: "h-debug-3",
    difficulty: "hard",
    category: "debugging",
    categoryName: "Debugging",
    question: "What bug occurs when this recursive function is called with `factorial(5)`?",
    code: `function factorial(n) {
  return n * factorial(n - 1);
}
console.log(factorial(5));`,
    codeLanguage: "javascript",
    options: [
      "Returns 120",
      "Returns 0",
      "RangeError: Maximum call stack size exceeded (Missing base case)",
      "Returns NaN"
    ],
    correctIndex: 2,
    explanation: "The function lacks a terminating base case (e.g. `if (n <= 1) return 1;`). It recurses infinitely with negative numbers until the JavaScript runtime call stack exceeds its limit and crashes."
  },
  {
    id: "h-js-5",
    difficulty: "hard",
    category: "javascript",
    categoryName: "JavaScript",
    question: "What is an Asynchronous Race Condition when fetching user profiles?",
    code: `// User rapidly clicks profile 1, then profile 2
fetchProfile(1).then(data => render(data));
fetchProfile(2).then(data => render(data));`,
    codeLanguage: "javascript",
    options: [
      "Both requests are automatically cancelled by the browser",
      "Request 1 might resolve slower than Request 2, overwriting profile 2 with stale profile 1 data",
      "The browser will queue them sequentially and guarantee Request 2 always finishes last",
      "Promises cannot run at the same time"
    ],
    correctIndex: 1,
    explanation: "Network latency varies. If the first request for profile 1 takes longer to return than the second request, its `.then()` callback will execute last, displaying the wrong (outdated) profile. `AbortController` should be used to cancel outdated requests."
  }
];

// Helper to filter and shuffle questions
function getQuizQuestions(difficulty = "all", category = "all", count = 10) {
  let pool = [...QUESTION_BANK];

  // Filter by difficulty if not 'all'
  if (difficulty && difficulty !== "all") {
    pool = pool.filter(q => q.difficulty === difficulty);
  }

  // Filter by category if not 'all'
  if (category && category !== "all") {
    pool = pool.filter(q => q.category === category);
  }

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Return requested count (or maximum available)
  return pool.slice(0, Math.min(count, pool.length));
}

