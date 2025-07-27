let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 1000);
  }
});

pauseBtn.addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    difference = new Date().getTime() - startTime;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  display.textContent = '00:00:00';
  difference = 0;
  laps = 0;
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = display.textContent;
    const li = document.createElement('li');
    li.textContent = `Lap ${++laps}: ${lapTime}`;
    lapsList.appendChild(li);
  }
});

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  const hours = Math.floor(updatedTime / (1000 * 60 * 60));
  const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
  display.textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return ('0' + unit).slice(-2);
}