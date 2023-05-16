export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, data, config) {
    let statusValidate;

    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === ""; // после добавления statusValidate, все переделали с ним
        }
        break;
      }
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g; // это РЕГУЛЯРНОЕ ВЫРАЖЕНИЕ с regex101.com
        statusValidate = !emailRegExp.test(data);
        break;
      }

      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      }

      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }

      case "min": {
        statusValidate = data.length < config.value;
        break;
      }

      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    // цикл for in для объетов
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        // если ошибка существует, то она не будет перезаписываться
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
