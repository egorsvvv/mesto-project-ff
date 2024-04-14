import logo from "./images/logo.svg";
import black from "./vendor/fonts/Inter-Black.woff2";
import medium from "./vendor/fonts/Inter-Medium.woff2";
import regular from "./vendor/fonts/Inter-Regular.woff2";
import "./pages/index.css";
import {
  hideInputError,
  saveButtonProfile,
  saveButton,
  disabledButtonNewPlaces,
  setEventListeners,
  clearValidation,
  turnValidation,
  enableValidation
} from "./components/validation";
import { createCard, deleteHandler, likeCard } from "./components/card";
import { closePopup, openPopup, closeOverlay } from "./components/modal";
import { initialCards } from "./components/cards";
import { config, userData, cards, addNewCard, newProfileInfo, updateAvatar} from "./components/api";

// Код с 5 ПР
const cardPlaces = document.querySelector(".places__list");

function addCard(link, name, likesCount, cardsData, userDataId, cardId, isLiked) {
  const newCard = createCard(
    link,
    name,
    deleteHandler,
    likeCard,
    openImageCard,
    likesCount,
    cardsData, 
    userDataId,
    cardId,
    isLiked
  );
  
  cardPlaces.append(newCard);
}

//  function renderInitialCards() {
//    initialCards.forEach((card) => addCard(card.link, card.name));
//  }

// renderInitialCards();

// КОД 6 ПР
// добавили в DOM нужные элементы popups: кнопку открытия, закрытия и само окно

// функция открытия попапа карточки
const openImage = document.querySelector(".popup_type_image");
const buttonOpenImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
function openImageCard(reference, description, overview) {
  //открытие картинок попапом добавление в DOM
  buttonOpenImage.src = reference;
  popupCaption.textContent = description;
  buttonOpenImage.alt = overview;
  openPopup(openImage);
}

const editProfile = document.querySelector(".popup_type_edit");
const popupCloseEditProfile = editProfile.querySelector(".popup__close");
const buttonEditProfile = document.querySelector(".profile__edit-button");

const editCard = document.querySelector(".popup_type_new-card");
const buttonEditCard = document.querySelector(".profile__add-button");
const popupCloseEditCard = editCard.querySelector(".popup__close");

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
  clearValidation(editProfile, enableValidation);
  saveButtonProfile(saveButton, enableValidation);
});

popupCloseEditProfile.addEventListener("click", function () {
  closePopup(editProfile);
});

buttonEditCard.addEventListener("click", function () {
  openPopup(editCard);
  clearValidation(editCard, enableValidation);
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

// функция добавления новых записей (так же интегрировали API)

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  saveButton.textContent = 'Сохранение...';
  const newName = nameInput.value;
  const newJob = jobInput.value;
  newProfileInfo(newName, newJob)
    .then(() => {
      nameProfile.textContent = newName;
      jobProfile.textContent = newJob;
      closePopup(editProfile);
    })
    .catch((error) => {
      console.error('Ошибка загрузки информации:', error);
    })
    .finally(() => {
      // Возврат исходного текста кнопки после завершения запроса
      saveButton.textContent = 'Сохранить';
    });
}

formElementProfile.addEventListener("submit", handleFormSubmitProfile);

// функция добавления новой карточки (подключили к API)
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
 function addPersonalCard(evt) {
  evt.preventDefault();
  disabledButton.textContent = 'Сохранение...';
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  addNewCard(cardName, cardLink)
  .then(() => {
    return Promise.all([cards(), userData()]); // Получаем обновленные данные с сервера
  })
  .then(([cardsData, userDataId]) => {
    // Обновляем интерфейс с полученными данными
    updateUI(cardsData, userDataId);
     closePopup(editCard);
     cardNameInput.value = "";
     cardLinkInput.value = "";
     disabledButtonNewPlaces(disabledButton, enableValidation);
  })
    .catch((error) => {
      console.error('Ошибка при добавлении новой карточки:', error);
    })
    .finally(() => {
      // Возврат исходного текста кнопки после завершения запроса
      disabledButton.textContent = 'Сохранить';
    });
 }

 function updateUI(cardsData, userDataId) {
  // Обновляем карточки
  cardPlaces.innerHTML = '';
  cardsData.forEach((card) => {
    const isLiked = card.likes.some((like) => like._id === userDataId._id);
    addCard(card.link, card.name, card.likes.length, card.owner._id, userDataId._id, card._id, isLiked);
  });
}

const popUpSaveButton = document.querySelector('form[name="new-place"]');
popUpSaveButton.addEventListener("submit", addPersonalCard);
const disabledButton = editCard.querySelector(".popup__button");

// ПР7

//Оформление ошибок валидации

turnValidation(enableValidation);

// Работа с API

// Функция обработки карточек с сервера


Promise.all([cards(), userData()]).then(([cardsData, userDataId]) => {
  console.log(cardsData, userDataId);
  cards().then((cardsData) => {
    cardsData.forEach((card) => {
      const isLiked = card.likes.some((like) => like._id === userDataId._id);
      addCard(card.link, card.name, card.likes.length, card.owner._id, userDataId._id, card._id, isLiked);
    });
  });
  userData().then((userDataId) => {
    // Обновляем элементы шапки страницы согласно полученным данным о пользователе
    const nameProfile = document.querySelector(".profile__title");
    const aboutProfile = document.querySelector(".profile__description");
    const avatarProfile = document.querySelector(".profile__image");

    nameProfile.textContent = userDataId.name;
    aboutProfile.textContent = userDataId.about;
    avatarProfile.style.backgroundImage = `url(\\${userDataId.avatar})`;
  });
})
.catch((error) => {
  console.error('Ошибка при выполнении запросов:', error);
});

  const profileImage = document.querySelector(".profile__image");
  const avatarEditPopup = document.querySelector(".popup__type-avatar");
  const popupCloseAvatarEdit = avatarEditPopup.querySelector(".popup__close");

  profileImage.addEventListener("click", function() {
    openPopup(avatarEditPopup);
  });

  popupCloseAvatarEdit.addEventListener("click", function() {
    closePopup(avatarEditPopup);
  });

  const avatarForm = document.querySelector('.popup__type-avatar .popup__form');
  const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url');
  avatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // Находим кнопку сохранения и сохраняем ее исходный текст
    const saveButton = avatarForm.querySelector('.popup__button');
    const originalButtonText = saveButton.textContent;
    // Заменяем текст на кнопке на "Сохранение..."
    saveButton.textContent = 'Сохранение...';
    const avatarUrl = avatarUrlInput.value;
    // Вызываем функцию для обновления аватара
    updateAvatar(avatarUrl)
      .then(() => {
        // Восстанавливаем исходный текст на кнопке
        saveButton.textContent = originalButtonText;
        // Обновляем отображение аватара на странице
        profileImage.style.backgroundImage = `url(${avatarUrl})`;
        closePopup(avatarForm.closest('.popup'));
        avatarUrlInput.value = "";
      })
      .catch((error) => {
        // Восстанавливаем исходный текст на кнопке в случае ошибки
        saveButton.textContent = originalButtonText;
        console.error('Ошибка при обновлении аватара:', error);
      });
  });

  