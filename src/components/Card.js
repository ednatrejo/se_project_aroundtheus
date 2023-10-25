export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleCardClick,
    handleTrashClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._cardId = _id;
    this._isLiked = isLiked;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true).content.firstElementChild;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteIcon()
    );
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  setIsLiked(isLiked) {
    // set instance variable
    this._isLiked = isLiked;
    this._renderLikes();
  }

  getLikes() {
    return this._isLiked;
  }

  _renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteIcon() {
    this._element.remove();
    this._element = null;
  }

  _replaceImageData() {
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = `Photo of ${this._name}`;
    this._cardTitleEl.textContent = this._name;
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
}
