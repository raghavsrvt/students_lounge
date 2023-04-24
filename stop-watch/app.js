let hours = document.querySelector('.hour');
let min = document.querySelector('.min');
let sec = document.querySelector('.sec');
let startBtn = document.querySelector('.start');
let stopBtn = document.querySelector('.stop');
let resetBtn = document.querySelector('.reset');

let achivementDiv = document.querySelector('.achievement');
let achievementHr = document.querySelector('.ach-hr');
let achievementImg = document.querySelector('.ach-img');

let secNum = 0;
let minNum = 0;
let hourNum = 0;

window.onload = ()=>{
    secNum = 0;
    minNum = 0;
    hourNum = 0;

    sec.innerHTML = '00';
    min.innerHTML = '00';
    hours.innerHTML = '00';

    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    resetBtn.setAttribute('disabled', 'disabled');
}

var startBtnInterval;

startBtn.addEventListener('click', () => {
    startBtnInterval = setInterval(function () {
        achievementDisplay();
        stopBtn.removeAttribute('disabled');
        resetBtn.setAttribute('disabled', 'disabled');
        secNum += 1;
        addSec();
        if(secNum==60){
            sec.innerHTML = '00'
            secNum = 0;
            minNum += 1; 
            addMin();
        }
        if(minNum == 60){
            min.innerHTML = '00'
            minNum = 0;
            hourNum += 1;
            addHour();
        }
        startBtn.setAttribute('disabled', 'disabled');
    }, 1000)
});

stopBtn.addEventListener('click', ()=>{
    clearInterval(startBtnInterval);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    resetBtn.removeAttribute('disabled');
})

resetBtn.addEventListener('click', ()=>{
    resetBtn.setAttribute('disabled', 'disabled');
    secNum = 0;
    minNum = 0;
    hourNum = 0;

    sec.innerHTML = '00';
    min.innerHTML = '00';
    hours.innerHTML = '00';
})

const addSec = ()=>{
    if(secNum<=9){
        sec.innerHTML = '0'+ secNum;
    }
    else{
        sec.innerHTML = secNum;
    }
}
const addMin = ()=>{
    if(minNum<=9){
        min.innerHTML = '0'+ minNum;
    }
    else{
        min.innerHTML = minNum;
    }
}
const addHour = ()=>{
    if(hourNum<=9){
        hours.innerHTML = '0'+ hourNum;
    }
    else{
        hours.innerHTML = hourNum;
    }
}

const achievementDisplay = () =>{
    if(hourNum == 0 && minNum == 30){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "30 minutes";
            achievementImg.setAttribute('src' , '../img/stop-watch/1.png');
        }
        if(secNum == 6){hidden();}
    }
    else if(hourNum == 1 && minNum == 0){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "1 Hour";
            achievementImg.setAttribute('src' , '../img/stop-watch/2.png');
        }
        if(secNum == 6){hidden();}
    }
    else if(hourNum == 1 && minNum == 30){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "1hr 30min";
            achievementImg.setAttribute('src' , '../img/stop-watch/3.png');
        }
        if(secNum == 6){hidden();}
    }
    else if(hourNum == 2 && minNum == 0){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "2 Hours";
            achievementImg.setAttribute('src' , '../img/stop-watch/4.png');
        }
        if(secNum == 6){hidden();}
    }
    else if(hourNum == 2 && minNum == 30){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "2hr 30min";
            achievementImg.setAttribute('src' , '../img/stop-watch/5.png');
        }
        if(secNum == 6){hidden();}
    }
    else if(hourNum == 3 && minNum == 0){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "3 hours";
            achievementImg.setAttribute('src' , '../img/stop-watch/6.png');
        }
        if(secNum == 6){hidden();}
    }
    else if(hourNum == 4 && minNum == 0){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "4 Hours";
            achievementImg.setAttribute('src' , '../img/stop-watch/7.png');
        }
        if(secNum == 6){hidden();}
    }
    else if(hourNum == 5 && minNum == 0){
        if(secNum == 0){
            achivementDiv.classList.toggle('hidden');
            achievementHr.innerText = "5 Hours";
            achievementImg.setAttribute('src' , '../img/stop-watch/8.png');
        }
        if(secNum == 6){hidden();}
    }
};

const hidden = ()=>{
    achivementDiv.classList.toggle('hidden');
}