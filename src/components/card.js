// Функция создания карточки
export function createCard(
  card,
  handleDeleteCard,
  handleLikeButton,
  handleOpenImage
) {
  //Копируем элемент карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  //Переменные для создания карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteCard = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  //Передаем данные для карточки
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  //Добавляем слушатель клика для удаления карточки
  deleteCard.addEventListener("click", () => handleDeleteCard(cardElement));
  //Добавляем слушатель по клуику для лайка карточки
  likeButton.addEventListener("click", () => handleLikeButton(likeButton));
  cardImage.addEventListener("click", () => handleOpenImage(card));
  // Возвращаем карточку
  return cardElement;
}

//Функция-обработчик удаления карточки
export function handleDeleteCard(cardElement) {
  cardElement.remove();
}

//Функция-обработчик для лайка карточки
export function handleLikeButton(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
