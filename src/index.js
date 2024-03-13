import avatar from './images/avatar.jpg';
import addIcon from './images/add-icon.svg';
import card1 from './images/card_1.jpg';
import card2 from './images/card_2.jpg';
import card3 from './images/card_3.jpg';
import close from './images/close.svg';
import deleteIcon from './images/delete-icon.svg';
import editIcon from './images/edit-icon.svg';
import likeActive from './images/like-active.svg';
import likeInactive from './images/like-inactive.svg';
import logo from './images/logo.svg';
import black from './vendor/fonts/inter-Black.woff2';
import medium from './vendor/fonts/inter-Medium.woff2';
import regular from './vendor/fonts/inter-Regular.woff2';
import './pages/index.css';

const imagesFonts = [
  { name: 'avatar', link: avatar },
  { name: 'addIcon', link: addIcon },
  { name: 'card1', link: card1 },
  { name: 'card2', link: card2 },
  { name: 'card3', link: card3 },
  { name: 'close', link: close },
  { name: 'deleteIcon', link: deleteIcon },
  { name: 'editIcon', link: editIcon },
  { name: 'likeActive', link: likeActive },
  { name: 'likeInactive', link: likeInactive },
  { name: 'logo', link: logo },
  { name: 'black', link: black },
  { name: 'medium', link: medium },
  { name: 'regular', link: regular },
];

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

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