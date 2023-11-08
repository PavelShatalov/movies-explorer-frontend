import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="error">
      <h2 className="error__status">404</h2>
      <p className="error__text">Страница не найдена</p>
      <button
        className="error__button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </button>
    </section>
  );
};

export default Error;