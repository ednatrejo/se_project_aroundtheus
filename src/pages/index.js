import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithimage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import initialCards from "../utils/Constants.js";
import "./index.css";

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

const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// form popup
const newFormPopup = new PopupWithForm("#card-modal", handleFormSubmit);
newFormPopup.setEventListeners();

//  profile edit popup
const userInfo = new UserInfo(".profile__title", ".profile__text");
const profileEditPopup = new PopupWithForm("#edit-modal", (data) => {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

// image popup
const imagePopup = new PopupWithimage("#image-modal");
imagePopup.setEventListeners();

// section class
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = renderCard(item);
      section.addItem(cardEl);
    },
  },
  ".cards__list"
);
section.renderItems();

// functions
function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function handleFormSubmit(data) {
  const cardValue = renderCard(data);
  section.addItem(cardValue);
  newFormPopup.close();
  return cardValue;
}

function handleImageClick(data) {
  imagePopup.open(data);
}

// listeners
editProfileBtn.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  titleInput.value = profileData.name;
  textInput.value = profileData.about;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newFormPopup.open();
});

fetch("https://around-api.en.tripleten-services.com/v1", {
  headers: {
    authorization: "56e30dc-2883-4270-a59e-b2f7bae969c6",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

const Api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "983cc012-9217-4309-b83d-4ef58e3e69de",
    "Content-Type": "application/json",
  },
});

let user = api.getUserInfo();
let apiCards = api.getInitialCards();

Promise.all([user, apiCards]).then(([userData, initialCards]) => {
  user = userData._id;
  // console.log("userData", userData);
  pageUserInfo.setUserInfo(userData);
  pageUserInfo.setUserAvatar(userData);
  console.log(initialCards);
