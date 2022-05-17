export function initForm(formSelector, options) {
  // Опции
  const {
    url,
    submitClass = "_submit",
    errorClass = "_error",
    successClass = "_success",
    closeBtnClass
  } = options;

  // Основные элементы формы
  const form = document.querySelector(formSelector).querySelector("form");
  const submitBtn = form.querySelector("[type='submit']");
  const closeBtn = form.querySelector(closeBtnClass);

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
  telField.addEventListener("input", function() {
    const value = this.value;
    this.value = value.replace(/[^\d\+\s\-]/g, "");
  });

  // Отправка данных
  form.addEventListener("submit", sendFormData);

  async function sendFormData(event) {
    event.preventDefault();

    // Готовим данные формы к отправке
    const formData = new FormData(form);

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
      if (data !== "success") {
        throw new Error();
      }
      setSuccessState();
    }).catch(err => {
      setErrorState();
    }).finally(() => {
      unlockForm();
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
  }

  function setErrorState() {
    form.classList.add(errorClass);
  }

  function unlockForm() {
    form.classList.remove(submitClass);

    form.querySelectorAll("input").forEach(i => i.disabled = false);
    submitBtn.disabled = false;
  }

  function resetStates() {
    form.classList.remove(successClass);
    form.classList.remove(errorClass);
  }
}
