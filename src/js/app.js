// ** ИМПОРТ МОДУЛЕЙ;
import {isWebp} from "./modules/functions.js"; // - Коллекция фунций
import {initForm} from "./modules/init-form.js";

// ** ЗАПУСК ОСНОВНЫХ ФУНКЦИЙ
isWebp();

// ** ИНИЦИАЛИЗАЦИЯ ФОРМ ОБРАТНОЙ СВЯЗИ **
initForm(".js-order-form-main", {
  url: "https://running-man124.ru/send-form.php",
  errorClass: "order--error",
  submitClass: "order--submit",
  successClass: "order--success",
  closeBtnClass: ".js-order-form-close"
});

// ** СОСТОЯНИЯ СТРАНИЦЫ
let isMenuOpened = false;

// menuBtn.addEventListener("click", openMenu);
// menuCloseBtn.addEventListener("click", closeMenu);

// ** ОВЕРЛЕЙ
// const overlay = document.querySelector("#js-page-overlay");
// overlay.onclick = () => {
//   if (isMenuOpened) closeMenu();
// };

// ** ОСТАЛЬНЫЕ СКРИПТЫ
