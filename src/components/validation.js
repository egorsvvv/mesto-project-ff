const form = document.querySelector(".popup__form"); 
const formInput = form.querySelector(".popup__input"); 
const formError = form.querySelector(`.${formInput.id}-error`); 

export const saveButton = document.querySelector(".popup__button"); 

export const enableValidation = { 
  formSelector: ".popup__form", 
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__button", 
  inactiveButtonClass: "button_inactive", 
  inputErrorClass: "form__input_type_error", 
  errorClass: "form__input-error_active", 
}; 

form.addEventListener("submit", function (evt) { 
  evt.preventDefault(); 
}); 

const hasInvalidInput = (inputList) => { 
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }); 
}; 

const toggleButtonState = (inputList, buttonElement, enableValidation) => {
  if (hasInvalidInput(inputList, enableValidation)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
    buttonElement.classList.remove(enableValidation.submitButtonSelector.replace('.', ''));
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    buttonElement.classList.add(enableValidation.submitButtonSelector.replace('.', ''));
  }
};

export const saveButtonProfile = (buttonElement, enableValidation) => { 
  buttonElement.disabled = false; 
  buttonElement.classList.remove(enableValidation.inactiveButtonClass);
  buttonElement.classList.add(enableValidation.submitButtonSelector.replace('.', '')); 
}; 

export const disabledButtonNewPlaces = (buttonElement, enableValidation) => { 
  buttonElement.disabled = true; 
  buttonElement.classList.add(enableValidation.inactiveButtonClass); 
  buttonElement.classList.remove(enableValidation.submitButtonSelector.replace('.', ''));
}; 

const showInputError = (inputElement, errorMessage, enableValidation) => {
  const errorElement = inputElement.parentNode.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
};

const hideInputError = (inputElement, enableValidation) => {
  const errorElement = inputElement.parentNode.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(enableValidation.errorClass);
}

const isValid = (inputElement, enableValidation) => {
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
    showInputError(inputElement, inputElement.validationMessage, enableValidation);
  } else {
    hideInputError(inputElement, enableValidation);
  }
};

export const setEventListeners = (form, enableValidation) => {
  const inputList = Array.from(form.querySelectorAll(enableValidation.inputSelector));
  const buttonElement = form.querySelector(enableValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, enableValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, enableValidation);
      toggleButtonState(inputList, buttonElement, enableValidation);
    });
  });
};

export const clearValidation = (form, enableValidation) => {
  const inputList = Array.from(form.querySelectorAll(enableValidation.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(inputElement, enableValidation);
  });
};

export const turnValidation = (enableValidation) => {
  const formList = Array.from(
    document.querySelectorAll(enableValidation.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, enableValidation);
  });
};