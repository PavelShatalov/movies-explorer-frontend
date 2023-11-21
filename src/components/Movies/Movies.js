import "./Movies.css";
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies({movies}) {
  console.log(movies);
  return (
    <main className="">
      <SearchForm isSaved={false}/>
      <MoviesCardList cards = {movies}/>
    </main>
  );
};

export default Movies;