import logo from "./images/logo.svg";
import black from "./vendor/fonts/inter-Black.woff2";
import medium from "./vendor/fonts/inter-Medium.woff2";
import regular from "./vendor/fonts/inter-Regular.woff2";
import "./pages/index.css";
import {
  createCard,
  deleteHandler,
  likeCard,
} from "./components/card";
import { closePopup, openPopup, closeOverlay } from "./components/modal";
import { initialCards } from "./components/cards";

// Код с 5 ПР
const cardPlaces = document.querySelector(".places__list");

function addCard(link, name) {
  const newCard = createCard(link, name, deleteHandler, likeCard, openImageCard);
  cardPlaces.append(newCard);
}

function renderInitialCards() {
  initialCards.forEach((card) => addCard(card.link, card.name));
}

renderInitialCards();

// КОД 6 ПР
// добавили в DOM нужные элементы popups: кнопку открытия, закрытия и само окно

// функция открытия попапа карточки
function openImageCard(reference, description) {
  //открытие картинок попапом добавление в DOM
  const openImage = document.querySelector(".popup_type_image");
  const buttonOpenImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  buttonOpenImage.src = reference;
  popupCaption.textContent = description;
  openPopup(openImage);
}

const editProfile = document.querySelector(".popup_type_edit");
const popupCloseEditProfile = editProfile.querySelector(".popup__close");
const buttonEditProfile = document.querySelector(".profile__edit-button");

const editCard = document.querySelector(".popup_type_new-card");
const buttonEditCard = document.querySelector(".profile__add-button");
const popupCloseEditCard = editCard.querySelector(".popup__close");

const openImage = document.querySelector(".popup_type_image");
const popupCloseOpenImage = openImage.querySelector(".popup__close");

// закрытие попапов при клике на оверлей

document.addEventListener("click", closeOverlay);

// открытие и закрытие попапов редактирования профиля и добавления карточек

popupCloseOpenImage.addEventListener("click", function () {
  closePopup(openImage);
});

buttonEditProfile.addEventListener("click", function () {
  openPopup(editProfile);
  saveInfoProfile();
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

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editProfile);
}

formElementProfile.addEventListener("submit", handleFormSubmitProfile);

// функция добавления новой карточки

function addPersonalCard(evt) {
  evt.preventDefault();
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const cardLinkInput = document.querySelector(".popup__input_type_url");
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const newCard = createCard(cardLink, cardName, deleteHandler, likeCard, openImageCard);
  cardPlaces.prepend(newCard);
  closePopup(editCard);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

const popUpSaveButton = document.querySelector('form[name="new-place"]');
popUpSaveButton.addEventListener("submit", addPersonalCard);

