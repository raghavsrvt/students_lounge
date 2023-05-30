// Experience
let xpEl = document.querySelector('.xp-points');
let xpAnmtn = document.querySelector('.xp-points-disp');
var xpNum;

const disXP = (val , sign) =>{
    localStorage.setItem('xpNum' , xpNum);
    xpAnmtn.innerText = val;
    if(sign == '+'){
        xpAnmtn.classList.add('xp-add');
        let tht = setTimeout(()=>
        {
            xpAnmtn.classList.remove('xp-add');
            xpEl.innerText = xpNum;
        }
        , 425)
    }
    else{
        xpAnmtn.classList.add('xp-rm');
        let tht = setTimeout(()=>
        {
            xpAnmtn.classList.remove('xp-rm');
            xpEl.innerText = xpNum;
        }
        , 425)
    }
}

// Resources-Saver
let submitBtnRes = document.querySelector('.submitBtn');
let resourcesDiv = document.querySelector('.resources-div');
let resourceTitle = document.querySelector('#resource-title');
let resourceUrl = document.querySelector('#resource-url');
(resourceUrl.value).type = 'url';


window.onload = () => {
    // Xp
    if(localStorage.getItem('xpNum') != null){
        xpNum = Number(localStorage.getItem('xpNum'));
        xpEl.innerText = xpNum;
    }
    else{
        xpNum = 0;
    }

    // Resources
    resourcesDiv.innerHTML = localStorage.getItem('resources');

    // Stop-Watch
    secNum = 0;
    minNum = 0;
    hourNum = 0;

    sec.innerHTML = '00';
    min.innerHTML = '00';
    hrs.innerHTML = '00';

    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    resetBtn.setAttribute('disabled', 'disabled');

    // Time-Remaining
    fetchExams()

    // To-Do

    let savedTasks = localStorage.getItem('tasksList');
    taskList.innerHTML = savedTasks;
    taskDate.min = new Date().toISOString().split("T")[0];
}

// Resources
submitBtnRes.addEventListener('click', () => {
    if ((resourceTitle.value == null || resourceTitle.value == '') || (resourceUrl.value == null || resourceUrl.value == '')) {
        alert('Please fill all the required input fields.');
    }
    else if (isUrl(resourceUrl.value) == false) {
        alert(`Please enter a valid URL.\nMake sure to include full URL including "https"`);
    }
    else {
        let resourcesTitle = `
        <div class = 'resource-title'>
            <a class = "resourceTitleName" href="${resourceUrl.value}" target="_blank">${resourceTitle.value}</a>
            <button class = 'delete' onclick="dltRes()"><img src="./img/delete-icon.svg" alt=""></button>
        </div>`

        resourcesDiv.innerHTML += (resourcesTitle);
        localStorage.setItem('resources', resourcesDiv.innerHTML);
        resourceTitle.value = '';
        resourceUrl.value = ''
    }
})

const dltRes = () => {
    let parent = (event.target.parentNode).parentNode;
    parent.remove();
    localStorage.setItem('resources', resourcesDiv.innerHTML);
}

const isUrl = (string) => {
    try { return Boolean(new URL(string)); }
    catch (e) { return false; }
}

// Time-Remaining
let todayDate = new Date();
let submitBtn = document.querySelector('.submit');
let examDate = document.querySelector('#date');
let examName = document.querySelector('#exam-name');
let examDateDiv = document.querySelector('.exam-date-div');
let timeRemaining, days, hours, minutes;

submitBtn.addEventListener('click', () => {
    if ((examDate.value == null || examDate.value == '') || (examName.value == null || examName.value == '')) {
        alert('Please fill all the required input fields.');
    }
    else if (timeRemaining = ((examDate.valueAsDate).getTime() - todayDate.getTime()) <= 0) {
        alert('Please choose a date that is in the future.')
    }
    else {
        let examDateData = examDate.valueAsDate;
        timeRemaining = (examDateData.getTime() - todayDate.getTime());
        days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        let examData = `
        <div class = 'exam-title'>
            <p class = "examDateAsValue hidden">${examDateData}</p>
            <p class = "examTitleName">${examName.value}</p>
            <p class = "time-remaning">${days} days , ${hours} hrs and ${minutes} mins remaining.</p>
            <button class = 'delete' onclick="dlt()"><img src="./img/delete-icon.svg" alt=""></button>
        </div>`;

        examDateDiv.innerHTML += (examData);
        localStorage.setItem('exams', examDateDiv.innerHTML);
        examDate.value = '';
        examName.value = ''
    }
})

