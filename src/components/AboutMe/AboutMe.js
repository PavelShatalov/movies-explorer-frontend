import "./AboutMe.css"
import aboutMe from "../../images/about.jpg";

function AboutMe() {
  return (
    <section className="aboutme__container" id="AboutMe">
      <h2 className="aboutme__title">
        Студент
      </h2>
      <div className="aboutme__info">
        <div className="aboutme__description">
          <div>
            <h3 className="aboutme__name">Павел</h3>
            <p className="aboutme__profession">Фронтенд-разработчик, 22 года</p>
            <p className="aboutme__text">
            Мой родной город Барнаул, я закончил Алтайский Госсударственный Колледж по специальности Организация перевозок.
            Увлекаюсь фронтенд-разработкой, люблю сон и еду.
            В свободное время читаю книги и смотрю фильмы.
            </p>
          </div>
          <a
            className="aboutme__link link"
            href="https://github.com/PavelShatalov"
            target="_blank"
            rel = "noreferrer"
            >Github</a>
        </div>
        <img src={aboutMe} className="aboutme__image" alt="Фото разработчка сайта" />
      </div>
    </section>
    )};
export default AboutMe;    