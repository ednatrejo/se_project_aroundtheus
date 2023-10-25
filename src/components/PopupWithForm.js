import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleCardFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleCardFormSubmit = handleCardFormSubmit;
    this._inputItems = this._popupForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputsData = {};
    this._formInputs.forEach((input) => {
      inputsData[input.name] = input.value;
    });
    return inputsData;
  }

  _submitForm() {
    const formInputValues = this._getInputValues();
    this._handleFormSubmit(formInputValues);
    // this.close();
  }

  setLoadingState(isLoading) {
    this._submitButton.textContent = isLoading
      ? "...Saving"
      : this._submitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this._submitForm();
    });
  }

  close() {
    this._popupForm.reset(); // need this line to avoid saving the last input
    super.close();
  }
}
