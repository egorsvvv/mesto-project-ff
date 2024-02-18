// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardPlaces = document.querySelector(".places__list");

function createCard(link, name) {
  const cloneCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cloneCard.querySelector(".card__delete-button");
  cloneCard.querySelector(".card__image").src = link;
  cloneCard.querySelector(".card__title").textContent = name;
  deleteButton.addEventListener("click", deleteCard);
  return cloneCard;
}

function addCard(link, name) {
  const newCard = createCard(link, name);
  cardPlaces.append(newCard);
}

function deleteCard(close) {
  const cardToRemove = close.target.closest(".places__item");
  cardToRemove.remove();
}

function renderInitialCards() {
  initialCards.forEach((card) => addCard(card.link, card.name));
}

renderInitialCards();
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
