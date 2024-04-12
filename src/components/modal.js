export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  window.addEventListener("keydown", closeEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", closeEscape);
}

// закрытие попапов при нажатии Esc

function closeEscape(event) {
  if (event.key === "Escape") {
    const openWindow = document.querySelector(".popup_is-opened");
    closePopup(openWindow);
  }
}

// закрытие попапов при клике на оверлей

export function closeOverlay(event) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (event.target === openedPopup) {
    closePopup(openedPopup);
  }
}