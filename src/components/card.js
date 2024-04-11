import { deleteCardApi, setLike, deleteLike } from "./api";

export function createCard(link, name, deleteHandler, likeHandler, openCardHandler, likesCount, ownerId, userId, cardId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cloneCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cloneCard.querySelector(".card__delete-button");
  const imageCard = cloneCard.querySelector(".card__image");
  const likeButton = cloneCard.querySelector(".card__like-button");

  const likesCountElement = cloneCard.querySelector(".quantity__likes");

  imageCard.src = link;
  imageCard.alt = name;
  cloneCard.querySelector(".card__title").textContent = name;
  
  if (ownerId === userId) {
    deleteButton.addEventListener("click", (evt) => deleteHandler(evt, cardId));
  } else {
    deleteButton.remove()
  }


  likeButton.addEventListener("click", (evt) => likeHandler(evt, cardId));

  // поисковик клика и открытие

  imageCard.addEventListener("click", function(){
    openCardHandler(link, name)
  });

  likesCountElement.textContent = likesCount;

  // до сюда

  return cloneCard;
}
//функция удаления карточки
export function deleteHandler(event, cardId) {
  const cardToRemove = event.target.closest(".places__item");
  cardToRemove.remove()
  deleteCardApi(cardId)
    .then(() => {
      deleteCardFromDOM.remove(cardId);
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки:', error);
    });
}

// функция лайка карточки
export function likeCard(event, cardId) {
  const likeButton = event.target.closest(".card__like-button");
  const likesCountElement = likeButton.nextElementSibling; // Находим элемент счетчика лайков
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
     // Если уже лайкнуто, то снимаем лайк
     deleteLike(cardId)
        .then((data) => {
           likeButton.classList.remove("card__like-button_is-active");
           likesCountElement.textContent = data.likes.length; // Обновляем счетчик лайков
        })
        .catch((error) => {
           console.error('Ошибка при снятии лайка:', error);
        });
  } else {
     // Если еще не лайкнуто, то ставим лайк
     setLike(cardId)
        .then((data) => {
           likeButton.classList.add("card__like-button_is-active");
           likesCountElement.textContent = data.likes.length; // Обновляем счетчик лайков
        })
        .catch((error) => {
           console.error('Ошибка при установке лайка:', error);
        });
  }
}

const deleteCardFromDOM = (card) => {
  card.remove()
}