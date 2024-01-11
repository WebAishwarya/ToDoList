let pendingTask = [];
let completedTask = [];
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

//Add task in pending list
addTask = () => {
    const taskText = inputBox.value.trim();
    //console.log(taskText)
    if (taskText !== '') {
        pendingTask.push(taskText);
        renderPendingTasks();
        inputBox.value = '';
        inputBox.focus()
    }
    else {
        alert("You must enter task to do!");
        inputBox.focus()
    }
}

//Render pending task
const renderPendingTasks = () => {
    const pendinglist = document.getElementById('pendinglist');
    const existingTasks = pendinglist.querySelectorAll('li');

    existingTasks.forEach(task => task.remove());

    for (let i=0; i<pendingTask.length; i++) {
        const taskText = pendingTask[i];
        const newTask = document.createElement('span');
        newTask.innerHTML = `
        <li> ${taskText} 
        <div>
        <i class="fa-solid fa-square-check" onclick='completeTask(${i})'></i>
        <i class="fa-solid fa-pen-to-square" onclick='editTask(${i})'></i>
        <i class="fa-solid fa-trash" onclick="deleteTask('pending',${i})"></i>
        </div>
        </li>
        `;
        pendinglist.appendChild(newTask)
    }
}

function editTask(index) {
    const taskText = prompt('Edit the task :', pendingTask[index]);
    if (taskText !== null) {
        pendingTask[index] = taskText;
        renderPendingTasks();
    }
}

function completeTask(index) {
    const taskText = pendingTask[index];
    pendingTask.splice(index, 1);
    completedTask.push(taskText);
    renderPendingTasks();
    rendercompletedTask();

}

function deleteTask(listType, index) {
    if (listType === 'pending') {
        pendingTask.splice(index, 1);
        renderPendingTasks();
    }
    else if (listType === 'completed') {
        completeTask.splice(index, 1);
        rendercompletedTask();
    }    
}

//Render complete task
function rendercompletedTask() {
    const completeList = document.getElementById('completelist');
    const existingTasks = completeList.querySelectorAll('li');

    existingTasks.forEach(task => task.remove());
    
    for (let i=0; i<completedTask.length; i++) {
        const taskText = completedTask[i];
        const newTask = document.createElement('span');
        newTask.innerHTML = `
        <li> ${taskText}
        <div>
        <i class="fa-solid fa-trash" onclick='deleteTask('completed', ${i})'></i>
        </div>
        </li>
        `;
        completeList.appendChild(newTask)
    }
}