import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="notfound__container">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__subtitle">Страница не найдена</p>
      <p className="notfound__back link" onClick={() => { navigate(-1); }}>
        Назад
      </p>
    </section>
  );
};

export default NotFound;