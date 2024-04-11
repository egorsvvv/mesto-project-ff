const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__input");
const formError = form.querySelector(`.${formInput.id}-error`);
export const saveButton = document.querySelector(".popup__button");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
};

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("button_inactive");
    buttonElement.classList.remove("popup__button");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button_inactive");
    buttonElement.classList.add("popup__button");
  }
};

export const saveButtonProfile = (buttonElement) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove("button_inactive");
  buttonElement.classList.add("popup__button");
};

export const disabledButtonNewPlaces = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add("button_inactive");
  buttonElement.classList.remove("popup__button");
};

const showInputError = (inputElement, errorMessage) => {
  const errorElement = inputElement.parentNode.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

export const hideInputError = (inputElement) => {
  const errorElement = inputElement.parentNode.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
};

const isValid = (inputElement, validationConfig) => {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(inputElement.dataset.errorValueMissing);
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorPatternMismatch);
  } else if (inputElement.validity.tooShort) {
    inputElement.setCustomValidity(inputElement.dataset.errorTooShort);
  } else if (inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorTypeMismatch);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(inputElement, validationConfig);
  }
};

export const setEventListeners = (form, validationConfig) => {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
