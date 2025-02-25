import "./pages/index.css";
import {
  createCard,
  handleDeleteCard,
  handleLikeButton,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation, hideInputError } from "./components/validation.js";
import {
  getUserData,
  getCardInfoApi,
  editProfileApi,
  addCardApi,
  updateAvatar,
} from "./components/api.js";

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
const buttonSaveCard = newCard.querySelector(".popup__button");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_url");
const formEditElement = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const buttonSaveProfile = formEditElement.querySelector(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const closeButtons = document.querySelectorAll(".popup__close");
const profileAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formAvatar = document.querySelector(
  '.popup__form[name="avatar-profile"]'
);
const buttonChangeAvatar = popupAvatar.querySelector(".popup__button");
const inputAvatar = popupAvatar.querySelector(".popup__input_type_avatar");

let userId;


// Функция для отображения сохранения данных
function renderLoading(isButton, isLoading) {
  if (isLoading) {
    isButton.textContent = "Сохранение...";
  } else {
    isButton.textContent = "Сохранить";
  }
}

//Конфиг Валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Слушатель клика для вызова попапа изменения аватара
profileAvatar.addEventListener("click", () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

// Функция-бработчик редактирования профиля
function handleChangeAvatar(evt) {
  evt.preventDefault();
  renderLoading(buttonChangeAvatar, true);
  updateAvatar(inputAvatar.value)
    .then((res) => {
      inputAvatar.textContent = profileAvatar.setAttribute(
        "style",
        `background-image: url('${res.avatar}')`
      );
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(buttonChangeAvatar, false);
    });
}

// Подтверждение редактирование профиля
buttonChangeAvatar.addEventListener("click", handleChangeAvatar);

// Отправление карточки на сервер
Promise.all([getUserData(), getCardInfoApi()])
  .then(([userData, cardInfoApi]) => {
    profileAvatar.setAttribute(
      "style",
      `background-image: url('${userData.avatar}')`
    );
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    cardInfoApi.forEach((item) => {userData
      const cardItem = createCard(
        item,
        handleDeleteCard,
        handleLikeButton,
        handleOpenImage,
        userId
      );
      cardsList.append(cardItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Слушатель клика для вызова попапа для создания карточки
profileAddCardButton.addEventListener("click", () => {
  newCard.reset();
  clearValidation(newCard, validationConfig);
  openPopup(popupNewCard);
});

// Функция-обработчик для создания карточки
function handleCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(buttonSaveCard, true);
  addCardApi(inputCardName.value, inputCardLink.value)
    .then((res) => {
      cardsList.prepend(
        createCard(res, handleDeleteCard, handleLikeButton, handleOpenImage, userId)
      );
      newCard.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(buttonSaveCard, false);
    });
}

// Добавление карточки из попапа
newCard.addEventListener("submit", handleCardSubmit);

// Слушатель клика для вызова попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formEditElement, validationConfig);
  openPopup(popupEdit);
});

// Функция-обработчик редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(buttonSaveProfile, true);
  editProfileApi(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileJob.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(buttonSaveProfile, false);
    });
}

// Слушатель клика для сохранения профиля
formEditElement.addEventListener("submit", handleProfileFormSubmit);

// Закрытие попапа по крестику
closeButtons.forEach(function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// Функция-обработчик для открытия картинки
function handleOpenImage(card) {
  openPopup(popupImage);
  bigImage.src = card.link;
  bigImage.alt = card.name;
  captionImage.textContent = card.name;
}

// Проверка валидации
enableValidation(validationConfig);
