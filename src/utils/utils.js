export const handleEscape = (e) => {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
};

export function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

export function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

export function handlePopupClose(e) {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ) {
    closePopup(e.currentTarget);
  }
}
