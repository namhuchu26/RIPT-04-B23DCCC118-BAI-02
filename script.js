const modeIcon = document.querySelector('#mode-icon');
const minutesInput = document.querySelector('#minutes-input');
const secondsInput = document.querySelector('#seconds-input');
const startButton = document.querySelector('#start-btn');
const resetButton = document.querySelector('#reset-btn');
const timerDisplay = document.querySelector('#timer-display');
const bodyElement = document.body;

let countdown;
let alarmSound = new Audio('alarm.mp3');

function startTimer(seconds) {
    const endTime = Date.now() + seconds * 1000;
    localStorage.setItem('endTime', endTime);
    displayTimeLeft(seconds);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);
        
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            alarmSound.play();
            localStorage.removeItem('endTime');
            return;
        }
        
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => {
    if (countdown) {
        return;
    }

    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (minutes >= 0 && seconds >= 0) {
        localStorage.setItem('minutes', minutes);
        localStorage.setItem('seconds', seconds);
        startTimer((minutes * 60) + seconds);
    } else {
        alert('Please enter valid time!');
    }
});

resetButton.addEventListener('click', () => {
    minutesInput.value = '';
    secondsInput.value = '';
    timerDisplay.textContent = '00:00';
    clearInterval(countdown);
    countdown = null;
    localStorage.removeItem('endTime');
    alarmSound.pause();
    alarmSound.currentTime = 0;
});

modeIcon.addEventListener('click', () => {
    if (bodyElement.classList.contains('theme-dark')) {
        bodyElement.classList.remove('theme-dark');
        bodyElement.classList.add('theme-default');
        modeIcon.src = 'images/light-mode.png';
        localStorage.setItem('selectedTheme', 'theme-default');
    } else {
        bodyElement.classList.remove('theme-default');
        bodyElement.classList.add('theme-dark');
        modeIcon.src = 'images/dark-mode.png';
        localStorage.setItem('selectedTheme', 'theme-dark');
    }
});

function setThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('selectedTheme');
    
    if (savedTheme === 'theme-dark') {
        bodyElement.classList.add('theme-dark');
        modeIcon.src = 'images/dark-mode.png';
    } else {
        bodyElement.classList.add('theme-default');
        modeIcon.src = 'images/light-mode.png';
    }
}

setThemeFromLocalStorage();