const dlt = () => {
    let parent = (event.target.parentNode).parentNode;
    parent.remove();
    localStorage.setItem('exams', examDateDiv.innerHTML);
}

const fetchExams = () => {
    examDateDiv.innerHTML = localStorage.getItem('exams');
    let title = document.querySelectorAll('.examTitleName');

    title.forEach((element) => {
        let parent = (element.parentNode);
        let tempDate = (parent.querySelector('.examDateAsValue').innerHTML)
        let examDateAsValue = new Date(tempDate);
        let timeRemainingEl = parent.querySelector('.time-remaning');
        timeRemaining = (examDateAsValue.getTime() - todayDate.getTime());
        days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        if(days<0 || hours<0 || minutes<0){
            let parentNode = document.querySelector('.exam-date-div');
            parentNode.removeChild(parent);
            localStorage.setItem('exams', examDateDiv.innerHTML);
        }
        else{
            timeRemainingEl.innerHTML = `${days} days , ${hours} hrs and ${minutes} mins remaining.`;
        }
    })

    examDate.min = new Date().toISOString().split("T")[0];
}

// StopWatch
let documentTitle = document.querySelector('#document-title')

let hrs = document.querySelector('.hour');
let min = document.querySelector('.min');
let sec = document.querySelector('.sec');
let startBtn = document.querySelector('.start');
let stopBtn = document.querySelector('.stop');
let resetBtn = document.querySelector('.reset');

let secNum = 0;
let minNum = 0;
let hourNum = 0;

var startBtnInterval;

var secText = '00';
var minText = '00';
var hourText = '00';

startBtn.addEventListener('click', () => {
    startBtnInterval = setInterval(function () {
        stopWatchXpDisplay()
        stopBtn.removeAttribute('disabled');
        resetBtn.setAttribute('disabled', 'disabled');
        secNum += 1;
        addSec();
        if (secNum == 60) {
            sec.innerHTML = '00'
            secText = '00';
            secNum = 0;
            minNum += 1;
            addMin();
        }
        if (minNum == 60) {
            min.innerHTML = '00'
            minText = '00';
            minNum = 0;
            hourNum += 1;
            addHour();
        }
        documentTitle.innerText = `${hourText}:${minText}:${secText} | Student's Lounge | Boost your productivity!`
        startBtn.setAttribute('disabled', 'disabled');
    }, 1000)
});

stopBtn.addEventListener('click', () => {
    clearInterval(startBtnInterval);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    resetBtn.removeAttribute('disabled');
})

resetBtn.addEventListener('click', () => {
    resetBtn.setAttribute('disabled', 'disabled');
    secNum = 0;
    minNum = 0;
    hourNum = 0;

    sec.innerHTML = '00';
    min.innerHTML = '00';
    hrs.innerHTML = '00';

    documentTitle.innerText = "Student's Lounge | Boost your productivity!"
})

const addSec = () => {
    if (secNum <= 9) {
        sec.innerHTML = '0' + secNum;
        secText = '0' + secNum;
    }
    else {
        sec.innerHTML = secNum;
        secText = secNum;
    }
}
const addMin = () => {
    if (minNum <= 9) {
        min.innerHTML = '0' + minNum;
        minText = '0' + minNum;
    }
    else {
        min.innerHTML = minNum;
        minText = minNum;
    }
}
const addHour = () => {
    if (hourNum <= 9) {
        hrs.innerHTML = '0' + hourNum;
        hourText = '0' + hourNum
    }
    else {
        hrs.innerHTML = hourNum;
        hourText = hourNum;
    }
}

