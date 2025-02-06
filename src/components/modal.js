//Открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closePopupWithKeyboard);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithKeyboard);
  popup.removeEventListener("click", closePopupWithTouchOverlay);
}

// Закрытие попапа по клавише
function closePopupWithKeyboard(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

// Закрытие попапа по нажатию на фон
function closePopupWithTouchOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
