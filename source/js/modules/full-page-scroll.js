import throttle from 'lodash/throttle';
import {SeparateTextAnimation} from './animations.js';
import {timerAnimation} from './game.js';

const animationIntroTitle = new SeparateTextAnimation(`.intro__title`, `active`);
const animationIntroDate = new SeparateTextAnimation(`.intro__date`, `active`);
const animationHistoryTitle = new SeparateTextAnimation(`.slider__item-title--history`, `active`);
const animationPrizeTitle = new SeparateTextAnimation(`.prizes__title`, `active`);

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();

    let requestId;

    if (this.activeScreen === 0) {
      setTimeout(()=>{
        animationIntroTitle.runAnimation();
      }, 500);
      setTimeout(()=>{
        animationIntroDate.runAnimation();
      }, 1000);
    } else if (this.activeScreen === 1) {
      animationHistoryTitle.runAnimation();
    } else {
      animationIntroTitle.destroyAnimation();
      animationIntroDate.destroyAnimation();
      animationHistoryTitle.runAnimation();
    }

    if (this.activeScreen === 4) {
      requestId = requestAnimationFrame(timerAnimation);
    } else {
      cancelAnimationFrame(requestId);
    }

  }

  setPrizesSvg() {
    let element = document.querySelector(`.primary-award`);
    let elementTwo = document.querySelector(`.secondary-award`);
    let elementThird = document.querySelector(`.third-award`);

    element.src = element.dataset.src;
    elementTwo.src = elementTwo.dataset.src;
    elementThird.src = elementThird.dataset.src;
  }

  changeVisibilityDisplay() {
    const background = document.querySelector(`.page-background`);

    this.screenElements.forEach((screen) => {
      if (this.activeScreen === 2) {
        background.classList.add(`active`);
        setTimeout(() => {
          screen.classList.add(`screen--hidden`);
          screen.classList.remove(`active`);
        }, 1000);
      } else {
        background.classList.remove(`active`);
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      }

      if (this.screenElements[this.activeScreen].classList.contains(`screen--prizes`)) {
        this.setPrizesSvg();
        animationPrizeTitle.runAnimation();
      }
    });

    if (this.activeScreen === 2) {
      background.classList.add(`active`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
        this.screenElements[this.activeScreen].classList.add(`active`);
      }, 1000);
    } else {
      background.classList.remove(`active`);
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.activeScreen].classList.add(`active`);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
