import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab">
      <nav >
        <ul className="navtab__links">
          <li>
            <a className="navtab__link link" href="#AboutProject">О проекте</a>
          </li>
          <li>
            <a className="navtab__link link" href="#Techs">Технологии</a>
          </li>
          <li>
            <a className="navtab__link link" href="#AboutMe">Студент</a>
          </li>
        </ul>
      </nav>
    </section>
  )
}
export default NavTab