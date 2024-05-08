
// Function to retrieve tasks from local storage
 function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks === null ? [] : tasks;
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Function for printing updated values
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

    const div = document.createElement('div');
    div.classList.add('task-container');

        
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-button'); // Add the edit-button class
    editButton.addEventListener('click', () => editTask(task.id, li));
    div.appendChild(editButton);

    // Check if the task is completed and add class accordingly
    if (task.completed) 
    {
        li.classList.add('completed');
        const completedButton = document.createElement('button');
        completedButton.textContent = 'Completed';
        completedButton.classList.add('completed-button');
        div.appendChild(completedButton);
    } 
    else 
    {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-button'); // Add a class to the button
        completeButton.addEventListener('click', () => toggleTaskCompletion(task.id));
        div.appendChild(completeButton);
    }

    // Inside the renderTasks() function where you create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-button'); // Add the delete-button class
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    div.appendChild(deleteButton);
    div.style.display="flex";
        
        
    li.appendChild(div);
    taskList.appendChild(li);
    });
}


function editTask(taskId, taskElement) {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    // Create an input field with the existing task text
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = tasks[taskIndex].text;
    inputField.classList.add('edit-input'); // Add a class to style the input field

    // Replace the task text with the input field
    taskElement.textContent = '';
    taskElement.appendChild(inputField);

    // Focus on the input field for immediate editing
    inputField.focus();

    // Add a "Save Changes" button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Changes';
    saveButton.classList.add('save-button');
    taskElement.appendChild(saveButton);

    // Save the edited task text on button click
    saveButton.addEventListener('click', () => {
      const editedText = inputField.value;
      tasks[taskIndex].text = editedText;
      tasks[taskIndex].completed = false;
      saveTasks(tasks);
      renderTasks();

      // Remove the input field and save button after saving
      inputField.remove();
      saveButton.remove();
      taskElement.textContent = editedText;
    });
  }
}


function deleteTask(taskId) {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        taskElement.remove();
    }
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId); // Filter out the task to be deleted
    saveTasks(updatedTasks); // Save the updated tasks to local storage
    renderTasks(); // Re-render the task list
}



// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const tasks = getTasks();
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks(tasks);
        renderTasks();
        taskInput.value = '';
    }
}

// Function to toggle task completion status
function toggleTaskCompletion(id) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks(tasks);
        renderTasks();
    }
}