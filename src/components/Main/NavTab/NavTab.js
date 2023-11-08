import "./NavTab.css";

const NavTab = () => {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <a className="navtab__link links" href="#about-project">
            О проекте
          </a>
        </li>
        <li className="navtab__item">
          <a className="navtab__link links" href="#techs">
            Технологии
          </a>
        </li>
        <li className="navtab__item">
          <a className="navtab__link links" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
