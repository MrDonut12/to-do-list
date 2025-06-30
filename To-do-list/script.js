document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-name-input");
  const priorityInput = document.getElementById("prioritize-input");
  const list = document.getElementById("list");
  const emptyMsg = document.getElementById("empty-msg");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
  updateEmptyMessage();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();
    const prioritize = priorityInput.value.trim();

    if (!text) return;

    const task = { text, prioritize, completed: false };
    tasks.push(task);
    addTaskToDOM(task);
    updateLocalStorage();
    updateEmptyMessage();

    taskInput.value = "";
    priorityInput.value = "Medium";
  });

  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.className = "li-item";
    span.innerHTML = `<strong class="MarkPri">${task.prioritize}</strong> <span class="li-text">${task.text}</span>`;

    if (task.completed) span.classList.add("completed");
    span.addEventListener("click", () => {
      task.completed = !task.completed;
      li.classList.toggle("completed");
      updateLocalStorage();
    });

    // Màu theo mức độ ưu tiên
    const mark = span.querySelector(".MarkPri");
    if (task.prioritize === "High") mark.style.color = "red";
    else if (task.prioritize === "Medium") mark.style.color = "orange";
    else if (task.prioritize === "Low") mark.style.color = "green";

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t !== task);
      li.remove();
      updateLocalStorage();
      updateEmptyMessage();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  }

  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateEmptyMessage() {
    if (list.querySelectorAll("li").length === 0) {
      emptyMsg.style.display = "block";
    } else {
      emptyMsg.style.display = "none";
    }
  }
});
