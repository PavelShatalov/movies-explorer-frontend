const baseUrl = ' https://api.nomoreparties.co/beatfilm-movies';
// const baseUrl = 'http://localhost:3000'

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json(); // Возвращаем результат вызова res.json()
}
export const getMovies = () => {
  return fetch(`${baseUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => getResponseData(res));
};