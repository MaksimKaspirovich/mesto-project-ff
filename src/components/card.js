import {
  deleteCard,
  addLike,
  deleteLike,
} from "../components/api.js";

// Функция создания карточки
export function createCard(
  card,
  handleDeleteCard,
  handleLikeButton,
  handleOpenImage,
  userId
) {
  //Копируем элемент карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  //Переменные для создания карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  //Передаем данные для карточки
  likeCounter.textContent = card.likes.length;

    // Удаление именно нашей карточки
    const deleteCard = cardElement.querySelector(".card__delete-button");
    if (userId === card.owner._id) {
      deleteCard.addEventListener("click", () => {
        handleDeleteCard(cardElement, card._id);
      });
    } else {
      deleteCard.remove();
    }

  //Проверка ставил ли пользователь лайк
  const isLiked = card.likes.some((item) => {
    return item._id === userId;
  });
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Количество лайков
  likeButton.addEventListener("click", (evt) => {
    handleLikeButton(evt, card._id);
  });

  // Передаем данные
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  // Увеличение размера изображения
  cardImage.addEventListener("click", () => handleOpenImage(card));



  // Возвращаем карточку
  return cardElement;
}

//Функция-обработчик удаления карточки
export const handleDeleteCard = (cardElement, cardId) => {
  deleteCard(cardId)
    .then((res) => {
      cardElement.remove();
    })
    .catch((err) => console.log(err));
};

//Функция-обработчик для лайка карточки
export function handleLikeButton(evt, cardId) {
  const card = evt.target.closest(".card");
  const likeCounter = card.querySelector(".card__like-counter");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
}
