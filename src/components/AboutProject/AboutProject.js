import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project__container" id="AboutProject">
      <h2 className="about-project__title">
        О проекте
      </h2>
      <div className="about-project__info">
        <div className="about-project__item">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__item">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__side">
        <div className="about-project__backend">
          <h3 className="about-project__bar about-project__bar_backend">
            1 неделя
          </h3>
          <p className="about-project__description">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <h3 className="about-project__bar about-project__bar_frontend">
            4 недели
          </h3>
          <p className="about-project__description">Front-end</p>
        </div>
      </div>
    </section>
  )
};
export default AboutProject;    