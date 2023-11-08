import "./Footer.css";
import { Route, Routes } from "react-router-dom";

const Footer = () => {
  const FooterPath = () => (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__copyright">
          &copy;&nbsp;2023
        </p>
        <nav className="footer__links">
          <a
            className="footer__link links"
            href="https://practicum.yandex.ru"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link links"
            href="https://github.com/PavelShatalov"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );

  return (
    <Routes>
      <Route path="/" element={<FooterPath />} />
      <Route path="/movies" element={<FooterPath />} />
      <Route path="/saved-movies" element={<FooterPath />} />
    </Routes>
  );
};

export default Footer;