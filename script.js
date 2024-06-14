document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addButton").addEventListener("click", addTask);
    document.getElementById("taskInput").addEventListener("input", suggestAIResponse);
    updateTaskStats();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("taskList");

    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.classList.add("task-text");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete");
    completeButton.onclick = () => toggleCompleteTask(listItem);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.onclick = () => deleteTask(listItem);

    listItem.appendChild(taskSpan);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = "";
    updateTaskStats();
}

function toggleCompleteTask(listItem) {
    listItem.classList.toggle("completed");
    updateTaskStats();
}

function deleteTask(listItem) {
    listItem.remove();
    updateTaskStats();
}

function updateTaskStats() {
    const taskList = document.getElementById("taskList");
    const tasks = taskList.getElementsByTagName("li");
    const totalTasks = tasks.length;
    const completedTasks = taskList.getElementsByClassName("completed").length;

    const taskStats = document.getElementById("taskStats");
    taskStats.textContent = `Total tasks: ${totalTasks} | Completed tasks: ${completedTasks}`;
}

function suggestAIResponse() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim().toLowerCase();

    const aiResponse = document.getElementById("aiResponse");

    if (taskText === "") {
        aiResponse.style.display = "none";
        return;
    }

    let response = generateAIResponse(taskText);

    if (response) {
        aiResponse.textContent = `AI Response: ${response}`;
        aiResponse.style.display = "block";
    } else {
        aiResponse.style.display = "none";
    }
}

function filterTasks(filter) {
    const taskList = document.getElementById("taskList");
    const tasks = taskList.getElementsByTagName("li");

    Array.from(tasks).forEach(task => {
        switch (filter) {
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
                break;
            default:
                task.style.display = 'flex';
                break;
        }
    });
}

function changeColorTheme(theme) {
    const container = document.querySelector('.container');
    container.className = 'container'; // Reset class

    switch (theme) {
        case 'blue':
            container.classList.add('blue-theme');
            break;
        case 'green':
            container.classList.add('green-theme');
            break;
        case 'purple':
            container.classList.add('purple-theme');
            break;
        default:
            // Default theme or reset to original
            break;
    }
}