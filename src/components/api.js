const config = {
  url: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "d1a3a2d7-de45-445f-b05d-74a348199aea",
    "Content-type": "application/json",
  },
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// Получаем информацию о пользователе, появляются name, avatar, about, _id, cohort
export const getUserApi = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  }).then(getResponse);
};

// Получаем инормацию о карточках с сервера, появляются likes, _id, name, link, owner, createdAt
export const getCardInfoApi = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  }).then(getResponse);
};

// Изменить профиль
export const editProfileApi = (name, about) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(getResponse);
};

//Добавление карточки на сервер
export const addCardApi = (name, link) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(getResponse);
};

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
};

//Постановка лайка
export const addLike = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponse);
};

// Удаление лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
};

//Обновить аватар
export const updateAvatar = (avatar) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(getResponse);
};
