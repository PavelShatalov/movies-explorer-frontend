import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    // Проверяем, есть ли предыдущая страница в истории браузера

      navigate("/"); // Если предыдущей страницы нет, перейти на лендинг
  };
  return (
    <main>
      <section className="notfound__container">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__subtitle">Страница не найдена</p>
      <p className="notfound__back link" onClick={handleNavigateBack}>
        Назад
      </p>
      </section>
    </main>
    
  );
};

export default NotFound;