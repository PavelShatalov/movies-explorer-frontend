import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect} from "react"
function MoviesCard({ card, savedMovies, likeCard, deleteCard, setIsCardDeleted } ) {
  const { pathname } = useLocation();

 
  const [isLiked, setIsLiked] = useState(false);
 
  React.useEffect(() => {
    const isLiked = savedMovies.some((m) => m.movieId === card.id);
    setIsLiked(isLiked);
  }, [savedMovies, card.id]);
  
   function getTime(duration) {
    if (duration >= 60) {
      return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
    }
    return `${duration}м`;
  };

  function handleLikeMovie(e) {
    e.preventDefault();
    isLiked ? handleDislikeMovie(e) : likeCard(card);
    setIsLiked(!isLiked);
  }
  function handleDislikeMovie(e) {
    let card3 = savedMovies.find((m) => m.movieId === card.id);
    deleteCard(card3);
  }

  function handleDeleteMovie(e) {
    e.preventDefault();
    deleteCard(card);
  }
  
  return (
    <li className="card">
      <div className="card__container">
        <a className="card__link" href={card.trailerLink} target="_blank" rel="noreferrer noopener" >
          <img className="card__img" alt={card.nameRU || card.nameEN} src={
            card.image.url
              ? `${'https://api.nomoreparties.co'}${card.image.url}`
              : card.image
          } />
          <div className="card__info">
            <h2 className="card__title">{card.nameRU || card.nameEN}</h2>
            {pathname === "/movies" ? (
              <button  className={`card__button card__button_like ${isLiked && "card__button_like_active"} `} type="button" onClick={ (e) => handleLikeMovie(e) } />) :
              (<button className="card__button card__button_delete" type="button" onClick= {(e) => handleDeleteMovie(e)} />)}
          </div>
          <p className="card__duration">{getTime(card.duration)}</p>
        </a>
      </div>
    </li >
  );
};

export default MoviesCard;
