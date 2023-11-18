import "./Portfolio.css";
import pointer from "../../images/pointer.svg";


function Portfolio() {
  return (
    <section className="portfolio__container">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link link" href="https://pavelshatalov.github.io/how-to-learn" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Статичный сайт</p>
            <img className="portfolio__image" src={pointer} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link link" href="https://pavelshatalov.github.io/russian-travel/" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img className="portfolio__image" src={pointer} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link link" href="https://pavel.student.nomoredomainsrocks.ru" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img className="portfolio__image" src={pointer} alt="стрелка" />
          </a>
        </li>
      </ul>
    </section>
  )
};
export default Portfolio;    