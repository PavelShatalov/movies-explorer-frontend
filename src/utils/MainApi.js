export const BASE_URL = "https://api.pavel-diplom.nomoredomainsrocks.ru";
const API_URL = "https://api.nomoreparties.co/";

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
   // Возвращаем результат вызова res.json()
}

export const registrace = (name, password,email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      authorization: `Bearer ${localStorage.jwt}}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name,  email:email, password: password })
  }).then(getResponseData)
};

export const authorizace = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.jwt}}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({  email:email, password: password })
  }).then(getResponseData)}


export const getUserInfo= () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.jwt}}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }).then(getResponseData)
};


export const setUserInfo = ({name, email}) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: 'include',
    headers: {
      authorization: `Bearer ${localStorage.jwt}}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, email: email }),
  })
    .then(getResponseData)
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: 'include',
    headers: {
      authorization: `Bearer ${localStorage.jwt}}`,
      'Content-Type': 'application/json'
    },
  })
    .then(getResponseData)
};
export const likeMovie = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: 'include',
    headers: {
      authorization: `Bearer ${localStorage.jwt}}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: data.country,
      duration: data.duration,
      director: data.director,
      year: data.year,
      description: data.description,
      image: `${API_URL}${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `${API_URL}${data.image.formats.thumbnail.url}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then(getResponseData);
};

export const deleteMovie = ({movieId}) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      authorization: `Bearer ${localStorage.jwt}}`,
      'Content-Type': 'application/json'
    },
  })
    .then(getResponseData)
};

export const jwtDelete= () => {
  const url = `${BASE_URL}/signout`;
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
  })
  .then(getResponseData);
}

