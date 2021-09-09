class TimerAnimation {
  constructor(elementSelector, timeInMinutes) {
    this._elementSelector = elementSelector;
    this._timeInMinutes = timeInMinutes;
    this._element = document.querySelector(this._elementSelector);
    this._gameMinutes = this._element.querySelector(`.game__minutes`);
    this._gameSeconds = this._element.querySelector(`.game__seconds`);
    this._deadline = null;
    this._timeinterval = null;
    this._animFrame = null;
  }

  getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);

    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  updateClock(endtime) {
    const t = this.getTimeRemaining(endtime);

    this._gameMinutes.innerHTML = (`0` + t.minutes).slice(-2);
    this._gameSeconds.innerHTML = (`0` + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(this._timeinterval);
    }
  }

  initializeClock() {
    this.updateClock(this._deadline);
    this._timeinterval = setInterval(this.updateClock.bind(this), 1000, this._deadline);
  }

  startTimer() {
    this._deadline = new Date(Date.parse(new Date()) + 60 * 1000 * this._timeInMinutes);
    this._animFrame = requestAnimationFrame(this.initializeClock.bind(this));
  }

  clearTimer() {
    clearInterval(this._timeinterval);
    cancelAnimationFrame(this._animFrame);
    this._timeinterval = null;
  }
}


export {TimerAnimation};
