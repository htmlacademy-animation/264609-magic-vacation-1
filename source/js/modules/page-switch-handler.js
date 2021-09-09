import {SeparateTextAnimation} from './separateTextAnim.js';
import {TimerAnimation} from './game.js';
import AnimatedNumbers from './animated-numbers';

export default class PageSwitchHandler {
  constructor() {
    const animationIntroTitle = new SeparateTextAnimation(`.intro__title`, `active`);
    const animationIntroDate = new SeparateTextAnimation(`.intro__date`, `active`);
    const animationHistoryTitle = new SeparateTextAnimation(`.slider__item-title--history`, `active`);
    const animationPrizeTitle = new SeparateTextAnimation(`.prizes__title`, `active`);
    const animationTimer = new TimerAnimation(`.game__counter`, 5);
    const number1 = new AnimatedNumbers({
      elements: `.prizes__item--journeys .prizes__desc b`,
      duration: 800,
      durationAttenuation: 150,
      delay: 1000
    });
    const number2 = new AnimatedNumbers({
      elements: `.prizes__item--cases .prizes__desc b`,
      duration: 800,
      durationAttenuation: 150,
      delay: 5000
    });
    const number3 = new AnimatedNumbers({
      elements: `.prizes__item--codes .prizes__desc b`,
      duration: 800,
      durationAttenuation: 150,
      delay: 7500
    });


    this.sectionScheme = {
      top: {

      },
      story: {

      },
      prizes: {
        '.page-background': `active`
      },
      rules: {

      },
      game: {

      },
      result: {

      },
      result2: {

      },
      result3: {

      },
    };

    // animations on screens
    this.scriptRunSchema = {
      top: [
        () => {
          setTimeout(animationIntroTitle.runAnimation.bind(animationIntroTitle), 500);
          setTimeout(animationIntroDate.runAnimation.bind(animationIntroDate), 1000);
        }
      ],
      story: [
        animationHistoryTitle.runAnimation.bind(animationHistoryTitle),
      ],
      prizes: [
        this.setPrizesSvg.bind(this),
        animationPrizeTitle.runAnimation.bind(animationPrizeTitle),
        number1.animate.bind(number1),
        number2.animate.bind(number2),
        number3.animate.bind(number3),
      ],
      rules: [

      ],
      game: [
        animationTimer.startTimer.bind(animationTimer),
      ],
      result: [

      ],
      result2: [

      ],
      result3: [

      ],
    };

    // destroy animations on screens
    this.scriptDestroySchema = {
      top: [
        animationIntroTitle.destroyAnimation.bind(animationIntroTitle),
        animationIntroDate.destroyAnimation.bind(animationIntroDate),
      ],
      story: [
        animationHistoryTitle.destroyAnimation.bind(animationHistoryTitle),
      ],
      prizes: [
        this.destroyPrizesSvg.bind(this),
        animationPrizeTitle.destroyAnimation.bind(animationPrizeTitle),
        number1.clear.bind(number1),
        number2.clear.bind(number2),
        number3.clear.bind(number3),
      ],
      rules: [

      ],
      game: [
        animationTimer.clearTimer.bind(animationTimer),
      ],
      result: [

      ],
      result2: [

      ],
      result3: [

      ],
    };
  }

  setPrizesSvg() {
    const element = document.querySelector(`.primary-award`);
    const elementTwo = document.querySelector(`.secondary-award`);
    const elementThird = document.querySelector(`.third-award`);

    element.src = element.dataset.src;
    elementTwo.src = elementTwo.dataset.src;
    elementThird.src = elementThird.dataset.src;
  }
  destroyPrizesSvg() {
    const prizesIconsSvg = document.querySelectorAll(`.prizes__icon img`);
    [].slice.call(prizesIconsSvg).forEach((svg) => svg.src = ``);
  }

  setSectionScheme(sectionId) {
    this.resetScheme();

    if (this.sectionScheme[sectionId]) {
      for (const schema in this.sectionScheme[sectionId]) {
        if (this.sectionScheme[sectionId].hasOwnProperty(schema)) {
          const position = document.querySelector(schema);

          if (position) {
            setTimeout(() => {
              position.classList.add(this.sectionScheme[sectionId][schema]);
            }, 100);
          }
        }
      }
    }

    if (this.scriptRunSchema[sectionId]) {
      [...this.scriptRunSchema[sectionId]].forEach((funct) => setTimeout(() => funct(), 100));
    }
  }

  resetScheme() {
    for (const screenSchema in this.sectionScheme) {
      if (this.sectionScheme.hasOwnProperty(screenSchema)) {
        for (const schema in this.sectionScheme[screenSchema]) {
          if (this.sectionScheme[screenSchema].hasOwnProperty(schema)) {
            const position = document.querySelector(schema);

            if (position) {
              position.classList.remove(this.sectionScheme[screenSchema][schema]);
            }
          }
        }
      }
    }

    for (const destroySchema in this.scriptDestroySchema) {
      if (this.scriptDestroySchema.hasOwnProperty(destroySchema)) {
        this.scriptDestroySchema[destroySchema].forEach((funct) => funct());
      }
    }
  }
}
