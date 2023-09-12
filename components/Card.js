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
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // Card Like Button
    this._likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    // Card Delete
    this._cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      _cardElement.remove("");
    });

    // Image Popup
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

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    return this._element;
  }

  _getCardElement() {
    this._cardElement = cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _openPopup(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEsc);
  }

  _closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEsc);
  }

  _handleEsc(evt) {
    if (evt.key === "Escape") {
      const currentlyOpenModal = document.querySelector(".modal_opened");
      closePopup(currentlyOpenModal);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
