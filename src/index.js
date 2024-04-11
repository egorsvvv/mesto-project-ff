import logo from "./images/logo.svg";
import black from "./vendor/fonts/inter-Black.woff2";
import medium from "./vendor/fonts/inter-Medium.woff2";
import regular from "./vendor/fonts/inter-Regular.woff2";
import "./pages/index.css";
import {
  validationConfig,
  hideInputError,
  saveButtonProfile,
  saveButton,
  disabledButtonNewPlaces,
  setEventListeners,
} from "./components/validation";
import { createCard, deleteHandler, likeCard } from "./components/card";
import { closePopup, openPopup, closeOverlay } from "./components/modal";
import { initialCards } from "./components/cards";
import { config, userData, cards, addNewCard, newProfileInfo, updateAvatar} from "./components/api";

// Код с 5 ПР
const cardPlaces = document.querySelector(".places__list");

function addCard(link, name, likesCount, cardsData, userDataId, cardId) {
  const newCard = createCard(
    link,
    name,
    deleteHandler,
    likeCard,
    openImageCard,
    likesCount,
    cardsData, 
    userDataId,
    cardId
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
  clearValidation(editProfile, validationConfig);
  saveButtonProfile(saveButton);
});

popupCloseEditProfile.addEventListener("click", function () {
  closePopup(editProfile);
});

buttonEditCard.addEventListener("click", function () {
  openPopup(editCard);
  clearValidation(editCard, validationConfig);
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

 function addPersonalCard(evt) {
  evt.preventDefault();
  disabledButton.textContent = 'Сохранение...';
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const cardLinkInput = document.querySelector(".popup__input_type_url");
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  addNewCard(cardName, cardLink)
  .then(() => {
     const newCard = createCard(
        cardLink,
        cardName,
        deleteHandler,
        likeCard,
        openImageCard,
     );
     cardPlaces.prepend(newCard);
     closePopup(editCard);
     cardNameInput.value = "";
     cardLinkInput.value = "";
     disabledButtonNewPlaces(disabledButton);
  })
    .catch((error) => {
      console.error('Ошибка при добавлении новой карточки:', error);
    })
    .finally(() => {
      // Возврат исходного текста кнопки после завершения запроса
      disabledButton.textContent = 'Сохранить';
    });
 }

const popUpSaveButton = document.querySelector('form[name="new-place"]');
popUpSaveButton.addEventListener("submit", addPersonalCard);
const disabledButton = editCard.querySelector(".popup__button");

// ПР7

//Оформление ошибок валидации

const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(inputElement);
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);

// Работа с API

// Функция обработки карточек с сервера


Promise.all([cards(), userData()]).then(([cardsData, userDataId]) => {
  console.log(cardsData, userDataId);
  cards().then((cardsData) => {
    cardsData.forEach((card) => {
      addCard(card.link, card.name, card.likes.length, card.owner._id, userDataId._id, card._id);
    });
  });
  userData().then((userDataId) => {
    // Обновляем элементы шапки страницы согласно полученным данным о пользователе
    const nameProfile = document.querySelector(".profile__title");
    const aboutProfile = document.querySelector(".profile__description");
    const avatarProfile = document.querySelector(".profile__image");

    nameProfile.textContent = userDataId.name;
    aboutProfile.textContent = userDataId.about;
    avatarProfile.style.backgroundImage = `url(\\${userData.avatar})`;
  });
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
  avatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // Находим кнопку сохранения и сохраняем ее исходный текст
    const saveButton = avatarForm.querySelector('.popup__button');
    const originalButtonText = saveButton.textContent;
    // Заменяем текст на кнопке на "Сохранение..."
    saveButton.textContent = 'Сохранение...';
    const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url');
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