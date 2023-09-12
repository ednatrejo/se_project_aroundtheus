/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

 export default class FormValidator {
  constructor(config, formEl) {
    constructor(config){
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;

    this._form = formEl;
    };
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      return this._showInputError(formEl, inputEl, options);
    } else {
    this._hideInputError(formEl, inputEl, options);
  }
}

  _disableButton(submitButton, inactiveButtonClass) {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton(submitButton, inactiveButtonClass) {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;

    inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      disableButton(submitButton, inactiveButtonClass);
    } else {
      enableButton(submitButton, inactiveButtonClass);
    }


  _setEventListeners(formEl, options) {
    const inputEls = Array.from(formEl.querySelectorAll(options.inputSelector));
    const submitButton = formEl.querySelector(options.submitButtonSelector);
    this._toggleButtonState(inputEls, submitButton, options);

    inputEls.forEach((inputEl) => {
      addEventListener("input", () => {
        this._checkInputValidity(formEl, inputEl, options);
        this._toggleButtonState(inputEls, submitButton, options);
      });
    });
  }
