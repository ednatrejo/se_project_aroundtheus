/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import FormValidator from "../components/formvalidator.js";
import Card from "../components/card.js";

/* -------------------------------------------------------------------------- */
/*                            Validation Activation                           */
/* -------------------------------------------------------------------------- */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const profileEditForm = document.forms["edit-profile-form"];
const cardAddForm = document.forms["add-card-form"];

/* -------------------------------------------------------------------------- */
/*                          Form Validator Instances                          */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                    Cards                                   */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Profile Elements ---------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeProfileEditModal = profileEditModal.querySelector(".modal__close");
const profileHeading = document.querySelector(".profile__heading");
const profileDescription = document.querySelector(".profile__description");
const profileHeadingInput = document.querySelector("#profile-heading-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* ------------------------------ Card Elements ----------------------------- */

const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const closeCardAddModal = cardAddModal.querySelector(".modal__close");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardSelector = "#card-template";

/* ------------------------- Preview Image Elements ------------------------- */

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewTitleElement = document.querySelector(".modal__image-title");
const closePreviewImageModal = document.querySelector(
  ".modal__close_type_preview"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const currentlyOpenModal = document.querySelector(".modal_opened");
    closePopup(currentlyOpenModal);
  }
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileHeading.textContent = profileHeadingInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  renderCard({ name, link });
  e.target.reset();
  closePopup(cardAddModal);
  cardFormValidator.toggleButtonState();
}

function handleOutsideClick(e) {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ) {
    closePopup(e.currentTarget);
  }
}

function handleEscEvent(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

// add new card button
addNewCards.addEventListener("click", () => openPopup(addCardModal));

// close with esc or click //

profileEditModal.addEventListener("mousedown", function (evt) {
  if (
    evt.target.classList.contains("modal__close") ||
    evt.target.classList.contains("modal")
  ) {
    closePopup(profileEditModal);
  }
});

addCardModal.addEventListener("mousedown", function (evt) {
  if (
    evt.target.classList.contains("modal__close") ||
    evt.target.classList.contains("modal")
  ) {
    closePopup(addCardModal);
  }
});

previewImageModal.addEventListener("mousedown", function (evt) {
  if (
    evt.target.classList.contains("modal__close") ||
    evt.target.classList.contains("modal")
  ) {
    closePopup(previewImageModal);
  }
});

/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((data) => {
  renderCard(data, cardListEl);
});

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export { openPopup, closePopup };
