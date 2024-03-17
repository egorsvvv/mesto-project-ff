import { closePopup, openPopup } from "./modal";
// все карточки с 5 работы (card.js)
export const initialCards = [
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
  },
];

export function createCard(link, name, deleteHandler, likeHandler) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cloneCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cloneCard.querySelector(".card__delete-button");
  const imageCard = cloneCard.querySelector(".card__image");
  const likeButton = cloneCard.querySelector(".card__like-button");
  imageCard.src = link;
  imageCard.alt = name;
  cloneCard.querySelector(".card__title").textContent = name;
  deleteButton.addEventListener("click", deleteHandler);

  likeButton.addEventListener("click", likeHandler);

  //открытие картинок попапом добавление в DOM
  const openImage = document.querySelector(".popup_type_image");
  const buttonOpenImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const popupCloseOpenImage = openImage.querySelector(".popup__close");

  // поисковик клика и открытие

  imageCard.addEventListener("click", function () {
    buttonOpenImage.src = link;
    popupCaption.textContent = name;
    openPopup(openImage);
  });

  // закрытие

  popupCloseOpenImage.addEventListener("click", function () {
    closePopup(openImage);
  });

  // до сюда

  return cloneCard;
}
//функция удаления карточки
export function deleteHandler(close) {
  const cardToRemove = close.target.closest(".places__item");
  cardToRemove.remove();
}

// функция лайка карточки
export function likeCard(event) {
  const like = event.target.closest(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}
