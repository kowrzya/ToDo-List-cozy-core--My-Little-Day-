"use strict";

const taskListEl = document.querySelector(".task-list");
const taskFormEl = document.querySelector(".task-form")
const progressCardEl = document.querySelector('.progress-card')

const demoTasks =[
  { id: "demo-1", text: "Finish homework", done: true },
  { id: "demo-2", text: "Go to the gym", done: false },
  { id: "demo-3", text: "Clean my desk", done: true },
  { id: "demo-4", text: " Read 10 pages ", done: false },
]


let tasks = loadTasks()

function addTask(tasks, text) {
  const newTasks = {
    id: crypto.randomUUID(),
    text,
    done: false,
  };
  return [...tasks, newTasks];
}

function loadTasks(){
  const saved = localStorage.getItem('tasks');
  return saved !== null? JSON.parse(saved) : demoTasks
}

function saveTasks(tasks){
  localStorage.setItem('tasks', JSON.stringify(tasks))
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
  saveTasks(tasks)
}

function handleToggleTask(id) {
  tasks = toggleTask(tasks, id)
  renderTasks(tasks)
  saveTasks(tasks)
}
function handleDeleteTask(id) {
  tasks = deleteTask(tasks, id)
  renderTasks(tasks)
  saveTasks(tasks)
}

function updateProgress(tasks){
  let taskCount = document.querySelector(".task-count")
  let progressSmall = document.querySelector(".progress-small")
  let progressPercent = document.querySelector('.progress-percent')
  const total = tasks.length
  const done = tasks.filter(task => task.done).length
  if (total === 0){
    progressPercent.textContent = `There are no tasks for now.`
    taskCount.textContent = ''
    progressSmall.textContent = ''
  } else{
    const percent = (done / total)*100
    progressSmall.textContent = `${done} of ${total} tasks completed`
    progressPercent.textContent = Math.round(percent) +  '%'
    taskCount.textContent = `${done}/${total}`
  }

}

taskListEl.addEventListener('click',(e)=>{
  
  if (e.target.classList.contains('delete-task')) {
    const li = e.target.closest('.task')
    handleDeleteTask(li.dataset.id)
    updateProgress(tasks)
  }

  if (e.target.classList.contains('task-checkbox')){
    const li = e.target.closest('.task')
    handleToggleTask(li.dataset.id)
    updateProgress(tasks)
  }
})

taskFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputEl = document.querySelector('.task-input')
  const text = inputEl.value
  if (text !== "" ){
    handleAddTask(text)
  }
  updateProgress(tasks)

  inputEl.value = ''
})

updateProgress(tasks)
renderTasks(tasks)
