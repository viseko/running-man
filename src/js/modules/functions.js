// ** ПРОВЕРКА ПОДДЕРЖКИ WEBP
export function isWebp() {
  function testWebp(callback) {
    const webP = new Image();
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    webP.onload = webP.onerror = () => {
      callback(webP.height == 2);
    };
  }

  testWebp(support => {
    let className = (support === true) ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

// Анимация
export function animate({timing, draw, duration, callback}) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = Math.min(1, (time - start) / duration);

    // Вычисление текущего состояния анимации
    let progress = timing(timeFraction);
    // Отрисовка анимации
    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      if (callback) callback();
    }
  });
}

