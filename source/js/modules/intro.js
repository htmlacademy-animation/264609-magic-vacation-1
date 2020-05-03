import {SeparateTextAnimation} from './animations.js';

export default () => {
  const animationIntroTitle = new SeparateTextAnimation(`.intro__title`, 500, `active`, `transform`);
  setTimeout(()=>{
    animationIntroTitle.runAnimation();
  }, 500);

  const animationIntroDate = new SeparateTextAnimation(`.intro__date`, 500, `active`, `transform`);
  setTimeout(()=>{
    animationIntroDate.runAnimation();
  }, 1000);
};
