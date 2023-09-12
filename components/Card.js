/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

/*
import { openPopup, closePopup } from "../pages/index.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/*const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewTitleElement = document.querySelector(".modal__image-title");
const ESC_KEYCODE = 27;

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getCardElement() {
    this._cardElement = cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
    this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      cardElement.remove("");
    });
    this._element.cardElement.querySelector(".card__image");
    this._element.cardElement.querySelector(".card__title");
  }

  _previewImageModal() {
    this._element.cardImageEl.addEventListener("click", () => {
      openPopup(previewImageModal);
      modalImage.alt = cardData.name;
      modalImage.src = cardData.link;
      modalText.textContent = cardData.name;
    });
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
