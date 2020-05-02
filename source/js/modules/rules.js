export default () => {
  const rules = document.querySelectorAll(`.rules__item p`);
  const rulesBtn = document.querySelector(`.rules__link`);
  const lastAnimationElement = rules[rules.length - 1];

  lastAnimationElement.addEventListener(`animationend`, function () {
    rulesBtn.classList.add(`show`);
  });
};
