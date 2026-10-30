# ⚡ Quizee — Interactive Coding Challenge Quiz

An engaging, high-performance interactive web application designed to test and elevate developers' mastery across **JavaScript, HTML, CSS, Programming Logic, and Debugging**.

Built purely with vanilla web technologies, focusing on core JavaScript fundamentals, dynamic DOM manipulation, responsive event handling, and fluid CSS animations.

---

## 🎯 Educational Concepts Implemented

### 1. Introduction to JavaScript
- **Data Types & Coercion:** Truthy/falsy expressions, `typeof null`, strict (`===`) vs abstract (`==`) equality.
- **Modern ES6+ Syntax:** `let` and `const` block scoping, arrow functions, object and array destructuring, template literals, and the spread operator (`...`).
- **Functional Array Methods:** Pure manipulation and transformation with `.map()`, `.filter()`, `.reduce()`, and `.slice()`.
- **Closures & Scope:** Lexical environments, counter closures, and the Temporal Dead Zone (TDZ).
- **Asynchronous Execution & Event Loop:** Understanding microtasks (`Promise.then()`) vs macrotasks (`setTimeout()`), event queues, and call stack execution ordering.

### 2. DOM Manipulation & Events
- **Targeted Element Selection:** `document.getElementById()`, `document.querySelectorAll()`, and parent/child traversals.
- **Dynamic DOM Creation:** Safe element creation via `document.createElement()`, sanitized attribute assignment, and document fragments to avoid layout thrashing.
- **Event Handling & Delegation:** Global keyboard listeners (`1-4` for option selection, `Space`/`Enter` for next, `M` for audio mute, `Esc` for modals), form change listeners, and radio-style button pickers.
- **Dynamic Styling & Classes:** Toggling states with `classList.add()`, `classList.remove()`, and setting CSS custom property values in real time.
- **Accessibility (a11y):** ARIA attributes (`role="progressbar"`, `role="radiogroup"`, `aria-checked`, `aria-live="polite"`), semantic HTML5 tags (`<main>`, `<header>`, `<nav>`, `<code>`), and high-contrast indicators.

### 3. Basic Animations & Interactivity
- **SVG Circular Countdown Timer:** Real-time `stroke-dashoffset` interpolation dynamically tied to remaining time.
- **Animated Progress Bar:** Smooth width transitions with glowing pulse indicators.
- **Interactive Micro-Interactions:**
  - Option bounce on correct selection (`@keyframes correctBounce`).
  - Dissonant shake on incorrect selection (`@keyframes shake`).
  - Floating score indicators (`+150 pts`) that float upward and fade out.
  - Streak flame wobbles and glowing halos as consecutive streaks build up.
- **Canvas Confetti Particle System:** Custom-engineered particle physics utilizing `requestAnimationFrame` for victory celebrations without external libraries.
- **Web Audio API Sound Synthesizer:** 100% offline, procedural sound effects (click blips, rising chord chimes, wrong answer buzzers, streak fanfares, and countdown warning ticks).

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **3 Difficulty Levels** | **Easy** (15s timer, foundational concepts), **Medium** (12s timer, DOM & code snippets), and **Hard** (10s timer, closures, event loop, and edge-case bugs). |
| **Topic Filtering** | Choose from *All Topics*, *JavaScript*, *HTML & CSS*, *Programming Logic*, or *Bug Hunting & Debugging*. |
| **Countdown Timer** | Visual countdown that transitions from blue to warning amber, then pulses crimson when under 5 seconds. |
| **Instant Feedback** | Immediate color-coded option states accompanied by an in-depth code explanation detailing *why* the answer is correct. |
| **Streak Multipliers** | Consecutive correct answers unlock streak bonuses: `1.25x` (2 streak), `1.5x` (3 streak), `1.75x` (4 streak), up to `2.0x` (5+ streak). |
| **Performance Breakdown** | Final results screen displays total score, developer rank tier, accuracy percentage, max streak, average answer speed, and a domain breakdown bar chart. |
| **Question-by-Question Review** | An interactive drawer where players can review all questions, see their chosen answer vs. the correct answer, and filter by *All*, *Incorrect*, or *Correct*. |
| **Local Storage Persistence** | Personal best scores and maximum streaks are remembered across sessions. |
| **Light & Dark Mode** | Built-in theme switcher matching standard developer IDE aesthetics. |

---

## 📂 Project Architecture

```
Quizee/
│
├── index.html          # Semantic application layout & screen containers
├── README.md           # Project documentation and concept mapping
│
├── css/
│   └── style.css       # Complete design system, themes, and keyframe animations
│
└── js/
    ├── questions.js    # Comprehensive question bank (Easy, Medium, Hard)
    ├── audio.js        # Web Audio API procedural sound synthesizer
    ├── confetti.js     # Pure HTML5 canvas confetti particle system
    └── app.js          # Core state engine, timer, event handlers, and results logic
```

---

## 🚀 How to Run the Project

No build step or Node.js environment is required!

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).
2. Alternatively, serve with a lightweight local server:
   ```bash
   # Using VS Code Live Server extension, or:
   npx serve .
   # or Python:
   python -m http.server 8000
   ```
3. Test your coding skills, build up streaks, and aim for the **Staff Systems Architect** tier!

