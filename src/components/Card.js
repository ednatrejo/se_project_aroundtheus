import Api from "./Api";

export default class Card {
  constructor(
    {
      data,
      userID,
      isLiked,
      handleImageClick,
      handleDeleteCardClick,
      handleCardLikeClick,
      handleConfirm,
    },
    cardSelector
  ) {
    this._handleConfirm = handleConfirm;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._id = data._id;
    this._userID = userID;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleCardLikeClick = handleCardLikeClick;
  }

  getId() {
    return this._id;
  }

  getIsLiked() {
    return this._isLiked;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(
      ".card__image"
    ).alt = `Photo of ${this._name}`;

    this._cardCaption = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardCaption.textContent = this._name;
    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleCardLikeClick(this);
    });

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCardClick(this));

    //"#image-popup"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ link: this._link, text: this._name })
      );
  }

  _renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  setLike(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  isLiked() {
    return this._isLiked;
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
