import "./Footer.css";
import { Route, Routes, useLocation, Link } from "react-router-dom";

function Footer() {
  function Footers() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <h2 className="footer__title">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h2>
          <div className="footer__info">
            <p className="footer__copyright">&copy;&nbsp;2023</p>
            <nav className="footer__nav">
              <a
                className="footer__link link"
                href="https://practicum.yandex.ru"
                target="_blank"
                rel="noreferrer"
              >Яндекс.Практикум</a>
              <a
                className="footer__link link"
                href="https://github.com/PavelShatalov"
                target="_blank"
                rel="noreferrer"
              >Github</a>
            </nav>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Footers />} />
      <Route path="/movies" element={<Footers />} />
      <Route path="/saved-movies" element={<Footers />} />
    </Routes>
  );

}
export default Footer;
