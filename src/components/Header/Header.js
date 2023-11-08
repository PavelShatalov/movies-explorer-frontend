import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

const Header = ({ loggedIn }) => {
  const { pathname } = useLocation();

  // Определение класса темы на основе пути
  const themeClass = pathname === "/" ? "custom-header-light" : "custom-header-dark";

  return (
    <header className={`custom-header ${themeClass}`}>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </header>
  );
};

const HeaderPath = () => (
  <Routes>
    <Route path="/" element={<Header />} />
    <Route path="/movies" element={<Header />} />
    <Route path="/saved-movies" element={<Header />} />
    <Route path="/profile" element={<Header />} />
  </Routes>
);

export default Header;
