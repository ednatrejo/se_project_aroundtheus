import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}
