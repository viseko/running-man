import { addMask } from "./phone-mask.js";

export function initForm(formSelector, options) {
  // Опции
  let url = options.url; // - url формы, по умолчанию берёт из form.action

  const {
    submitClass = "_submit", // - класс состояния формы при отправке
    errorClass = "_error", // - класс состояния формы после неудачной отправки
    successClass = "_success", // - класс состояния формы после успешной отправки
    closeBtnClass, // - селектор кнопки возврата к исходному состоянию формы
    rules // - кастомные требования к полям, на основе рег. выражений
          //   принимает объект парами name: rule, где:
          //   name - значение атрибута "name" поля ввода
          //   rule - список допустимых символов
          //   пример: "username": "a-zA-Z0-9"
  } = options;

  // Основные элементы формы
  const form = document.querySelector(formSelector).querySelector("form");
  const submitBtn = form.querySelector("[type='submit']");
  const closeBtn = form.querySelector(closeBtnClass);

  // Заполняем поле url
  if (!url) {
    url = form.getAttribute("action");
  }

  // Кнопка возврата к форме
  if (closeBtn) {
    closeBtn.addEventListener("click", resetStates);
  }

  // Валидация формы
  submitBtn.disabled = true;

  form.addEventListener("input", (e) => {
    const requiredFields = Array.from(form.querySelectorAll("[required]"));
    const isValid = requiredFields.reduce((valid, field) => valid && field.checkValidity(), true);

    submitBtn.disabled = !isValid;
  });

  // Ограничение ввода символов в поле для телефона
  const telField = form.querySelector("[type='tel']");
  addMask(telField);

  // Отправка данных
  form.addEventListener("submit", sendFormData);
  async function sendFormData(event) {
    event.preventDefault();

    // Готовим данные формы к отправке
    const formData = new FormData(form);
    formData.set("phone", formData.get("phone").replace("+7", "8"));

    // Переводим форму в состояние отправки
    setSubmitState();

    // Создаём контроллер для таймаута отправки
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Отправляем данные и слушаем результат
    fetch(url, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    }).then(response => response.text())
    .then(data => {
      if (data === "success") {
        setSuccessState();
      } else if (data === "spam") {
        setSpamState();
      } else {
        throw new Error();
      }
    }).catch(setErrorState)
    .finally(unlockForm);
  }

  // Кастомные правила для полей
  for (let name in rules) {
    const field = form.querySelector(`[name=${name}]`);
    const regexp = new RegExp(`[^${rules[name]}]`, "g");

    if (!field) continue;

    field.addEventListener("input", () => {
      field.value = field.value.replace(regexp, "");
    });
  }

  // Функции-помощники
  function setSubmitState() {
    form.classList.add(submitClass);

    form.querySelectorAll("input").forEach(i => i.disabled = true);
    submitBtn.disabled = true;
  }

  function setSuccessState() {
    form.classList.add(successClass);
    form.reset();
    submitBtn.disabled = true;
  }

  function setErrorState() {
    form.classList.add(errorClass);
    const msgElem = form.querySelector(".order__message-error");
    msgElem.innerHTML = "Не удалось отправить данные. Пожалуйста, повторите попытку позже.";
  }

  function setSpamState() {
    form.classList.add(errorClass);
    const msgElem = form.querySelector(".order__message-error");
    msgElem.innerHTML = "Мы тебя вычислили, злоебучий спамер! Упёрдывай отсюда нахуй!";
  }

  function unlockForm() {
    form.classList.remove(submitClass);

    form.querySelectorAll("input").forEach(i => i.disabled = false);
  }

  function resetStates() {
    form.classList.remove(successClass);
    form.classList.remove(errorClass);
  }
}
