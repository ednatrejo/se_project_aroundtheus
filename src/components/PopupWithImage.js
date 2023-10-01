import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalImageEl = this._popupElement.querySelector(".image-modal");
    this._modalCaption = this._popupElement.querySelector(".modal__caption");
  }
  open(data) {
    this._popupImageText.textContent = data._name;
    this._popupImage.alt = data._name;
    this._popupImage.src = data._link;
    super.open();
  }
}
