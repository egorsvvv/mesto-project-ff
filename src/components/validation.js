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
  if (hasInvalidInput(inputList)) { 
    buttonElement.disabled = true; 
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
    buttonElement.classList.remove("popup__button");
  } else { 
    buttonElement.disabled = false; 
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    buttonElement.classList.add("popup__button");
  } 
}; 

export const saveButtonProfile = (buttonElement, enableValidation) => { 
  buttonElement.disabled = false; 
  buttonElement.classList.remove(enableValidation.inactiveButtonClass);
  buttonElement.classList.add("popup__button"); 
}; 

export const disabledButtonNewPlaces = (buttonElement, enableValidation) => { 
  buttonElement.disabled = true; 
  buttonElement.classList.add(enableValidation.inactiveButtonClass); 
  buttonElement.classList.remove("popup__button");
}; 

const showInputError = (inputElement, errorMessage) => { 
  const errorElement = inputElement.parentNode.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(enableValidation.inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(enableValidation.errorClass); 
}; 

export const hideInputError = (inputElement) => { 
  const errorElement = inputElement.parentNode.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(enableValidation.inputErrorClass); 
  errorElement.textContent = ""; 
  errorElement.classList.remove(enableValidation.errorClass); 
}; 

const isValid = (inputElement) => { 
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
    showInputError(inputElement, inputElement.validationMessage); 
  } else { 
    hideInputError(inputElement); 
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
    hideInputError(inputElement); 
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