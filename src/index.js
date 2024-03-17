import avatar from "./images/avatar.jpg";
import addIcon from "./images/add-icon.svg";
import card1 from "./images/card_1.jpg";
import card2 from "./images/card_2.jpg";
import card3 from "./images/card_3.jpg";
import close from "./images/close.svg";
import deleteIcon from "./images/delete-icon.svg";
import editIcon from "./images/edit-icon.svg";
import likeActive from "./images/like-active.svg";
import likeInactive from "./images/like-inactive.svg";
import logo from "./images/logo.svg";
import black from "./vendor/fonts/inter-Black.woff2";
import medium from "./vendor/fonts/inter-Medium.woff2";
import regular from "./vendor/fonts/inter-Regular.woff2";
import "./pages/index.css";
import {
  initialCards,
  createCard,
  deleteHandler,
  likeCard,
} from "./components/card";
import { closePopup, openPopup } from "./components/modal";

const imagesFonts = [
  { name: "avatar", link: avatar },
  { name: "addIcon", link: addIcon },
  { name: "card1", link: card1 },
  { name: "card2", link: card2 },
  { name: "card3", link: card3 },
  { name: "close", link: close },
  { name: "deleteIcon", link: deleteIcon },
  { name: "editIcon", link: editIcon },
  { name: "likeActive", link: likeActive },
  { name: "likeInactive", link: likeInactive },
  { name: "logo", link: logo },
  { name: "black", link: black },
  { name: "medium", link: medium },
  { name: "regular", link: regular },
];

// Код с 5 ПР
const cardPlaces = document.querySelector(".places__list");

function addCard(link, name) {
  const newCard = createCard(link, name, deleteHandler, likeCard);
  cardPlaces.append(newCard);
}

function renderInitialCards() {
  initialCards.forEach((card) => addCard(card.link, card.name));
}

renderInitialCards();

// КОД 6 ПР
// добавили в DOM нужные элементы popups: кнопку открытия, закрытия и само окно
const editProfile = document.querySelector(".popup_type_edit");
const popupCloseEditProfile = editProfile.querySelector(".popup__close");
const buttonEditProfile = document.querySelector(".profile__edit-button");

const editCard = document.querySelector(".popup_type_new-card");
const buttonEditCard = document.querySelector(".profile__add-button");
const popupCloseEditCard = editCard.querySelector(".popup__close");

// закрытие попапов при нажатии Esc

window.addEventListener("keydown", function (event) {
  const openWindow = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    closePopup(openWindow);
  }
});

// закрытие попапов при клике на оверлей

document.addEventListener("click", function (event) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (event.target === openedPopup) {
    closePopup(openedPopup);
  }
});

// открытие и закрытие попапов редактирования профиля и добавления карточек

buttonEditProfile.addEventListener("click", function () {
  openPopup(editProfile);
});

popupCloseEditProfile.addEventListener("click", function () {
  closePopup(editProfile);
});

buttonEditCard.addEventListener("click", function () {
  openPopup(editCard);
});

popupCloseEditCard.addEventListener("click", function () {
  closePopup(editCard);
});

// редактирование информации профиля

const formElementProfile = editProfile.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

// функция сохранения информацци, которая уже имеется в разметке

export function saveInfoProfile() {
  const initialName = nameProfile.textContent;
  const initialJob = jobProfile.textContent;
  nameInput.value = initialName;
  jobInput.value = initialJob;
}

// функция добавления новых записей

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editProfile);
}

formElementProfile.addEventListener("submit", handleFormSubmit);

// функция добавления новой карточки

function addPersonalCard(evt) {
  evt.preventDefault();
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const cardLinkInput = document.querySelector(".popup__input_type_url");
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const newCard = createCard(cardLink, cardName, deleteHandler, likeCard);
  cardPlaces.prepend(newCard);
  closePopup(editCard);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

const popUpSaveButton = editCard.querySelector(".popup__button");
popUpSaveButton.addEventListener("click", addPersonalCard);

const FormElementCard = editCard.querySelector(".popup__form");
FormElementCard.addEventListener("submit", handleFormSubmit);
