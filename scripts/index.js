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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];
const cardsWrap = document.querySelector(".cards__list");
const addNewCards = document.querySelector(".profile__add-button");

//button
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileCloseButton = document.querySelector("#profileCloseButton");

const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardCloseButton = addCardModal.querySelector(".modal__close");

// form data
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-discription-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector(
  "#profile-title-input_title"
);
const cardUrlInput = addCardFormElement.querySelector(
  "#profile-discription-input_url"
);

const previewImageModal = document.querySelector("#previewImageModal");
const modalImage = document.querySelector("#modalImage");
const modalText = document.querySelector("#modalText");

/* --------------------------------------------------------------------------------*/
/*                              Functions                                         */
/* --------------------------------------------------------------------------------*/

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove("");
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(previewImageModal);
    modalImage.alt = cardData.name;
    modalImage.src = cardData.link;
    modalText.textContent = cardData.name;
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}
/* --------------------------------------------------------------------------------*/
/*                              Event Handlers                                     */
/* --------------------------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  renderCard({ name, link }, cardsWrap);
  closePopup(addCardModal);
}

/* --------------------------------------------------------------------------------*/
/*                              Event Listeners                                   */
/* --------------------------------------------------------------------------------*/

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
previewCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

// add new card button
addNewCards.addEventListener("click", () => openPopup(addCardModal));
addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

// close with esc or click //

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const ModalCloseEsc = document.querySelector(".modal_opened");
    closePopup(profileEditModal, addCardModal);
  }
});

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
