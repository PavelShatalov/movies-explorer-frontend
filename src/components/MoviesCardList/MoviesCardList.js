import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCardList/MoviesCard.js';

function MoviesCardList({ cards }) {
  const [visibleCards, setVisibleCards] = useState(12); // Начальное количество отображаемых карточек

  const loadMoreCards = () => {
    // Увеличиваем количество отображаемых карточек
    setVisibleCards(visibleCards + 3); // Измените это значение по вашему усмотрению
  };

  return (
    <div className='movies__container'>
      <ul className="movies">
        {cards.slice(0, visibleCards).map((card) => (
          <MoviesCard card={card} key={card.id}/>
        ))}
      </ul>
      {visibleCards < cards.length ? (
        <button onClick={loadMoreCards} className="movies__load-more-button">
          Показать еще
        </button>
      ) : (
        <p className='movies__text'>Карточки закончились</p>
      )}
    </div>
  );
}

export default MoviesCardList;
