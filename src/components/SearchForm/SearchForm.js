import "./SearchForm.css";
import { useNavigate, useLocation } from "react-router-dom";

function SearchForm({isSaved}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleCheckbox() {
  }
  return (
    <section className="searchform">
      <form className="searchform__form">
        <div className="searchform__container">
          <input className="searchform__input" placeholder="Фильм" required></input>
          <button className="searchform__button" type="submit"></button>
        </div>
        <div className="searchform__container_checkbox">
          <label className="searchform__switch">
            <input className="searchform__checkbox" type="checkbox"  defaultChecked = {isSaved} onClick={handleCheckbox}></input>
            <p className="searchform__text">Короткометражки</p>
          </label>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;