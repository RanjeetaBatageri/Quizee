/**
 * Quizee - Coding Challenge Interactive Quiz
 * Main Application Logic
 * 
 * Demonstrating:
 * 1. JavaScript fundamentals (state, closures, array methods, modern ES6+)
 * 2. DOM manipulation & event handling (delegation, keyboard shortcuts, dynamic rendering)
 * 3. Animations & interactivity (SVG countdown, progress bar, floating score, transitions)
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // State Management
  // =========================================================================
  const state = {
    // Configuration
    difficulty: "easy",          // 'easy' | 'medium' | 'hard'
    category: "all",              // 'all' | 'javascript' | 'html-css' | 'logic' | 'debugging'
    questionCount: 10,

    // Runtime Quiz Data
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    answersHistory: [],          // Stores user answers for final review

    // Timer state
    timerInterval: null,
    timeLeft: 15,
    maxTime: 15,
    isAnswered: false,
    startTime: 0,

    // Persistent records
    highScore: parseInt(localStorage.getItem("quizee_high_score") || "0", 10),
    bestStreak: parseInt(localStorage.getItem("quizee_best_streak") || "0", 10),
    isDarkTheme: localStorage.getItem("quizee_theme") !== "light"
  };

  // Timer settings per difficulty
  const TIMER_LIMITS = {
    easy: 15,
    medium: 12,
    hard: 10
  };

  // Scoring multipliers per difficulty
  const DIFFICULTY_MULTIPLIERS = {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0
  };

  // SVG Timer Circle Circumference = 2 * PI * 18 ≈ 113.1
  const TIMER_CIRCUMFERENCE = 113.1;

  // =========================================================================
  // DOM Elements Cache
  // =========================================================================
  const elements = {
    // Screens
    startScreen: document.getElementById("start-screen"),
    quizScreen: document.getElementById("quiz-screen"),
    resultsScreen: document.getElementById("results-screen"),
    reviewScreen: document.getElementById("review-screen"),

    // Global Header Controls
    soundToggle: document.getElementById("sound-toggle"),
    themeToggle: document.getElementById("theme-toggle"),
    soundIcon: document.querySelector(".sound-icon"),
    themeIcon: document.querySelector(".theme-icon"),

    // Start Screen Config
    diffBtns: document.querySelectorAll(".diff-btn"),
    categorySelect: document.getElementById("category-select"),
    countBtns: document.querySelectorAll(".count-btn"),
    startBtn: document.getElementById("start-btn"),
    bestScoreVal: document.getElementById("best-score-val"),
    bestStreakVal: document.getElementById("best-streak-val"),

    // Quiz Header Stats
    currentQNum: document.getElementById("current-q-num"),
    totalQNum: document.getElementById("total-q-num"),
    quizCategoryTag: document.getElementById("quiz-category-tag"),
    quizDiffTag: document.getElementById("quiz-diff-tag"),
    currentScore: document.getElementById("current-score"),
    floatingScore: document.getElementById("floating-score"),
    streakContainer: document.getElementById("streak-container"),
    streakText: document.getElementById("streak-text"),
    streakBonusPill: document.getElementById("streak-bonus-pill"),
    progressBarFill: document.getElementById("progress-bar-fill"),

    // Question Area
    questionText: document.getElementById("question-text"),
    timerCircleFill: document.getElementById("timer-circle-fill"),
    timerText: document.getElementById("timer-text"),
    timerWrapper: document.querySelector(".timer-wrapper"),
    codeSnippetContainer: document.getElementById("code-snippet-container"),
    codeLanguage: document.getElementById("code-language"),
    codeContent: document.getElementById("code-content"),
    optionsGrid: document.getElementById("options-grid"),

    // Feedback Panel
    feedbackPanel: document.getElementById("feedback-panel"),
    feedbackBanner: document.getElementById("feedback-banner"),
    feedbackIcon: document.getElementById("feedback-icon"),
    feedbackTitle: document.getElementById("feedback-title"),
    feedbackTimerBonus: document.getElementById("feedback-timer-bonus"),
    explanationText: document.getElementById("explanation-text"),
    nextBtn: document.getElementById("next-btn"),

    // Results Screen
    resultsRankTitle: document.getElementById("results-rank-title"),
    resultsSummary: document.getElementById("results-summary"),
    finalScoreVal: document.getElementById("final-score-val"),
    newHighScoreBadge: document.getElementById("new-high-score-badge"),
    resAccuracy: document.getElementById("res-accuracy"),
    resMaxStreak: document.getElementById("res-max-streak"),
    resAvgTime: document.getElementById("res-avg-time"),
    resCorrectCount: document.getElementById("res-correct-count"),
    categoryBarsContainer: document.getElementById("category-bars-container"),
    replayBtn: document.getElementById("replay-btn"),
    reviewMistakesBtn: document.getElementById("review-mistakes-btn"),
    changeSettingsBtn: document.getElementById("change-settings-btn"),

    // Review Screen
    closeReviewBtn: document.getElementById("close-review-btn"),
    reviewList: document.getElementById("review-list"),
    reviewFilterBtns: document.querySelectorAll(".review-filter-btn"),
    revCountAll: document.getElementById("rev-count-all"),
    revCountWrong: document.getElementById("rev-count-wrong"),
    revCountRight: document.getElementById("rev-count-right")
  };

  // =========================================================================
  // Theme & Sound Setup
  // =========================================================================
  function applyTheme() {
    if (!state.isDarkTheme) {
      document.body.classList.add("light-theme");
      elements.themeIcon.textContent = "☀️";
    } else {
      document.body.classList.remove("light-theme");
      elements.themeIcon.textContent = "🌙";
    }
  }

  function applySoundIcon() {
    elements.soundIcon.textContent = audioManager.isMuted ? "🔇" : "🔊";
  }

  function updateStartScreenBestRecords() {
    elements.bestScoreVal.textContent = state.highScore;
    elements.bestStreakVal.textContent = state.bestStreak;
  }

  // =========================================================================
  // Screen Router
  // =========================================================================
  function switchScreen(targetScreen) {
    [elements.startScreen, elements.quizScreen, elements.resultsScreen, elements.reviewScreen].forEach(screen => {
      screen.classList.remove("active");
    });
    targetScreen.classList.add("active");
  }

  // =========================================================================
  // Quiz Lifecycle
  // =========================================================================
  function startQuiz() {
    audioManager.playClick();
    
    // Fetch and shuffle selected questions
    state.questions = getQuizQuestions(state.difficulty, state.category, state.questionCount);

    if (state.questions.length === 0) {
      alert("No questions found matching your criteria. Try selecting All Topics!");
      return;
    }

    // Reset runtime state
    state.currentIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.maxStreak = 0;
    state.answersHistory = [];
    state.maxTime = TIMER_LIMITS[state.difficulty] || 15;

    // Reset UI displays
    elements.currentScore.textContent = "0";
    elements.totalQNum.textContent = state.questions.length;
    updateStreakUI();

    // Set difficulty tag styling
    elements.quizDiffTag.textContent = state.difficulty.toUpperCase();
    elements.quizDiffTag.className = `diff-badge ${state.difficulty}`;

    // Switch screen and load first question
    switchScreen(elements.quizScreen);
    loadQuestion(state.currentIndex);
  }

  function loadQuestion(index) {
    state.isAnswered = false;
    clearInterval(state.timerInterval);

    const q = state.questions[index];

    // Update Counter & Progress Bar
    elements.currentQNum.textContent = index + 1;
    elements.quizCategoryTag.textContent = q.categoryName;
    
    const progressPercent = ((index) / state.questions.length) * 100;
    elements.progressBarFill.style.width = `${progressPercent}%`;

    // Render Question Title
    elements.questionText.textContent = q.question;

    // Render Code Snippet if present
    if (q.code && q.code.trim().length > 0) {
      elements.codeLanguage.textContent = q.codeLanguage || "javascript";
      elements.codeContent.textContent = q.code;
      elements.codeSnippetContainer.style.display = "block";
    } else {
      elements.codeSnippetContainer.style.display = "none";
    }

    // Hide previous feedback panel
    elements.feedbackPanel.style.display = "none";

    // Render Options Buttons with animation stagger
    elements.optionsGrid.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.index = optIdx;
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", "false");

      btn.innerHTML = `
        <span class="option-letter">${letters[optIdx]}</span>
        <span class="option-text">${escapeHTML(optText)}</span>
      `;

      btn.addEventListener("click", () => handleAnswer(optIdx));
      elements.optionsGrid.appendChild(btn);
    });

    // Start Timer
    startTimer();
  }

  // =========================================================================
  // Countdown Timer System
  // =========================================================================
  function startTimer() {
    state.timeLeft = state.maxTime;
    state.startTime = Date.now();
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      state.timeLeft--;
      updateTimerDisplay();

      // Play tick sound when time is low (<= 4s)
      if (state.timeLeft <= 4 && state.timeLeft > 0) {
        audioManager.playTick();
      }

      if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    elements.timerText.textContent = Math.max(0, state.timeLeft);

    // Compute stroke dashoffset: offset = circumference * (1 - timeLeft / maxTime)
    const fraction = state.timeLeft / state.maxTime;
    const offset = TIMER_CIRCUMFERENCE * (1 - fraction);
    elements.timerCircleFill.style.strokeDashoffset = offset;

    // Adjust color warning classes
    elements.timerWrapper.classList.remove("timer-warning", "timer-critical");
    if (state.timeLeft <= 4) {
      elements.timerWrapper.classList.add("timer-critical");
    } else if (state.timeLeft <= 7) {
      elements.timerWrapper.classList.add("timer-warning");
    }
  }

  // =========================================================================
  // Answer Handling & Instant Feedback
  // =========================================================================
  function handleAnswer(selectedIndex) {
    if (state.isAnswered) return;
    state.isAnswered = true;
    clearInterval(state.timerInterval);

    const q = state.questions[state.currentIndex];
    const isCorrect = (selectedIndex === q.correctIndex);
    const timeSpent = Math.max(1, Math.round((Date.now() - state.startTime) / 1000));

    // Disable all options buttons to prevent further clicks
    const optionBtns = elements.optionsGrid.querySelectorAll(".option-btn");
    optionBtns.forEach(btn => {
      btn.disabled = true;
      btn.style.cursor = "default";
    });

    // Record answer in history
    state.answersHistory.push({
      question: q,
      selectedIndex,
      isCorrect,
      isTimeout: false,
      timeSpent
    });

    let pointsEarned = 0;
    let timerBonus = 0;

    if (isCorrect) {
      // Increase streak
      state.streak++;
      if (state.streak > state.maxStreak) {
        state.maxStreak = state.streak;
      }

      // Calculate streak multiplier bonus
      const streakMultiplier = calculateStreakMultiplier(state.streak);
      const diffMultiplier = DIFFICULTY_MULTIPLIERS[state.difficulty] || 1.0;
      
      const basePoints = Math.round(100 * diffMultiplier);
      timerBonus = Math.round(state.timeLeft * 8 * diffMultiplier);
      pointsEarned = Math.round((basePoints + timerBonus) * streakMultiplier);

      state.score += pointsEarned;
      elements.currentScore.textContent = state.score;

      // Trigger floating score animation
      triggerFloatingScore(`+${pointsEarned}`);

      // Sound and visual styling
      if (state.streak >= 3) {
        audioManager.playStreak();
      } else {
        audioManager.playCorrect();
      }

      optionBtns[selectedIndex].classList.add("selected-correct");
      showFeedbackPanel(true, pointsEarned, timerBonus, q.explanation);
    } else {
      // Wrong answer
      state.streak = 0;
      audioManager.playWrong();

      optionBtns[selectedIndex].classList.add("selected-wrong");
      optionBtns[q.correctIndex].classList.add("revealed-correct");
      showFeedbackPanel(false, 0, 0, q.explanation);
    }

    updateStreakUI();
  }

  function handleTimeout() {
    if (state.isAnswered) return;
    state.isAnswered = true;

    const q = state.questions[state.currentIndex];

    // Disable options
    const optionBtns = elements.optionsGrid.querySelectorAll(".option-btn");
    optionBtns.forEach(btn => {
      btn.disabled = true;
      btn.style.cursor = "default";
    });

    // Highlight correct answer
    optionBtns[q.correctIndex].classList.add("revealed-correct");

    // Reset streak
    state.streak = 0;
    updateStreakUI();

    audioManager.playTimeout();

    // Record history
    state.answersHistory.push({
      question: q,
      selectedIndex: -1,
      isCorrect: false,
      isTimeout: true,
      timeSpent: state.maxTime
    });

    showFeedbackPanel(false, 0, 0, q.explanation, true);
  }

  function showFeedbackPanel(isCorrect, points, timerBonus, explanation, isTimeout = false) {
    elements.feedbackPanel.style.display = "flex";

    if (isCorrect) {
      elements.feedbackIcon.textContent = "✅";
      elements.feedbackTitle.textContent = `Correct! +${points} pts`;
      elements.feedbackTitle.style.color = "var(--success)";
      
      if (timerBonus > 0) {
        elements.feedbackTimerBonus.textContent = `⚡ Speed Bonus: +${timerBonus} pts`;
        elements.feedbackTimerBonus.style.display = "block";
      } else {
        elements.feedbackTimerBonus.style.display = "none";
      }
    } else {
      elements.feedbackIcon.textContent = isTimeout ? "⏰" : "❌";
      elements.feedbackTitle.textContent = isTimeout ? "Time's up! (+0 pts)" : "Incorrect (+0 pts)";
      elements.feedbackTitle.style.color = "var(--danger)";
      elements.feedbackTimerBonus.style.display = "none";
    }

    // Format code inside explanation nicely
    elements.explanationText.innerHTML = formatExplanationText(explanation);
    elements.nextBtn.focus();
  }

  function nextQuestion() {
    audioManager.playClick();
    state.currentIndex++;

    if (state.currentIndex < state.questions.length) {
      loadQuestion(state.currentIndex);
    } else {
      finishQuiz();
    }
  }

  // =========================================================================
  // Streak & Multipliers System
  // =========================================================================
  function calculateStreakMultiplier(streak) {
    if (streak >= 5) return 2.0;    // 100% bonus
    if (streak === 4) return 1.75;   // 75% bonus
    if (streak === 3) return 1.5;    // 50% bonus
    if (streak === 2) return 1.25;   // 25% bonus
    return 1.0;                     // Base
  }

  function updateStreakUI() {
    if (state.streak >= 2) {
      elements.streakContainer.classList.add("active-streak");
      elements.streakText.textContent = `${state.streak}x Streak`;

      const mult = calculateStreakMultiplier(state.streak);
      const bonusPercent = Math.round((mult - 1) * 100);
      elements.streakBonusPill.textContent = `+${bonusPercent}%`;
      elements.streakBonusPill.style.display = "inline-block";
    } else {
      elements.streakContainer.classList.remove("active-streak");
      elements.streakText.textContent = state.streak === 1 ? "1x Streak" : "0x Streak";
      elements.streakBonusPill.style.display = "none";
    }
  }

  function triggerFloatingScore(text) {
    elements.floatingScore.textContent = text;
    elements.floatingScore.classList.remove("animate-float");
    void elements.floatingScore.offsetWidth; // Trigger reflow
    elements.floatingScore.classList.add("animate-float");
  }

  // =========================================================================
  // Results & Performance Breakdown
  // =========================================================================
  function finishQuiz() {
    // Fill progress bar to 100%
    elements.progressBarFill.style.width = "100%";

    // Compute metrics
    const totalQuestions = state.answersHistory.length;
    const correctCount = state.answersHistory.filter(a => a.isCorrect).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    const totalTimeSpent = state.answersHistory.reduce((acc, curr) => acc + curr.timeSpent, 0);
    const avgTime = totalQuestions > 0 ? (totalTimeSpent / totalQuestions).toFixed(1) : 0;

    // Check for high score
    let isNewHighScore = false;
    if (state.score > state.highScore) {
      state.highScore = state.score;
      localStorage.setItem("quizee_high_score", state.highScore);
      isNewHighScore = true;
    }
    if (state.maxStreak > state.bestStreak) {
      state.bestStreak = state.maxStreak;
      localStorage.setItem("quizee_best_streak", state.bestStreak);
    }
    updateStartScreenBestRecords();

    // Determine Developer Tier & Rank
    const rankInfo = getDeveloperRank(accuracy, state.score);
    elements.resultsRankTitle.textContent = rankInfo.title;
    elements.resultsSummary.textContent = rankInfo.summary;

    // Populate Results Screen Metrics
    elements.resAccuracy.textContent = `${accuracy}%`;
    elements.resMaxStreak.textContent = `${state.maxStreak} 🔥`;
    elements.resAvgTime.textContent = `${avgTime}s`;
    elements.resCorrectCount.textContent = `${correctCount}/${totalQuestions}`;

    elements.newHighScoreBadge.style.display = isNewHighScore ? "block" : "none";

    // Populate Domain Breakdown Bars
    renderCategoryBreakdown();

    // Switch screen
    switchScreen(elements.resultsScreen);

    // Animate score counter upwards
    animateScoreCounter(state.score);

    // Launch celebratory confetti if high accuracy or new high score
    if (accuracy >= 70 || isNewHighScore) {
      confetti.launch(140);
      audioManager.playVictory();
    }
  }

  function getDeveloperRank(accuracy, score) {
    if (accuracy >= 90) {
      return {
        title: "Staff Systems Architect 🚀🏆",
        summary: "Flawless technical command! You master advanced concepts, edge cases, and asynchronous quirks with ease."
      };
    } else if (accuracy >= 75) {
      return {
        title: "Senior Full-Stack Engineer 💻⚡",
        summary: "Excellent debugging reflexes and robust programming logic! Ready to ship production-grade code."
      };
    } else if (accuracy >= 50) {
      return {
        title: "Mid-Level Developer 🌱",
        summary: "Solid foundation! Review the explanations on tricky scoping and CSS specificity to reach Senior tier."
      };
    } else {
      return {
        title: "Code Apprentice 🐛",
        summary: "Good effort! Practice makes permanent. Use the Review Answers screen to learn from edge cases."
      };
    }
  }

  function renderCategoryBreakdown() {
    elements.categoryBarsContainer.innerHTML = "";

    // Group answers by category
    const categoryStats = {};

    state.answersHistory.forEach(item => {
      const cat = item.question.category;
      const catName = item.question.categoryName;

      if (!categoryStats[cat]) {
        categoryStats[cat] = { name: catName, total: 0, correct: 0 };
      }
      categoryStats[cat].total++;
      if (item.isCorrect) {
        categoryStats[cat].correct++;
      }
    });

    // Render bars for each category present
    Object.keys(categoryStats).forEach(catKey => {
      const data = categoryStats[catKey];
      const pct = Math.round((data.correct / data.total) * 100);

      const row = document.createElement("div");
      row.className = "category-row";

      // Color coding based on score
      let fillColor = "var(--primary)";
      if (pct >= 80) fillColor = "var(--success)";
      else if (pct >= 50) fillColor = "var(--warning)";
      else fillColor = "var(--danger)";

      row.innerHTML = `
        <div class="category-row-header">
          <span class="category-name">${escapeHTML(data.name)}</span>
          <span class="category-score">${data.correct}/${data.total} (${pct}%)</span>
        </div>
        <div class="category-track">
          <div class="category-fill" style="width: 0%; background: ${fillColor};"></div>
        </div>
      `;

      elements.categoryBarsContainer.appendChild(row);

      // Smooth bar fill animation
      setTimeout(() => {
        const fillEl = row.querySelector(".category-fill");
        if (fillEl) fillEl.style.width = `${pct}%`;
      }, 50);
    });
  }

  function animateScoreCounter(targetScore) {
    let current = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    function step(timestamp) {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(ease * targetScore);
      elements.finalScoreVal.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        elements.finalScoreVal.textContent = targetScore;
      }
    }

    requestAnimationFrame(step);
  }

  // =========================================================================
  // Question-by-Question Review Modal
  // =========================================================================
  function openReviewScreen(filter = "all") {
    audioManager.playClick();
    renderReviewList(filter);
    switchScreen(elements.reviewScreen);
  }

  function renderReviewList(filter = "all") {
    const letters = ["A", "B", "C", "D"];
    elements.reviewList.innerHTML = "";

    // Count badges
    const total = state.answersHistory.length;
    const right = state.answersHistory.filter(a => a.isCorrect).length;
    const wrong = total - right;

    elements.revCountAll.textContent = total;
    elements.revCountRight.textContent = right;
    elements.revCountWrong.textContent = wrong;

    const filtered = state.answersHistory.filter(item => {
      if (filter === "incorrect") return !item.isCorrect;
      if (filter === "correct") return item.isCorrect;
      return true;
    });

    if (filtered.length === 0) {
      elements.reviewList.innerHTML = `
        <div style="text-align:center; padding: 2.5rem; color: var(--text-muted);">
          No questions found matching this filter!
        </div>
      `;
      return;
    }

    filtered.forEach((item, idx) => {
      const q = item.question;
      const reviewItem = document.createElement("div");
      reviewItem.className = `review-item ${item.isCorrect ? "is-correct" : "is-wrong"}`;

      let userAnswerText = "Timed Out (No Answer)";
      if (item.selectedIndex >= 0) {
        userAnswerText = `${letters[item.selectedIndex]}: ${q.options[item.selectedIndex]}`;
      }

      const correctAnswerText = `${letters[q.correctIndex]}: ${q.options[q.correctIndex]}`;

      reviewItem.innerHTML = `
        <div class="review-q-header">
          <span class="category-badge">${escapeHTML(q.categoryName)}</span>
          <span>${item.isCorrect ? "✅ Correct" : (item.isTimeout ? "⏰ Timed Out" : "❌ Incorrect")} • ${item.timeSpent}s</span>
        </div>
        <div class="review-q-title">${escapeHTML(q.question)}</div>
        
        ${q.code ? `
          <div class="code-snippet-wrapper" style="margin: 0.5rem 0;">
            <pre><code class="code-content">${escapeHTML(q.code)}</code></pre>
          </div>
        ` : ""}

        <div class="review-answers-box">
          <div class="review-ans ${item.isCorrect ? "user-correct" : "user-incorrect"}">
            <strong>Your Answer:</strong> ${escapeHTML(userAnswerText)}
          </div>
          ${!item.isCorrect ? `
            <div class="review-ans actual-correct">
              <strong>Correct Answer:</strong> ${escapeHTML(correctAnswerText)}
            </div>
          ` : ""}
        </div>

        <div class="review-exp">
          <strong>💡 Explanation:</strong> ${formatExplanationText(q.explanation)}
        </div>
      `;

      elements.reviewList.appendChild(reviewItem);
    });
  }

  // =========================================================================
  // Utilities
  // =========================================================================
  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatExplanationText(text) {
    if (!text) return "";
    // Wrap backticked words in <code>
    return text.replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  // =========================================================================
  // Event Listeners (DOM & Keyboard Navigation)
  // =========================================================================

  // Difficulty Selector
  elements.diffBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      audioManager.playClick();
      elements.diffBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.difficulty = btn.dataset.difficulty;
    });
  });

  // Category Selector
  elements.categorySelect.addEventListener("change", (e) => {
    state.category = e.target.value;
  });

  // Question Count Selector
  elements.countBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      audioManager.playClick();
      elements.countBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.questionCount = parseInt(btn.dataset.count, 10);
    });
  });

  // Start Button
  elements.startBtn.addEventListener("click", startQuiz);

  // Next Question Button
  elements.nextBtn.addEventListener("click", nextQuestion);

  // Replay Button
  elements.replayBtn.addEventListener("click", () => {
    confetti.stop();
    startQuiz();
  });

  // Review Answers Button
  elements.reviewMistakesBtn.addEventListener("click", () => {
    confetti.stop();
    openReviewScreen("all");
  });

  // Change Settings Button
  elements.changeSettingsBtn.addEventListener("click", () => {
    confetti.stop();
    audioManager.playClick();
    switchScreen(elements.startScreen);
  });

  // Close Review Screen Button
  elements.closeReviewBtn.addEventListener("click", () => {
    audioManager.playClick();
    switchScreen(elements.resultsScreen);
  });

  // Review Screen Filter Tabs
  elements.reviewFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      audioManager.playClick();
      elements.reviewFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderReviewList(btn.dataset.filter);
    });
  });

  // Sound Toggle
  elements.soundToggle.addEventListener("click", () => {
    const isMuted = audioManager.toggleMute();
    applySoundIcon();
    if (!isMuted) audioManager.playClick();
  });

  // Theme Toggle
  elements.themeToggle.addEventListener("click", () => {
    audioManager.playClick();
    state.isDarkTheme = !state.isDarkTheme;
    localStorage.setItem("quizee_theme", state.isDarkTheme ? "dark" : "light");
    applyTheme();
  });

  // Keyboard Shortcuts (1-4 for options, Space/Enter for Next, M for Mute, Esc for close review)
  window.addEventListener("keydown", (e) => {
    // If typing in an input/select, don't trigger hotkeys
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

    // Toggle mute with 'm' or 'M'
    if (e.key === "m" || e.key === "M") {
      const isMuted = audioManager.toggleMute();
      applySoundIcon();
      return;
    }

    // Quiz Screen Hotkeys
    if (elements.quizScreen.classList.contains("active")) {
      // Keys 1, 2, 3, 4 to select options
      if (["1", "2", "3", "4"].includes(e.key) && !state.isAnswered) {
        const optionIndex = parseInt(e.key, 10) - 1;
        const optionBtns = elements.optionsGrid.querySelectorAll(".option-btn");
        if (optionBtns[optionIndex]) {
          optionBtns[optionIndex].click();
        }
      }

      // Space or Enter to proceed to next question once answered
      if ((e.code === "Space" || e.key === "Enter") && state.isAnswered) {
        e.preventDefault();
        nextQuestion();
      }
    }

    // Review Screen Esc hotkey to return to results
    if (elements.reviewScreen.classList.contains("active") && e.key === "Escape") {
      elements.closeReviewBtn.click();
    }
  });

  // Initialize display
  applyTheme();
  applySoundIcon();
  updateStartScreenBestRecords();
});

