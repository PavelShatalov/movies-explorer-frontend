import "./SearchForm.css";

const SearchForm = ({
  moviesSearch,
  setMoviesSearch,
  isChecked,
  setIsChecked,
  handleSearchMovies,
}) => {
  const handleChange = (e) => {
    setMoviesSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!moviesSearch) return;
    e.preventDefault();
    handleSearchMovies(isChecked);
  };

  const handleCheckbox = () => {
    handleSearchMovies(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="searchform">
        <form className="searchform__form" onSubmit={handleSubmit}>
          <input
            className="searchform__input"
            type="text"
            placeholder="Фильм"
            required
            onChange={handleChange}
            value={moviesSearch}
          />
          <button type="submit" className="searchform__search links">
          </button>
        </form>
        <div className="filter">
          <label htmlFor="checkbox" className="filter__label">
            <input
              type="checkbox"
              id="checkbox"
              className="filter__checkbox-hidden"
              checked={!isChecked}
              onChange={handleCheckbox}
            />
            <span className="filter__checkbox-visible"></span>
            <span className="filter__text">Короткометражки</span>
          </label>
        </div>
        <div className="searchform__line"></div>
      </div>
    </>
  );
};

export default SearchForm;
