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

  const [searchResults, setSearchResults] = useState(savedMovies ? savedMovies : []);
  const [shortFilm, setShortFilm] = useState(false); // Стейт для чекбокса "Короткометражки"
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = useState(false);


  function handleSearch (query, shortFilm) {
    setLoading(true);
    if (query === "" && shortFilm === false) {
      setIsError(true);
      setLoading(false)
      return;
    }else if (query === "" && shortFilm === true) {
      setIsError(false);
      const filteredMovies = savedMovies.filter((movie) => {
        const durationMatch = shortFilm ? movie.duration <= 40 : true;
        return durationMatch;
      });
      setSearchResults(filteredMovies);
      setLoading(false);
      return;
    }else {
    setChecked(true);
    const filteredMovies = savedMovies.filter((movie) => {
      const titleMatch = movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase());
      const durationMatch = shortFilm ? movie.duration <= 40 : true;
      return titleMatch && durationMatch;
    });
    setSearchResults(filteredMovies);
    setLoading(false);
  };
}



  function handledeleteCard(card) {
    deleteCard(card).then((res) => {
      setLoading(true);
    const newSavedMovies = searchResults.filter((m) => m._id !== card._id);
    setSearchResults(newSavedMovies);
    localStorage.setItem('savedfilms', JSON.stringify(newSavedMovies));
    
    setLoading(false);
    });
    
  }

  return (
    <main className="">
      {loading ? (
          <Preloder />
        ) : (
          <>
      <SearchForm onSearch={handleSearch}  shortFilm={shortFilm} setShortFilm={setShortFilm} error = {error} isError = {isError}  />
      {checked && searchResults.length === 0 && <p className='movies__text'>Ничего не найдено</p>}
      <MoviesCardList movieList={searchResults} savedMovies = {savedMovies} likeCard = {likeCard} deleteCard = {handledeleteCard}/>
      </>
      )}
    </main>
  );
};

export default SavedMovies;
