import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="notfound__container">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__subtitle">Страница не найдена</p>
      <p className="notfound__back link" onClick={() => { navigate(-1); }}>
        Назад
      </p>
      </section>
    </main>
    
  );
};

export default NotFound;