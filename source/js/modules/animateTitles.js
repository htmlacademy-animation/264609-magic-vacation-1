export default () => {
  const drawingPoint = 3;

  const drawPath = (path, delay) => {
    const partPath = path.getTotalLength() / drawingPoint;
    path.animate([
      {strokeDasharray: `0 ${partPath}`},
      {strokeDasharray: `${partPath} 0`}
    ], {
      duration: 600,
      delay,
      fill: `both`
    });
  };

  const movePath = (path, delay) => {
    path.animate([
      {transform: `translateY(-8rem)`},
      {transform: `translateY(1rem)`},
      {transform: `translateY(-1rem)`},
      {transform: `translateY(0)`}
    ], {
      duration: 600,
      delay,
      easing: `cubic-bezier(0.32, 0, 0.67, 0)`,
      fill: `both`
    });
  };

  document.querySelectorAll(`.js-show-result`).forEach((item) => {
    item.addEventListener(`click`, () => {
      switch (item.dataset.target) {
        case `result`:
          document.querySelectorAll(`#result .js-result-title path`).forEach((path) => {
            drawPath(path, 0);
          });
          break;
        case `result2`:
          document.querySelectorAll(`#result2 .js-result-title path`).forEach((path) => {
            drawPath(path, 0);
          });
          break;
        case `result3`:
          let delay = 0.1;
          document.querySelectorAll(`#result3 .js-result-title path`).forEach((path) => {
            drawPath(path, delay * 500);
            movePath(path, delay * 500);
            delay += 0.2;
          });
          break;
      }
    });
  });
};
