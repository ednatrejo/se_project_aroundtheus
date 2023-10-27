import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this.submitButton = this._popupForm.querySelector(".modal__button");
    this.submitButtonText = this.submitButton.textContent;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this.submitButton.textContent = loadingText;
    } else {
      this.submitButton.textContent = this.submitButtonText;
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
