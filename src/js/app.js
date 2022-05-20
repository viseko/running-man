// ** ИМПОРТ МОДУЛЕЙ;
import {isWebp} from "./modules/functions.js"; // - Коллекция фунций
import {initForm} from "./modules/init-form.js";

// ** ЗАПУСК ОСНОВНЫХ ФУНКЦИЙ
isWebp();

// ** ИНИЦИАЛИЗАЦИЯ ФОРМ ОБРАТНОЙ СВЯЗИ **
const formOptions = {
  errorClass: "order--error",
  submitClass: "order--submit",
  successClass: "order--success",
  closeBtnClass: ".js-order-form-close",
  rules: {
    "name": " a-zA-Zа-яА-ЯёЁ-"
  },
  formCloseCallback: null
};

[".js-order-form-main", ".js-order-form-modal"].forEach(formSelector => {
  initForm(formSelector, formOptions);
});

// ** МОДАЛЬНОЕ ОКНО
const btnOpenModal = document.querySelector(".js-open-modal-form");
const btnCloseModal = document.querySelector(".js-close-modal-form");
const modalStateClass = "_modal-open";

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", function(e) {
  e.preventDefault();

  closeModal();
})

function openModal() {
  document.body.classList.add(modalStateClass);
}

function closeModal() {
  document.body.classList.remove(modalStateClass);
  const modalFormCloseBtn = document.querySelector(".modal-form .order__message-btn");
  modalFormCloseBtn.click();
}

// Узнаём ширину скролла и задаём переменную, которая будет использоваться
// при body {overflow: hidden }
const scrollWidth = getScrollWidth();
document.body.style.setProperty("--scroll-width", `${scrollWidth}px`)
console.log(scrollWidth);

function getScrollWidth() {
  // создадим элемент с прокруткой
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  // мы должны вставить элемент в документ, иначе размеры будут равны 0
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
}