const stopWatchXpDisplay = () => {
    if (hourNum == 0 && minNum == 30) {
        if (secNum == 0) {
            xpNum += 20;
            disXP('+20', '+');
        }
    }
    else if (hourNum == 1 && minNum == 0) {
        if (secNum == 0) {
            xpNum += 30;
            disXP('+30', '+');
        }
    }
    else if (hourNum == 1 && minNum == 30) {
        if (secNum == 0) {
            xpNum += 50;
            disXP('+50', '+');
        }
    }
    else if (hourNum == 2 && minNum == 0) {
        if (secNum == 0) {
            xpNum += 80;
            disXP('+80', '+');
        }
    }
    else if (hourNum == 2 && minNum == 30) {
        if (secNum == 0) {
            xpNum += 120;
            disXP('+120', '+');
        }
    }
    else if (hourNum == 3 && minNum == 0) {
        if (secNum == 0) {
            xpNum += 170;
            disXP('+170', '+');
        }
    }
    else if (hourNum == 4 && minNum == 0) {
        if (secNum == 0) {
            xpNum += 230;
            disXP('230', '+');
        }
    }
    else if (hourNum == 5 && minNum == 0) {
        if (secNum == 0) {
            xpNum += 300;
            disXP('300', '+');
        }
    }
};

// To-Do
const taskList = document.getElementById('task-list');
const taskInput = document.querySelector('#input-text-field');
const taskDate = document.querySelector('#task-date')

const addButton = document.getElementById('add-button');

addButton.addEventListener('click', () => {
    if (taskInput.value != "") {
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
        <div class = "task-left">
        <div class = "task-div-1">
        <input type="checkbox" onclick="checkedBtn()" class="checkBox">
        </div>
        <div class = "task-div-2">
        <p class = "toDoTitle" contenteditable="false">${title}</p>
        <input type="date" value='${date}' disabled class='date' placeholder='dd / mm / yyyy' required>
        </div>
        </div>
        <div class = "task-right">
        <button class = "edit" onclick="edit()"><img src="./img/edit-icon.svg" alt=""></button>
        <button class = "deleteTask delete" onclick = "dltTask()"><img src="./img/delete-icon.svg" alt=""></button>
        </div>
        `;

    taskList.appendChild(taskElement);
    taskInput.value = '';
    taskDate.value = '';

    localStorage.setItem('tasksList', taskList.innerHTML);
}

const edit = () => {
    let parent = ((event.target.parentNode).parentNode).parentNode;
    let title = parent.querySelector('.toDoTitle');
    let editBtn = parent.querySelector('.edit');
    let date = parent.querySelector('.date');

    if (title.contentEditable == 'false') {

        title.classList.add('edit-title');
        title.contentEditable = true;
        title.focus();
        date.removeAttribute('disabled');
        editBtn.innerHTML = `<img src="./img/save-icon.svg" alt="">`;

    } else {
        if (title.innerHTML == `<br>`) {
            alert('As this task is empty, it will be deleted.');
            dltTask();
        }
        title.classList.remove('edit-title');
        title.contentEditable = false;
        date.setAttribute('disabled', 'disabled');
        date.setAttribute('value', date.value);
        editBtn.innerHTML = `<img src="./img/edit-icon.svg" alt="">`;
        localStorage.setItem('tasksList', taskList.innerHTML);
    }

}

const dltTask = () => {
    let parent = ((event.target.parentNode).parentNode).parentNode;
    parent.remove();
    localStorage.setItem('tasksList', taskList.innerHTML);
}

const checkedBtn = () => {
    let parent = ((event.target.parentNode).parentNode).parentNode;
    let title = parent.querySelector('.toDoTitle');
    if (parent.querySelector('.checkBox').checked) {
        xpNum+=50;
        disXP('+50', '+')
        title.classList.add('checked');
        parent.querySelector('.checkBox').setAttribute('checked', 'checked');
        localStorage.setItem('tasksList', taskList.innerHTML);
    }
    if (!parent.querySelector('.checkBox').checked && title.classList.contains('checked')) {
        xpNum-=50;
        disXP('-50', '-')
        title.classList.remove('checked');
        parent.querySelector('.checkBox').removeAttribute('checked', 'checked');
        localStorage.setItem('tasksList', taskList.innerHTML);
    }
}

// PWA
// Register a serviceWorker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("https://raghavsrvt.github.io/students_lounge/service-worker.js");
}