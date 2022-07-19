const inputContainer = document.getElementById('input-container');
const formEl = document.getElementById('form');
const dateEl = document.getElementById('date-picker');

const countDown = document.getElementById('countdown');
const countTitle = document.getElementById('countdown-title');
const timeEl = document.querySelectorAll('span');
const reset = document.getElementById('reset-button');

const complete = document.getElementById('complete');
const countdownInfo = document.getElementById('countdown-info');
const newCountdown = document.getElementById('new-countdown');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countvariable;
let savedCountdown;
let second = 1000;
let minute = 60*second;
let hour = 60*minute;
let day = 24*hour;


// To select date only from future
const today = new Date().toISOString().split('T');
dateEl.setAttribute('min', today[0]);

function updateDOM(){
    countvariable = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance%day)/hour);
        const minutes = Math.floor((distance%hour)/minute);
        const seconds = Math.floor((distance%minute)/second);
    
        inputContainer.hidden = true;

        if(distance < 0){
            countDown.hidden = true;
            countdownInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            clearInterval(countvariable);
            complete.hidden = false;
        } 
        else{
            countTitle.textContent = `${countdownTitle}`;
            timeEl[0].textContent = `${days}`;
            timeEl[1].textContent = `${hours}`;
            timeEl[2].textContent = `${minutes}`;
            timeEl[3].textContent = `${seconds}`;
    
            countDown.hidden = false;
        }

    },second);
}

function resetCountdown(){
    countDown.hidden = true;
    complete.hidden = true;
    clearInterval(countvariable);
    countdownTitle = '';
    countdownDate = '';
    inputContainer.hidden = false;

}

function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    if(countdownDate === ''){
        alert('Please select a date for countdown!');
    }
    else{

    }
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}

function previousCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = false;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//Event Listeners
formEl.addEventListener('submit',updateCountdown);
reset.addEventListener('click', resetCountdown);
newCountdown.addEventListener('click',resetCountdown);

previousCountdown();