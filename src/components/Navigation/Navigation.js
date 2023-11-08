import { NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";

const Navigation = ({ loggedIn }) => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const { pathname } = useLocation();

  window.onresize = () => {
    setIsBurgerActive(false);
  };

  return (
    <>
      {!loggedIn ? (
        <div>
          <Link to="/signup" className="header__signup links">
            Регистрация
          </Link>
          <Link to="/signin" className="header__signin links">
            Войти
          </Link>
        </div>
      ) : (
        <>
          <nav
            className={`navigation ${isBurgerActive ? "navigation_active" : ""
              }`}
          >
            <div
              className={`navigation__container ${isBurgerActive ? "navigation__container_active" : ""
                }`}
            >
              <div className="">
              <NavLink to="/" className="navigation__main links">
                Главная
              </NavLink>
              <NavLink to="/movies" className="navigation__movies links">
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className="navigation__saved-movies links"
              >
                Сохранённые фильмы
              </NavLink>
              </div> 
    
              <NavLink
                to="/profile"
                className= "navigation__account links"
              >
                Аккаунт 
                <button className="navigation_button"></button>
              </NavLink>
            </div>
          </nav>
          <button
            className="burger"
            type="button"
            onClick={() => setIsBurgerActive(!isBurgerActive)}
          >
            <span
              className={`burger__line ${isBurgerActive ? "burger__line_active" : ""
                }`}
            />
          </button>
        </>
      )}
    </>
  );
};

export default Navigation;
