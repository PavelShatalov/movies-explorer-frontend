import "./SavedMovies.css";
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
import React, { useState, useEffect } from 'react';
import Preloder from '../Preloader/Preloader.js';
function SavedMovies({movieList, likeCard, savedMovies, deleteCard}) {
  useEffect(() => {
    setLoading(false);}
  , []);
  const [loading, setLoading] = useState(true);
  const error = savedMovies.length > 0 ? "Нужно ввести ключевое слово" : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"

  const localStorageFilmsCheckbox = localStorage.getItem('savedfilmsCheckbox') === 'true';
  const localStorageFilmsInputSearch = localStorage.getItem('savedfilmsInputSearch');
  const localStorageFilms = localStorage.getItem('savedfilms');

  const [searchResults, setSearchResults] = useState(localStorageFilms ? JSON.parse(localStorageFilms) : []);
  const [shortFilm, setShortFilm] = useState(localStorageFilmsCheckbox); // Стейт для чекбокса "Короткометражки"
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = useState(localStorageFilms ? true : false);


  function handleSearch (query, shortFilm) {
    setLoading(true);
    if (query === "") {
      setIsError(true);
      setLoading(false)
      return;

    };
    setChecked(true);
    const filteredMovies = savedMovies.filter((movie) => {
      const titleMatch = movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase());
      const durationMatch = shortFilm ? movie.duration <= 40 : true;
      return titleMatch && durationMatch;
    });
    setSearchResults(filteredMovies);
    localStorage.setItem('savedfilmsCheckbox', shortFilm);
    localStorage.setItem('savedfilmsInputSearch', query);
    localStorage.setItem('savedfilms', JSON.stringify(filteredMovies));
    setLoading(false);
  };

  function handledeleteCard(card) {
    setLoading(true);
    const newSavedMovies = searchResults.filter((m) => m._id !== card._id);
    setSearchResults(newSavedMovies);
    localStorage.setItem('savedfilms', JSON.stringify(newSavedMovies));
    deleteCard(card);
    setLoading(false);
  }

  return (
    <main className="">
      {loading ? (
          <Preloder />
        ) : (
          <>
      <SearchForm onSearch={handleSearch} shortFilm={shortFilm} setShortFilm={setShortFilm} searchValue = {localStorageFilmsInputSearch} error = {error} isError = {isError} />
      {checked && searchResults.length === 0 && <p className='movies__text'>Ничего не найдено</p>}
      <MoviesCardList movieList={searchResults} savedMovies = {savedMovies} likeCard = {likeCard} deleteCard = {handledeleteCard}/>
      </>
      )}
    </main>
  );
};

export default SavedMovies;
