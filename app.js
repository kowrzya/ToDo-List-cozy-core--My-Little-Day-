"use strict";
const taskListEl = document.querySelector(".task-list");
const taskFormEl = document.querySelector(".task-form")

let tasks = [
  { id: crypto.randomUUID(), text: "Купить молоко", done: false },
  { id: crypto.randomUUID(), text: "Помыть посуду", done: false },
];  

function addTask(tasks, text) {
  const newTasks = {
    id: crypto.randomUUID(),
    text,
    done: false,
  };
  return [...tasks, newTasks];
}

function deleteTask(tasks, id) {
  const newTask = tasks.filter((task) => {
    return task.id !== id;
  });
  return newTask;
}


function toggleTask(tasks, id) {
  const newTask = tasks.map((task) => {
    return task.id === id ? { ...task, done: !task.done } : task;
  });
  return newTask;
}

function createTaskHTML(task) {
  return `
    <li class = " ${task.done ? "task completed" : "task"}" data-id = "${task.id}" >
    <button class="task-checkbox"> ${task.done ? "✓" : "*"}</button>
    <span class="task-text">${task.text}</span>
    <span class="task-time"> ${task.done ? "done" : ""}</span>
    <button class="delete-task">×</button>
    </li>`;
}

function renderTasks(tasks){
    const html = tasks.map((task) => createTaskHTML(task)).join('')
    taskListEl.innerHTML = html
}


function handleAddTask(text) {
  tasks = addTask(tasks, text)
  renderTasks(tasks)
}

function handleToggleTask(id) {
  tasks = toggleTask(tasks, id)
  renderTasks(tasks)
}
function handleDeleteTask(id) {
  tasks = deleteTask(tasks, id)
  renderTasks(tasks)
}


taskListEl.addEventListener('click',(e)=>{
  
  if (e.target.classList.contains('delete-task')) {
    const li = e.target.closest('.task')
    handleDeleteTask(li.dataset.id)
    
  }

  if (e.target.classList.contains('task-checkbox')){
    const li = e.target.closest('.task')
    handleToggleTask(li.dataset.id)
  }
})

taskFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputEl = document.querySelector('.task-input')
  const text = inputEl.value
  if (text !== "" ){
    handleAddTask(text)
  }

  inputEl.value = ''
})

console.log(JSON.stringify(tasks))
