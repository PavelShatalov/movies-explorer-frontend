
import "./Header.css";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import burger from "../../images/burger.svg";
import close from "../../images/close.svg";
import React, { useState, useEffect, useRef } from 'react';


function Header({ loggedIn }) {
  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const popup = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Добавляем слушатель события изменения размера окна
    window.addEventListener('resize', handleResize);

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив зависимостей означает, что эффект будет запускаться только после монтирования компонента

  function handleBurger() {
    popup.current.classList.toggle("header__popup_opened");
  }
  function handleBurgerClose() {
    popup.current.classList.toggle("header__popup_opened");
  }
  function Headers({ loggedIn }) {

    if (loggedIn && windowWidth > 768) {
      return (
        <header className={`header__container ${pathname === "/" && "header__container_blue"}`}>
          
          <nav className="header__nav-container header__nav-container_logined">
            <Link className="header__logoContainer" to="/">
              <img className="header__logo header__logo_logined link" src={logo} alt="Логотип" />
            </Link>
            <Link to="/movies" className="header__movie link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__movie link">
              Сохранённые фильмы
            </Link>
          </nav>
          <Link to="/profile" className="header__profile header__profile_container link">
            <p>Аккаунт</p>
            <button type="button" className={`header__icon ${pathname === "/" ? "header__icon_blue" : "header__icon_grey"}`}></button>
          </Link>
        </header>
      );
    } else if (loggedIn && windowWidth <= 768) {
      return (
        <>
          <header className={`header__container ${pathname === "/" && "header__container_blue"}`}>
            <Link className="header__logoContainer" to="/">
              <img className="header__logo link" src={logo} alt="Логотип" />
            </Link>
            <img src={burger} onClick={handleBurger} alt="Бургер икона"></img>
          </header>
          <nav className="header__popup " ref={popup}>
            <div className="header__popup-container">
              <img className="header__popup-close" onClick={handleBurgerClose} src={close} alt = "Крестик"></img>
              <div className="header__popup-nav-container">
                <Link className={`header__popup-nav-text link ${pathname === "/" && "underline"}`} to="/" >
                  Главная
                </Link>
                <Link to="/movies" className={`header__popup-nav-text link ${pathname === "/movies" && "underline"}`}>
                  Фильмы
                </Link>
                <Link to="/saved-movies" className={`header__popup-nav-text link ${pathname === "/saved-movies" && "underline"}`}>
                  Сохранённые фильмы
                </Link>
              </div>
              <Link to="/profile" className={`header__popup-nav-profile link `}>
                <p className={`header__popup-nav-profile-text ${pathname === "/profile" && "underline"}`} >Аккаунт</p>
              <button type="button" className={`header__icon header__icon_grey`}></button>
            </Link>
            </div>
          </nav>
        </>

      );

    }
    else {
      return (
        <header className={`header__container ${pathname === "/" && "header__container_blue"}`}>
          <Link className="header__logoContainer" to="/">
            <img className="header__logo link" src={logo} alt="Логотип" />
          </Link>
          <div className="header__nav-container">
            <Link to="/signup" className="header__registration link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__login link">
              Войти
            </Link>
          </div>
        </header>
      );
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Headers loggedIn={loggedIn} />} />
      <Route path="/movies" element={<Headers loggedIn={loggedIn} />} />
      <Route path="/saved-movies" element={<Headers loggedIn={loggedIn} />} />
      <Route path="/profile" element={<Headers loggedIn={loggedIn} />} />
    </Routes>
  );
};

export default Header;
