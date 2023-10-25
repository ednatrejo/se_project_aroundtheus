function handleEscKey(evt) {
  if (evt.key == "Escape") {
    const popupOpenedEl = document.querySelector(".modal_opened");
    closePopup(popupOpenedEl);
  }
}

function handleClickAway(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  // Checklist says Esc listener must be prompted by popup open
  document.addEventListener("keydown", handleEscKey);
  // Click Away makes sense to add upon popup open too
  popup.addEventListener("mousedown", handleClickAway);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  // Remove listeners
  popup.removeEventListener("mousedown", handleClickAway);
  document.removeEventListener("keydown", handleEscKey);
}

export { handleEscKey, handleClickAway, openPopup, closePopup };
