// Task Planner with Reward System
let taskCount = 0;

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value;
  if (task.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = task;
    document.getElementById("taskList").appendChild(li);
    input.value = "";
    taskCount++;

    showQuote();

    if (taskCount % 3 === 0) {
      showReward();
    }
  }
}

// Pomodoro Timer
let timer;
let timeLeft = 25 * 60;

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Break time!");
    } else {
      timeLeft--;
      const min = Math.floor(timeLeft / 60);
      const sec = timeLeft % 60;
      document.getElementById("timer").textContent =
        `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  document.getElementById("timer").textContent = "25:00";
}

// Quotes & Rewards
const quotes = [
  "Stay focused, stay sharp 💪",
  "Discipline > Motivation.",
  "Small progress is still progress.",
  "You're closer than you think.",
];

function showQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteBox").textContent = quotes[random];
}

function showReward() {
  const popup = document.createElement("div");
  popup.className = "reward-popup";
  popup.innerHTML = "🎉 You’ve earned a Focus Reward!";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}
// Theme Toggle
const themeBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "🌙 Switch to Light";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "🌙 Switch to Light";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌞 Switch to Dark";
  }
});
