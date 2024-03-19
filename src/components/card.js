import { openPopup } from "./modal";

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

  // поисковик клика и открытие

  imageCard.addEventListener("click", function(){
    openImageCard(link, name)
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

// функция открытия попапа карточки
export function openImageCard(reference, description) {
   //открытие картинок попапом добавление в DOM
   const openImage = document.querySelector(".popup_type_image");
   const buttonOpenImage = document.querySelector(".popup__image");
   const popupCaption = document.querySelector(".popup__caption");
   buttonOpenImage.src = reference;
   popupCaption.textContent = description;
   openPopup(openImage);
}

