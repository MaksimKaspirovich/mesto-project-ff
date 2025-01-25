// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card");

// @todo: DOM узлы

const content = document.querySelector(".content");
const popupNewCard = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const cardsList = content.querySelector(".places__list");
const popupButton = popupNewCard.querySelector(".popup__button");
const cardImage = cardElement.querySelector(".card__image");
const cardTitle = cardElement.querySelector(".card__title");

// @todo: Функция создания карточки
addCardButton.addEventListener("click", () => {
  popupNewCard.classList.add("popup_is-opened");
});

popupButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  const name = popupNewCard.querySelector(".popup__input_type_card-name");
  const link = popupNewCard.querySelector(".popup__input_type_url");
  const card = { name: name.value, link: link.value };
  
  name.value = "";
  link.value = "";
  popupNewCard.classList.remove("popup_is-opened");
  renderCard(createCard(card));
});

function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteCard = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  handleDeleteCard(deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(deleteCard) {
  deleteCard.addEventListener("click", () => {
    const cardDelete = deleteCard.closest(".card");
    cardDelete.remove();
  });
}

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  cardsList.append(cardElement);
}

initialCards.forEach((card) => {
  renderCard(createCard(card));
});
