import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeButton,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

//Переменная для вставки карточки на страницу
const cardsList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const bigImage = popupImage.querySelector(".popup__image");
const captionImage = popupImage.querySelector(".popup__caption");
const profileAddCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const newCard = document.querySelector(".popup_type_new-card .popup__form");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_url");
const formElement = document.querySelector(".popup_type_edit .popup__form");

const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const closesButton = document.querySelectorAll(".popup__close");

// Слушатель клика для вызова попапа для создания карточки
profileAddCardButton.addEventListener("click", () => openPopup(popupNewCard));

// Функция-обработчик для создания карточки
function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardTitle = inputCardName.value;
  const cardLink = inputCardLink.value;
  const card = { name: cardTitle, link: cardLink };

  cardsList.prepend(
    createCard(card, handleDeleteCard, handleLikeButton, handleOpenImage)
  );
  newCard.reset();
  closePopup(popupNewCard);
}
// Добавление карточки из попапа
newCard.addEventListener("submit", handleCardSubmit);

// Слушатель клика для вызова попапа редактирования профиля
profileEditButton.addEventListener("click", () => openPopup(popupEdit));

// Функция-бработчик редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Слушатель клика для сохранения профиля
formElement.addEventListener("submit", handleFormSubmit);

// Закрытие попапа по крестику
closesButton.forEach(function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  cardsList.append(cardElement);
}

initialCards.forEach((card) => {
  renderCard(
    createCard(card, handleDeleteCard, handleLikeButton, handleOpenImage)
  );
});

// Функция-обработчик для открытия картинки
function handleOpenImage(card) {
  openPopup(popupImage);
  bigImage.src = card.link;
  bigImage.alt = card.name;
  captionImage.textContent = card.name;
}
