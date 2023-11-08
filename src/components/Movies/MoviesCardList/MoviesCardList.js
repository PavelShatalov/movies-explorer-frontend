import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";
import {
  MIN_BIG_SCREEN_SIZE,
  MIN_SMALL_SCREEN_SIZE,
  CARDS_QUANTITY_DESKTOP,
  CARDS_QUANTITY_TABLET,
  CARDS_QUANTITY_MOBILE,
  CARDS_MORE_DESKTOP,
  CARDS_MORE_MOBILE,
} from "../../../utils/constants";

const MoviesCardList = ({
  movies,
  savedMovieList,
  savedMovies,
  deleteMovieToList,
  filtredMovies,
  isLoading,
}) => {
  const { pathname } = useLocation();

  const cards = pathname === "/movies" ? movies : filtredMovies;

  const [paginate, setPaginate] = useState(0);
  const [paginateButton, setPaginateButton] = useState(false);

  useEffect(() => {
    changePaginate();
  }, []);

  useEffect(() => {
    if (cards.length === 0) {
      setPaginateButton(false);
    }
    if (paginate >= cards.length) setPaginateButton(false);
    else return setPaginateButton(true);
  }, [cards, paginate]);

  function changePaginate() {
    if (window.innerWidth >= MIN_BIG_SCREEN_SIZE)
      return setPaginate(CARDS_QUANTITY_DESKTOP);
    else if (
      window.innerWidth < MIN_BIG_SCREEN_SIZE &&
      window.innerWidth <= MIN_SMALL_SCREEN_SIZE
    )
      return setPaginate(CARDS_QUANTITY_TABLET);
    else if (window.innerWidth < MIN_SMALL_SCREEN_SIZE)
      return setPaginate(CARDS_QUANTITY_MOBILE);
  }

  function handlePaginate() {
    if (window.innerWidth >= MIN_BIG_SCREEN_SIZE)
      return setPaginate(paginate + CARDS_MORE_DESKTOP);
    else if (window.innerWidth < MIN_BIG_SCREEN_SIZE)
      return setPaginate(paginate + CARDS_MORE_MOBILE);
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {cards.length === 0 ? (
        <p className="not-found">Ничего не найдено</p>
      ) : (
        <ul className="cards__list">
          {cards.slice(0, paginate).map((card) => (
            <MoviesCard
              card={card}
              filtredMovies={filtredMovies}
              savedMovieList={savedMovieList}
              savedMovies={savedMovies}
              deleteMovieToList={deleteMovieToList}
              key={card.id || card.movieId}
            />
          ))}
        </ul>
      )}
      {paginateButton && (
        <button
          className="cards__button links"
          type="button"
          onClick={handlePaginate}
        >
          Еще
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
