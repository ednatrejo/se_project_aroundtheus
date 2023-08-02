const initialCards = [
  {
  name: "Yosemite Valley",
  link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
},
 {
  name: "Lake Louise",
  link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
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
``
/* --------------------------------------------------------------------------------*/
/*                              Elements                                          */
/* --------------------------------------------------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-discription-input");
const profileEditForm = document.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

/* --------------------------------------------------------------------------------*/
/*                              Functions                                         */
/* --------------------------------------------------------------------------------*/


function closePopup() {
  profileEditModal.classList.remove("modal__opened");
}

function getCardElment(cardData) {
    // clone the template element with all its content and store it in a cardElement variable
    const cardElement = cardTemplate.cloneNote(true);
    //access the card title and image and store them in variables
   const cardImageEl = cardElement.querySelector(".card__image");
   const cardTitleEl = cardElement.querySelector(".card__title");
   //set the path to the image to the link field of the object
   // set the image alt text to the name field of the object
   cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
   // set the card title to the name field of the object, too
   cardTitleEl.textContent = cardData.name;
    //return the ready HTML element with the filled-in data
    //return cardElement;
    return cardElement;

}
/* --------------------------------------------------------------------------------*/
/*                              Event Handlers                                     */
/* --------------------------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.vale;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

/* --------------------------------------------------------------------------------*/
/*                              Event Listeners                                   */
/* --------------------------------------------------------------------------------*/


profileEditButton.addEventListener("click", () => {
  profileTitleInput.vale = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal__opened");
})

profileEditCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("sumbit", handleProfileEditSubmit);

initialCards.forEach((cardData)=> {
const cardElement = getCardElement(cardData);
cardListEl.prepend(cardElement);
});