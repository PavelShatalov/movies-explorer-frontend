import "./SearchForm.css";
// import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
function SearchForm({ onSearch, shortFilm, setShortFilm, searchValue, error, isError}) {

  const [query, setQuery] = useState(searchValue || "");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };


  const handleCheckboxChange = () => {
    setShortFilm(!shortFilm);
    onSearch(query, !shortFilm);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, shortFilm);
  };
  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit}>
        <div className="searchform__container">
          <input className="searchform__input" placeholder="Фильм"  value={query} onChange={handleInputChange}></input>
          <button className="searchform__button" type="submit"></button>
        </div>
        <p className={`searchform__error ${isError && "searchform__error_active"}`}>{error}</p>
        <div className="searchform__container_checkbox">
          <label className="searchform__switch">
            <input className="searchform__checkbox" type="checkbox" checked={shortFilm} onChange={handleCheckboxChange} placeholder="короткометражки"></input>
            <p className="searchform__text">Короткометражки</p>
          </label>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;