import "./Portfolio.css";
import arrow from "../../../images/portfolio.svg";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link links"
            href="https://pavelshatalov.github.io/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <img
              className="portfolio__image"
              src={arrow}
              alt="Иконка стрелки"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link links"
            href="https://pavelshatalov.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <img
              className="portfolio__image"
              src={arrow}
              alt="Иконка стрелки"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link links"
            href="https://pavel.student.nomoredomainsrocks.ru"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <img
              className="portfolio__image"
              src={arrow}
              alt="Иконка стрелки"
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
