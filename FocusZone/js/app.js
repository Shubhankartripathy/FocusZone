// --- FocusZone Enhanced App ---
let taskCount = 0;
let timer;
let timeLeft = 25 * 60;

// 🧠 Load tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    addTaskToList(task);
  });
};

// Add new task
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task !== "") {
    addTaskToList(task);
    saveTaskToStorage(task);
    taskCount++;
    showQuote();
    if (taskCount % 3 === 0) {
      showReward();
    }
    input.value = "";
  }
}

// Display task on screen
function addTaskToList(task) {
  const li = document.createElement("li");
  li.textContent = task;
  document.getElementById("taskList").appendChild(li);
}

// Save to localStorage
function saveTaskToStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Timer logic
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Time's up! Take a break!");
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

// Motivation quote
const quotes = [
  "Stay focused, stay sharp 💪",
  "Discipline > Motivation.",
  "Small progress is still progress.",
  "You're closer than you think.",
  "Consistency beats talent.",
];

function showQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteBox").textContent = quotes[random];
}

// Reward popup
function showReward() {
  const popup = document.createElement("div");
  popup.className = "reward-popup animate";
  popup.innerHTML = "🎉 You’ve earned a Focus Reward!";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("fade-out");
    setTimeout(() => popup.remove(), 500);
  }, 2000);
}

// Theme toggle
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "🌙 Switch to Light";
}
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙 Switch to Light" : "🌞 Switch to Dark";
});
