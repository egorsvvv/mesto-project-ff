// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardPlaces = document.querySelector(".places__list");

function createCard(link, name, deleteHandler) {
  const cloneCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cloneCard.querySelector(".card__delete-button");
  const imageCard = cloneCard.querySelector(".card__image");
  imageCard.src = link;
  imageCard.alt = name;
  cloneCard.querySelector(".card__title").textContent = name;
  deleteButton.addEventListener("click", deleteHandler);
  return cloneCard;
}

function addCard(link, name) {
  const newCard = createCard(link, name, deleteHandler);
  cardPlaces.append(newCard);
}

function deleteHandler(close) {
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
