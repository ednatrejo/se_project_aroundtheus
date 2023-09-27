import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalImageEl = this._popupElement.querySelector("#image-modal");
    this._modalCaption = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._modalImageEl.src = data.link;
    this._modalImageEl.alt = data.name;
    this._modalCaption.textContent = data.text;
    super.open();
  }
}
