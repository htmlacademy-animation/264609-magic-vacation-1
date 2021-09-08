const deadline = new Date(Date.parse(new Date()) + 60 * 1000 * 5); // for endless timer

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);

  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(endtime) {
  const gameCounter = document.querySelector(`.game__counter`);
  const gameMinutes = gameCounter.querySelector(`.game__minutes`);
  const gameSeconds = gameCounter.querySelector(`.game__seconds`);

  function updateClock() {
    const t = getTimeRemaining(endtime);

    gameMinutes.innerHTML = (`0` + t.minutes).slice(-2);
    gameSeconds.innerHTML = (`0` + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const timerAnimation = () => {
  initializeClock(deadline);
};


export {timerAnimation};
