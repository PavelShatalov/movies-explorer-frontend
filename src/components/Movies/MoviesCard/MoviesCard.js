import { useMemo } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { API__URL } from '../../../utils/constants';

const MoviesCard = ({ card, savedMovies, savedMovieList, deleteMovieToList }) => {
  const { pathname } = useLocation();

  const convertTime = (length) => {
    if (length >= 60) {
      return `${Math.floor(length / 60)}ч ${length % 60}м`;
    }
    return `${length}м`;
  };

  const isLiked = useMemo(() => {
    return savedMovies.some((m) => m.movieId === card.id);
  }, [card, savedMovies]);

  function handleLikeMovie() {
    !isLiked ? savedMovieList(card) : deleteMovieToList(card);
  }

  const cardLikeButtonClassName = `card__button ${
    isLiked ? "card__button_like" : "card__button_unlike"
  }`;

  function handleDeleteMovie() {
    return deleteMovieToList(card);
  }

  return (
    <li className="card">
      <a href={card.trailerLink} target="_blank" rel="noreferrer noopener">
        <img
          className="card__image"
          alt={card.nameRU || card.nameEN}
          src={
            card.image.url
              ? `${API__URL}${card.image.url}`
              : card.image
          }
        />
      </a>
      <div className="card__box">
        <div>
          <h2 className="card__title">{card.nameRU || card.nameEN}</h2>
          <p className="card__duration">{convertTime(card.duration)}</p>
        </div>
        {pathname === "/movies" ? (
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeMovie}
          />
        ) : (
          <button
            className="card__button card__button_delete"
            type="button"
            onClick={handleDeleteMovie}
          />
        )}
      </div>
    </li>
  );
};

export default MoviesCard;
