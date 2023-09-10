/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import { openPopup, closePopup } from "../pages/index.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewTitleElement = document.querySelector(".modal__image-title");
const ESC_KEYCODE = 27;

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleDeleteCard());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewImage());
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewImage() {
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewTitleElement.textContent = this._name;
    openPopup(previewImageModal);
  }

  getView() {
    this._element = this._getCardElement();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export default Card;
