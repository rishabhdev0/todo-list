let tasks = [];

const loadTasks = () => {
  const storedTask = localStorage.getItem('tasks');
  if (storedTask) {
    tasks = JSON.parse(storedTask); 
  }
  updateTaskList(); 
  updateStats(); 
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    updateTaskList();
    updateStats(); 
    taskInput.value = ''; 
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateStats(); 
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats(); 
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById('taskInput');
  taskInput.value = tasks[index].text;
  deleteTask(index); 
  saveTasks();
};

const updateStats = () => {
  const completeTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
  const progressBar = document.getElementById('progress');
  progressBar.style.width = `${progress}%`; 

  
  document.getElementById('numbers').innerText = `${completeTasks}/${totalTasks}`;
  const messageElement = document.getElementById('message');
  if (completeTasks === totalTasks && totalTasks > 0) {
    messageElement.innerText = "Nice job! you completed all your task";
  } else {
    messageElement.innerText = ""; 
  }
};

const updateTaskList = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; 
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('taskItems');
    
    listItem.innerHTML = `
      <div class="task" ${task.completed ? 'completed' : ''}>
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ''} />
        <p>${task.text}</p>
      </div>
      <div class="icons">
        <img src="edit.png" onClick="editTask(${index})" />
        <img src="bin.png" onClick="deleteTask(${index})" />
      </div>
    `;

    const checkbox = listItem.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
      toggleTaskComplete(index);  
    });

    taskList.append(listItem);
  });
};


window.onload = () => {
  loadTasks(); 
};


document.getElementById('newTask').addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});
