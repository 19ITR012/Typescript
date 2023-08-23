// Get references to DOM elements
//@ts-nocheck
var addTaskButton = document.querySelector(".addbtn button");
var taskList = document.querySelector(".task-list");
// Track existing task texts
var existingTaskTexts = new Set();
// Add new task
addTaskButton.addEventListener("click", function () {
    var newTaskText = document.getElementById("newtask").value.trim();
    if (newTaskText) {
        if (existingTaskTexts.has(newTaskText)) {
            alert("Task already exists!");
        }
        else {
            existingTaskTexts.add(newTaskText);
            var taskItem = createTaskItem(newTaskText);
            taskList.appendChild(taskItem);
            document.getElementById("newtask").value = ""; // Clear input
        }
    }
});
// Create a new task item
function createTaskItem(taskText) {
    //create the Row
    var taskItem = document.createElement("div");
    taskItem.className = "task-item";
    console.log(taskItem);
    //Display the checkbox
    var taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.className = "task-checkbox";
    //Display the added task
    var taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskTextElement.className = "task-text";
    //Display the dropdown
    var taskStatusDropdown = document.createElement("select");
    taskStatusDropdown.className = "task-status";
    var statusOptions = ["Incomplete", "In Progress", "Complete"];
    for (var _i = 0, statusOptions_1 = statusOptions; _i < statusOptions_1.length; _i++) {
        var status = statusOptions_1[_i];
        var option = document.createElement("option");
        option.textContent = status;
        taskStatusDropdown.appendChild(option);
    }
    //Display the Delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
        taskItem.remove();
    });
    //Auto change when value in dropdown is complete
    taskStatusDropdown.addEventListener("change", function () {
        if (taskStatusDropdown.value === "Complete") {
            taskTextElement.style.textDecoration = "line-through";
            taskCheckbox.checked = true;
        }
        else {
            taskTextElement.style.textDecoration = "none";
            taskCheckbox.checked = false;
            taskCheckbox.style.display = "block";
        }
    });
    //Auto change when the checkbox is true
    taskCheckbox.addEventListener("change", function () {
        if (taskCheckbox.checked) {
            taskTextElement.style.textDecoration = "line-through";
            taskStatusDropdown.value = "Complete";
        }
        else {
            taskTextElement.style.textDecoration = "none";
            taskCheckbox.style.display = "block";
            taskStatusDropdown.value = "Incomplete";
        }
    });
    //Returning the Items
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(taskStatusDropdown);
    taskItem.appendChild(deleteButton);
    return taskItem;
}
// Delete function
function deleteTask(taskText) {
    existingTaskTexts.delete(taskText);
}
// Event delegation for handling delete button clicks
taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        var taskItem = event.target.closest(".task-item");
        var taskTextElement = taskItem.querySelector(".task-text");
        var taskText = taskTextElement.textContent.trim();
        deleteTask(taskText);
        taskItem.remove();
    }
});
// Search function
var searchInput = document.querySelector(".search input[name='search']");
searchInput.addEventListener("input", function () {
    var searchTerm = this.value.trim().toLowerCase();
    var taskItems = document.querySelectorAll(".task-item");
    if (searchTerm === "") {
        // If the search term is empty, show all task items
        taskItems.forEach(function (taskItem) {
            taskItem.style.display = "flex";
        });
    }
    else {
        // If there's a search term, show matching tasks and hide non-matching tasks
        taskItems.forEach(function (taskItem) {
            var taskTextElement = taskItem.querySelector(".task-text");
            var taskText = taskTextElement.textContent.toLowerCase();
            if (taskText.includes(searchTerm)) {
                taskItem.style.display = "flex"; // Show matching tasks
            }
            else {
                taskItem.style.display = "none"; // Hide non-matching tasks
            }
        });
    }
});
