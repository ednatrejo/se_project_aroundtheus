import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import {
  handleEscape,
  closePopup,
  openPopup,
  handlePopupClose,
} from "../utils/utils.js";
import { validationSettings, selectors } from "../utils/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/*--------------------------------------------------*/
/*                      Elements                    */
/*--------------------------------------------------*/
const profileEditButton = document.querySelector("#profile-edit-button");
const avatarEditButton = document.querySelector(".profile__avatar-container");
const profileEditModal = document.querySelector("#profile-edit-modal");
const avatarEditModal = document.querySelector("#avatar-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const imageModal = document.querySelector("#image-popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-decription-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAvatar = document.querySelector(".profile__image");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");

// Instances of the Classes
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "624f1ec6-13ac-45e0-90c0-09b6a44e49c6",
    "Content-Type": "application/json",
  },
});

const editAvatarPopup = new PopupWithForm("#avatar-edit-modal", (cardData) => {
  editAvatarPopup.renderLoading(true, "Saving...");
  api
    .updateAvatar(cardData)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
});

const selector = { popupSelector: selectors.previewPopup };
const cardPreviewPopup = new PopupWithImage(selector);
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

api
  .getUserInfo()
  .then((userData) => {
    console.log(userData);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

const confirmDeleteModal = new PopupWithConfirmation(
  "#confirm-delete-modal",
  () => {}
);

const renderCard = (card) => {
  const cardEl = new Card(
    {
      data: card,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
      handleDeleteCardClick,
      handleCardLikeClick,
    },
    selectors.cardTemplate
  );

  return cardEl.getView();
};

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardEl = renderCard(item);
      cardSection.addItem(cardEl);
    },
  },
  selectors.cardSection
);

const editPopup = new PopupWithForm("#profile-edit-modal", (obj) => {
  handleProfileEditSubmit(obj);
});

const addPopup = new PopupWithForm("#add-card-modal", (obj) => {
  handlePhotoAddSubmit(obj);
});

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardModal);

const editAvatarValidator = new FormValidator(
  validationSettings,
  avatarEditModal
);

//Initialize all instances
api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

cardPreviewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
confirmDeleteModal.setEventListeners();
editAvatarPopup.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarValidator.enableValidation();

/*--------------------------------------------------*/
/*                      Functions                   */
/*--------------------------------------------------*/

function handleDeleteCardClick(card) {
  confirmDeleteModal.open();
  confirmDeleteModal.setSubmitAction(() => {
    confirmDeleteModal.setLoadingState(true);
    const id = card.getId();
    api
      .removeCard(id)
      .then((res) => {
        card.handleDeleteCard();
        confirmDeleteModal.close();
      })
      .catch((err) => {
        console
          .error(err)
          .finally(() => confirmDeleteModal.setLoadingState(false));
      });
  });
}

function handleCardLikeClick(card) {
  if (card.getIsLiked()) {
    api
      .removeCardLike(card.getId())
      .then((cardData) => card.setLike(cardData.isLiked))
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addCardLike(card.getId())
      .then((cardData) => {
        card.setLike(cardData.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleProfileEditSubmit(obj) {
  editPopup.renderLoading(true, "Saving...");
  api
    .updateProfileInfo(obj)
    .then((res) => {
      const { name, about } = res;
      userInfo.setUserInfo(name, about);
      editPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

function handlePhotoAddSubmit(obj) {
  addPopup.renderLoading(true, "Saving...");
  api
    .addCard(obj)
    .then((cardData) => {
      const cardEl = renderCard(cardData);
      cardSection.addItem(cardEl);
      addPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addPopup.renderLoading(false);
    });
}

function fillProfileForm() {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
}

function openEditProfileModal() {
  fillProfileForm();
  editPopup.open();
}

/*--------------------------------------------------*/
/*                 Event Handlers                   */
/*--------------------------------------------------*/
profileEditButton.addEventListener("click", openEditProfileModal);

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  editAvatarValidator.toggleButtonState();
  editAvatarPopup.open();
});
