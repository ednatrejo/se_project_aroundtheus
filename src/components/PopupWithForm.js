import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleCardFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleCardFormSubmit = handleCardFormSubmit;
    this._inputItems = this._popupForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputItems.forEach((inputItems) => {
      inputValues[inputItems.name] = inputItems.value;
    });
    return inputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleCardFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
// This section focuses on opening and closing cards
