const handleResponse = (res) => {
  if(res.ok) {
    return res.json()
  }

  throw new Error("Error")
}

const baseUrl = "https://mesto.nomoreparties.co/v1/wff-cohort-10"

export const config = () => {
    return fetch(baseUrl + '/cards', {
  headers: {
    authorization: '3ae50a4a-2907-464c-b472-5a959677098a'
  }
})
  .then(handleResponse)
} 

export const userData = () => {
  return fetch(baseUrl + '/users/me', {
    method: "GET",
headers: {
  authorization: '3ae50a4a-2907-464c-b472-5a959677098a'
}
})
.then(handleResponse)
}

export const cards = () => {
  return fetch(baseUrl + '/cards ', {
    method: "GET",
headers: {
  authorization: '3ae50a4a-2907-464c-b472-5a959677098a'
}
})
.then(handleResponse)
} 

export const newProfileInfo = (name, about) => {
  return fetch(baseUrl + '/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '3ae50a4a-2907-464c-b472-5a959677098a',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
})
.then(handleResponse)
}

export const addNewCard = (name, link) => {
  return fetch(baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: '3ae50a4a-2907-464c-b472-5a959677098a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      link: link,
      name: name
    })
  })
  .then(handleResponse)
  .then((data) => {
    return { id: data._id }; // Возвращаем объект с ID добавленной карточки
  });
}

export const deleteCardApi = (cardId) => {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '3ae50a4a-2907-464c-b472-5a959677098a'
    }
  })
  .then(handleResponse);
 }

export const setLike = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '3ae50a4a-2907-464c-b472-5a959677098a'
    }
  })
  .then(handleResponse);
}

export const deleteLike = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '3ae50a4a-2907-464c-b472-5a959677098a'
    }
  })
  .then(handleResponse);
}

export function updateAvatar(avatarUrl) {
  return fetch(baseUrl + "/users/me/avatar", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: '3ae50a4a-2907-464c-b472-5a959677098a'
    },
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(handleResponse)
}