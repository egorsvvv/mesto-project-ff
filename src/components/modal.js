import { saveInfoProfile } from "../index";
export function openPopup(Popup) {
  Popup.classList.add("popup_is-opened");
  saveInfoProfile();
}

export function closePopup(Popup) {
  Popup.classList.remove("popup_is-opened");
}
