// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

// Add task button
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  
  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  addTaskToDOM(task);
  taskInput.value = '';
});

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.completed) li.classList.add('completed');

  // Complete task on click
  li.addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t !== task);
    saveTasks();
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
