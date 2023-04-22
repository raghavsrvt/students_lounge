const taskList = document.getElementById('task-list');
const taskInput = document.querySelector('input[type="text"]');
const taskDate = document.querySelector('#task-date');

const addButton = document.getElementById('add-button');

window.onload = () => {
  let savedTasks = localStorage.getItem('tasksList');
  taskList.innerHTML = savedTasks;
  taskDate.min = new Date().toISOString().split("T")[0];
}

addButton.addEventListener('click', () => {
  if (taskInput.value != ""){
    creatTask();
  }
  else {
    alert('Please type the task before adding it.')
  }
});

const creatTask = () => {
  let title = taskInput.value;
  let date = taskDate.value;
  const taskElement = document.createElement('li');
  taskElement.classList.add('task');
  taskElement.innerHTML = `
        <div class = "left">
        <div class = "div-1">
        <input type="checkbox" onclick="checkedBtn()" class="checkBox">
        </div>
        <div class = "div-2">
        <p class = "title" contenteditable="false">${title}</p>
        <input type="date" value='${date}' disabled class='date'>
        </div>
        </div>
        <div class = "right">
        <button class = "edit" onclick="edit()">Edit</button>
        <button class = "delete" onclick = "dlt()">Delete</button>
        </div>
        `;

  taskList.appendChild(taskElement);
  taskInput.value = ''; 
  taskDate.value = '';

  localStorage.setItem('tasksList', taskList.innerHTML);
}

const edit = () => {
  let parent = (event.target.parentNode).parentNode;
  let title = parent.querySelector('.title');
  let editBtn = parent.querySelector('.edit');
  let date = parent.querySelector('.date');

  if (title.contentEditable == 'false') {

    title.classList.add('edit-title');
    title.contentEditable = true;
    title.focus();
    date.removeAttribute('disabled');
    editBtn.innerText = 'Save';

  } else {
    if(title.value == null){
      alert('Due this task being empty, it will be deleted.')
      dlt();
    }
    title.classList.remove('edit-title');
    title.contentEditable = false;
    date.setAttribute('disabled', 'disabled');
    date.setAttribute('value' , date.value);
    editBtn.innerText = 'Edit';
    localStorage.setItem('tasksList', taskList.innerHTML);
  }

}

const dlt = () => {
  let parent = (event.target.parentNode).parentNode;
  parent.remove();
  localStorage.setItem('tasksList', taskList.innerHTML);
}

const checkedBtn = () => {
  let parent = (event.target.parentNode).parentNode;
  let title = parent.querySelector('.title');
  if (parent.querySelector('.checkBox').checked) {
    title.classList.add('checked');
    parent.querySelector('.checkBox').setAttribute('checked', 'checked');
    localStorage.setItem('tasksList', taskList.innerHTML);
  }
  if (!parent.querySelector('.checkBox').checked && title.classList.contains('checked')) {
    title.classList.remove('checked');
    parent.querySelector('.checkBox').removeAttribute('checked', 'checked');
    localStorage.setItem('tasksList', taskList.innerHTML);
  }
}