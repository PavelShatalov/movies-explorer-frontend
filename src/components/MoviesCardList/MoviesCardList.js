import React, { useState, useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';
import { useLocation } from "react-router-dom";

function MoviesCardList({ movieList, likeCard, deleteCard, savedMovies }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Добавляем слушатель события изменения размера окна
    window.addEventListener('resize', handleResize);

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив зависимостей означает, что эффект будет запускаться только после монтирования компонента

  const [visibleCards, setVisibleCards] = useState(12); // Начальное количество отображаемых карточек

  useEffect(() => {
    let cardsToShow;
  
    if (windowWidth > 1279) {
      cardsToShow = 12;
    } else if (windowWidth > 767 && windowWidth < 1280) {
      cardsToShow = 8;
    }
    else if (windowWidth < 768) {
      cardsToShow = 5;
    }
  
    setVisibleCards(cardsToShow);
  }, [windowWidth]);

  

  let loadMoreCards;

  if (windowWidth > 1279) {
    loadMoreCards = () => {
      // Увеличиваем количество отображаемых карточек
      setVisibleCards(visibleCards + 3);
    };
  }


  if (windowWidth <= 1279) {

    loadMoreCards = () => {
      // Увеличиваем количество отображаемых карточек
      setVisibleCards(visibleCards + 2);
    };
  }


  const { pathname } = useLocation();
  return pathname === "/movies" ?
    (
      <div className='movies__container'>
        <ul className="movies">
          {movieList.slice(0, visibleCards).map((card) => (
            <MoviesCard card={card} savedMovies={savedMovies} likeCard={likeCard} deleteCard={deleteCard} key={card.id} />
          ))}
        </ul>
        {visibleCards < movieList.length ? (
          <button onClick={loadMoreCards} className="movies__load-more-button">
            Показать еще
          </button>
        ) : (
          movieList.length > 0 && <p className='movies__text'>Карточки закончились
          </p> )}
      </div>
    ) :
    (
      <div className='movies__container'>
        <ul className="movies">
          {movieList.map((card) => (
            <MoviesCard card={card} savedMovies={savedMovies} likeCard={likeCard} deleteCard={deleteCard} key={card.id} />
          ))}
        </ul>
      </div>
    )

}

export default MoviesCardList;