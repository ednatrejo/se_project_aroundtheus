// Elements //

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};



// Error message //
function showInputError(formElements,inputElements, options { inputErrorClass, errorClass}) {
inputElements.classList.add(inputErrorClass);
const errorMessageElements = formElements.querySelector('#${inputElements.id}-error');
errorMessageElements.textContent = inputElements.validationMessage;
errorMessageElements.classList.add(errorClass);
}

function hideInputError(formElements,inputElements, options { inputErrorClass, errorClass}) {
  inputElements.classList.remove(inputErrorClass);
  const errorMessageElements = formElements.querySelector('#${inputElements.id}-error');
  errorMessageElements.textContent = "";
  errorMessageElements.classList.remove(errorClass);
  }





//enabling validation by calling enableValidation()
// pass all the settings on call
// validity checkers and input //
function checkInputValidity(formElements, inputElements, options) {
if(!inputElements.validity.valid) {
  showInputError(formElements, inputElements, options);
} else {
  hideInputError(formElements,inputElements, options);
}
}




// Button state //
const disableButton = (submitButton, { inactiveButtonClass }) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enableButton = (submitButton, { inactiveButtonClass }) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};



function toggleButtonState(inputElements, submitButton{inactiveButtonClass}) {
let foundInvalid = false;

inputElements.forEach(inputElements =>{
if(!inputElements.validity.valid) {

}
});

if(foundInvalid) {
  submitButton.classList.add(inactiveButtonClass);
submitButton.disabled = true;
} else {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}
enableButton(submitButton, { inactiveButtonClass });
};



// Listeners and validation //
function setEventListeners(formElements, options) {
  const { inputSelector} = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(".modal__button");

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElements, inputElements, options);
      toggleButtonState(inputElements, submitButton, options;
    });
  });

  toggleButtonState(inputElements, submitButton, options);
}

function enableValidation(options); {
const formElements = [...document.querySelectorAll(options.formSelector)];
formElements.forEach("sumbit", (e) => {
e.preventDefault();
});
setEventListeners(formElements, options);

}

enableValidation(config);
