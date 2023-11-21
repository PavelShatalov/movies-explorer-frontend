import "./SavedMovies.css";
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
function SavedMovies({movies}) {

  return (
    <main className="">
      <SearchForm isSaved={true} />
      <MoviesCardList cards = {movies}/>
    </main>
  );
};

export default SavedMovies;