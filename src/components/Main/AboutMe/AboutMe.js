import "./AboutMe.css";
import aboutMe from "../../../images/aboutMe.jpg";

const AboutMe = () => {
  return (
    <section className="aboutme box" id="about-me">
      <h2 className="aboutme__title title">Студент</h2>
      <div className="aboutme__container">
        <div className="aboutme__box">
          <h3 className="aboutme__name">Pavel</h3>
          <p className="aboutme__subtitle">Фронтенд-разработчик, 22 года</p>
          <p className="aboutme__text">
            Мой родной город Барнаул, я закончил Алтайский Госсударственный Колледж по специальности Организация перевозок.
            Увлекаюсь фронтенд-разработкой, люблю путешествовать и играть в футбол.
            В свободное время читаю книги и смотрю фильмы.
          </p>
          <a
            className="aboutme__github links"
            href="https://github.com/PavelShatalov"
            target="_blank"
          >
            Github
          </a>
        </div>
        <img src={aboutMe} className="aboutme__image" alt="моё Фото" />
      </div>
    </section>
  );
};

export default AboutMe;
