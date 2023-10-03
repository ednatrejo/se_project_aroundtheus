import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".preview-image");
    this._popupImageText = document.querySelector(".modal__preview-text");
  }

  open(data) {
    this._popupImageText.textContent = data._name;
    this._popupImage.alt = data._name;
    this._popupImage.src = data._link;
    super.open();
  }
}
