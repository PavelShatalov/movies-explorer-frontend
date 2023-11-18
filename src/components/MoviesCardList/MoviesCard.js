import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import React, { useState } from "react"
function MoviesCard({ card }) {
  const { pathname } = useLocation();

  const [isLiked, setIsLiked] = useState(false);

  function getTime(duration) {
    if (duration >= 60) {
      return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
    }
    return `${duration}м`;
  };

  function handleLikeMovie(e) {
    e.preventDefault();
    console.log('like');
    setIsLiked(!isLiked);
  }
  function handleDeleteMovie(e) {
    e.preventDefault();
    console.log('delete');
  }
  function handleSaveMovie(e) {
    e.preventDefault();
    console.log('save');
  }
  console.log(card.image.url);
  return (
    <li className="card">
      <div className="card__container">
        <a className="card__link" href={card.trailerLink} target="_blank" rel="noreferrer noopener" >
          <img className="card__img" alt="заставка фильма" src={
            card.image.url
              ? `${'https://api.nomoreparties.co'}${card.image.url}`
              : card.image
          } />
          <div className="card__info">
            <h2 className="card__title">{card.nameRU || card.nameEN}</h2>
            {pathname === "/movies" ? (
              <button className={`card__button card__button_like ${isLiked && "card__button_like_active"} `} type="button" onClick={ (e) => handleLikeMovie(e) } />) :
              (<button className="card__button card__button_delete" type="button" onClick= {(e) => handleDeleteMovie(e)} />)}
          </div>
          <p className="card__duration">{getTime(card.duration)}</p>
        </a>
      </div>
    </li >
  );
};

export default MoviesCard;
