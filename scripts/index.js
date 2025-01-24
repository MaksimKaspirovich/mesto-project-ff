
// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');
const cardAlt = cardElement.querySelector('.card__image').alt;
const cardSrc = cardElement.querySelector('.card__image').src;
const cardTitle = cardElement.querySelector('.card__title');
// @todo: DOM узлы

const content = document.querySelector('.content');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const cardsList = content.querySelector('.places__list');
const popupButton = popupNewCard.querySelector('.popup__button');
const deleteCard = cardElement.querySelector('.card__delete-button');


// @todo: Функция создания карточки

initialCards.forEach(item => {
    addCard(item.name, item.link);
})

addCardButton.addEventListener('click', () => { 
    popupNewCard.classList.add('popup_is-opened');
})
function addCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteCard = cardElement.querySelector('.card__delete-button');
    
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    deleteCard.addEventListener('click', () => {
        const cardDelete = deleteCard.closest('.card');
        cardDelete.remove();
    });
    cardsList.append(cardElement);
}

popupButton.addEventListener('click', () => {
    const cardName = popupNewCard.querySelector('.popup__input_type_card-name');
    const cardUrl = popupNewCard.querySelector('.popup__input_type_url');
    addCard(cardName.value, cardUrl.value);
    cardName.value = '';
    cardUrl.value = '';  
    popupNewCard.classList.remove('popup_is-opened');  
});

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

