const API_URL = "http://localhost:8000/tasks";

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

async function fetchTasks(query = {}) {
  if (!localStorage.token) {
    window.location.href = "login.html";
  }
  try {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`${API_URL}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const data = await response.json();
    displayTasks(data.tasks);
    document.getElementById("filterForm").reset();
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}
function displayTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the list
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow";

    li.innerHTML = `
      <div>
        <h3 class="font-bold text-lg">${task.title}</h3>
        <p class="text-sm text-gray-600">Priority: ${task.priority}</p>
        <p class="text-sm text-gray-600">Deadline: ${new Date(
          task.deadline
        ).toLocaleDateString()}</p>
      </div>
      <button
        onclick="deleteTask('${task._id}')"
        class="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete
      </button>
    `;

    taskList.appendChild(li);
  });
}

document
  .getElementById("createTaskForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({ title, priority, deadline }),
      });

      if (response.ok) {
        alert("Task created successfully!");
        fetchTasks();
        document.getElementById("createTaskForm").reset();
      } else {
        alert("Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  });

async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (response.ok) {
      alert("Task deleted successfully!");
      fetchTasks(); // Refresh the task list
    } else {
      alert("Failed to delete task.");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

document.getElementById("filterForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const search = document.getElementById("search").value;
  const priority = document.getElementById("filterPriority").value;
  const dueBefore = document.getElementById("filterDeadline").value;

  const query = {};
  if (search) query.search = search;
  if (priority) query.priority = priority;
  if (dueBefore) query.dueBefore = dueBefore;

  fetchTasks(query);
});

document.addEventListener("DOMContentLoaded", fetchTasks);
