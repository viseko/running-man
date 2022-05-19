export function addMask(input, mask = "+7 (___) ___ __-__") {

  // Вешаем обработчик на все необходимые события
  ["focus", "blur", "input"].forEach(ev => {
    input.addEventListener(ev, eventHandler);
  });

  // Универсальный обработчик событий
  function eventHandler(event) {
    const type = event.type; // - тип события
    const input = event.target; // - поле ввода
    const value = input.value; // - имеющееся в поле ввода значение

    const maskDigits = mask.replace(/\D/g, "");
    const valueDigits = value.replace(/\D/g, "");

    // Focus
    // - Если поле пустое, заполняем его первыми символами маски по умолчанию
    if (type === "focus" && value === "") {
      const sliceIndex = mask.indexOf("_");
      input.value = mask.slice(0, sliceIndex);
      return;
    }

    // Blur
    // - Если в поле только первые символы маски - очищаем его
    if (type === "blur" && maskDigits === valueDigits) {
      input.value = "";
      return;
    }

    // Input
    // - Для ввода допускаются только цифры - остальное игнорится
    // - По мере ввода цифр, отображаем часть маски, покрытую этими цифрами
    if (type === "input") {
      const enteredDigits = valueDigits.slice(maskDigits.length);

      if (enteredDigits.length === 0) {
        const sliceIndex = mask.indexOf("_");
        input.value = mask.slice(0, sliceIndex);
      } else {

        let newValue = mask;
        let i = 0;

        while (/_/.test(newValue) && i < enteredDigits.length) {
          newValue = newValue.replace(/_/, enteredDigits[i++]);
        }

        const slicePos = newValue.search(/\d(?=\D*$)/);
        input.value = newValue.slice(0, slicePos + 1);
      }
    }
  }

}
