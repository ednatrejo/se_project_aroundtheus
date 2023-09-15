import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Validation //

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const editFormVlaidator = new FormValidator(config, editFormElement);
const addFormVlaidator = new FormValidator(config, addFormElement);

editFormVlaidator.enableValidation();
addFormVlaidator.enableValidation();

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

// Elements

const editProfileBtn = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const titleInput = document.querySelector("#profile-title-input");
const textInput = document.querySelector("#profile-text-input");
const profileFormEdit = profileModal.querySelector(".modal__form");

const addCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#card-modal");
const cardTitleInput = cardModal.querySelector("#add-title-input");
const cardUrlInput = cardModal.querySelector("#add-url-input");
const addCardFormEdit = cardModal.querySelector(".modal__form");

const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector(".preview-image");
const previewText = previewImageModal.querySelector(".modal__preview-text");

const cardList = document.querySelector(".cards__list");

// Functions

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
}
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function handleImageClick() {
  previewImage.src = this._link;
  previewImage.alt = this._name;
  previewText.textContent = this._name;
  openPopup(previewImageModal);
}

initialCards.forEach((cardData) => renderCard(cardData));

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  cardList.prepend(card.getView());
}

// Keypress function

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

// Modal Click Out

function closeModalClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

[profileModal, cardModal, previewImageModal].forEach((modal) => {
  modal.addEventListener("click", closeModalClick);
});

// event handlers

function handleProfileFormEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileText.textContent = textInput.value;
  closePopup(profileModal);
}
function handleCardFormEdit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardList);
  closePopup(cardModal);
  addCardFormEdit.reset();
  toggleButtonState();
}

// profile events

profileFormEdit.addEventListener("submit", handleProfileFormEdit);
editProfileBtn.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  textInput.value = profileText.textContent;
  openPopup(profileModal);
});

// new card events

addCardFormEdit.addEventListener("submit", handleCardFormEdit);
addCardButton.addEventListener("click", () => openPopup(cardModal));
