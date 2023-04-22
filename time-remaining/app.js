let todayDate = new Date();
let submitBtn = document.querySelector('.submit');
let examDate = document.querySelector('#date');
let examName = document.querySelector('#exam-name');
let examDateDiv = document.querySelector('.exam-date-div');
let timeRemaining, days, hours, minutes;

window.onload = () => {
    examDateDiv.innerHTML = localStorage.getItem('exams');
    examDate.min = new Date().toISOString().split("T")[0];
}

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
            <p class = "title">${examName.value}</p>
            <p class = "time-remaning">${days} days , ${hours} hrs and ${minutes} mins remaning.</p>
            <button class = 'delete' onclick="dlt()">Delete</button>
        </div>`

        examDateDiv.innerHTML += (examData);
        localStorage.setItem('exams', examDateDiv.innerHTML);
        examDate.value = '';
        examName.value = ''
    }
})

const dlt = () => {
    let parent = event.target.parentNode;
    parent.remove();
    localStorage.setItem('exams', examDateDiv.innerHTML);
}