let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.sec');
const millisecondsDisplay = document.querySelector('.msec');
const playButton = document.querySelector('.play');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');
const lapsContainer = document.querySelector('.laps');
const clearLapsButton = document.querySelector('.lap-clear-button');

function updateDisplay() {
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = ` : ${seconds < 10 ? `0${seconds}` : seconds}`;
    millisecondsDisplay.textContent = ` : ${milliseconds < 10 ? `0${milliseconds}` : milliseconds}`;
}

function startTimer() {
    interval = setInterval(() => {
        milliseconds++;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
}

function stopTimer() {
    clearInterval(interval);
}

function resetTimer() {
    stopTimer();
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    isRunning = false;
    playButton.textContent = 'Play';
    resetButton.classList.add('hidden');
    lapButton.classList.add('hidden');
    clearLapsButton.classList.add('hidden');
}

function toggleTimer() {
    if (isRunning) {
        stopTimer();
        playButton.textContent = 'Play';
    } else {
        startTimer();
        playButton.textContent = 'Pause';
        resetButton.classList.remove('hidden');
        lapButton.classList.remove('hidden');
        clearLapsButton.classList.remove('hidden');
    }
    isRunning = !isRunning;
}

function recordLap() {
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.innerHTML = `
        <span class="number">${document.querySelectorAll('.lap-item').length + 1}</span>
        <span class="time-stamp">${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds} : ${milliseconds < 10 ? `0${milliseconds}` : milliseconds}</span>
    `;
    lapsContainer.appendChild(lapItem);
    clearLapsButton.classList.remove('hidden'); // Make sure the clear all button is visible
}

playButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
clearLapsButton.addEventListener('click', () => {
    lapsContainer.innerHTML = '';
    clearLapsButton.classList.add('hidden');
});
