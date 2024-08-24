// Add task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <span>${taskText}</span>
            <div class="actions">
                <button class="edit" onclick="editTask(this)">Edit</button>
                <button class="delete" onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}

// Edit task in place
function editTask(button) {
    const listItem = button.parentElement.parentElement;
    const taskSpan = listItem.querySelector('span');

    const currentText = taskSpan.textContent;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;
    inputField.className = 'edit-input';

    // Replace the task text with the input field
    listItem.replaceChild(inputField, taskSpan);

    // Change the Edit button to a Save button
    button.textContent = 'Save';
    button.onclick = function () {
        saveTask(this, inputField);
    };

    // Listen for Enter key to save the task
    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            saveTask(button, inputField);
        }
    });

    // Focus the input field and select its text
    inputField.focus();
    inputField.select();
}

// Save the edited task
function saveTask(button, inputField) {
    const listItem = button.parentElement.parentElement;
    const newTaskText = inputField.value.trim();

    if (newTaskText !== '') {
        const taskSpan = document.createElement('span');
        taskSpan.textContent = newTaskText;

        // Replace the input field with the updated task text
        listItem.replaceChild(taskSpan, inputField);

        // Change the Save button back to an Edit button
        button.textContent = 'Edit';
        button.onclick = function () {
            editTask(this);
        };
    }
}

// Delete task
function deleteTask(button) {
    const listItem = button.parentElement.parentElement;
    listItem.remove();
}
