// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardPlaces = document.querySelector('.places__list');

function addCard() {
const cloneCard = cardTemplate.querySelector('.places__item').cloneNode(true);
cloneCard.querySelector('.card__image');
cloneCard.querySelector('.card__title');
const deleteButton = cloneCard.querySelector('.card__delete-button');
deleteButton.addEventListener('click', deleteCard);
cardPlaces.append(cloneCard);
}

function deleteCard(close) {
    const cardToRemove = close.target.closest('.places__item');
    cardToRemove.remove();
}

const objectKey = initialCards;

function add() {
    objectKey.forEach(addCard);
}

add()
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
