document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapList = document.getElementById('lapList');

    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    let lapCount = 0;

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime();
            tInterval = setInterval(getShowTime, 1);
            running = true;
        }
    }

    function stopTimer() {
        clearInterval(tInterval);
        running = false;
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        display.innerHTML = "00:00:00";
        lapList.innerHTML = '';
        lapCount = 0;
    }

    function lapTimer() {
        if (running) {
            lapCount++;
            const lapTime = display.innerHTML;
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
            lapList.appendChild(lapItem);
        }
    }

    function getShowTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        display.innerHTML = (hours < 10 ? '0' : '') + hours + ":" +
                            (minutes < 10 ? '0' : '') + minutes + ":" +
                            (seconds < 10 ? '0' : '') + seconds;
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', lapTimer);
});
