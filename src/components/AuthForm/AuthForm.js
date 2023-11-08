import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./AuthForm.css";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { useNavigate } from "react-router-dom";

const AuthForm = ({
  title,
  buttonText,
  question,
  toLink,
  link,
  registr,
  loggedIn,
  onSubmit,
  isLoading,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
  };

  useEffect(() => {
    if (loggedIn) resetForm();
  }, [loggedIn, resetForm]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies", { replace: true });
    }
  }, [navigate, loggedIn]);

  return (
    <section className="auth">
      <Logo />
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        {pathname === "/signup" && (
          <>
            <label className="auth__label">Имя</label>
            <input
              className={`auth__input ${isLoading ? "auth__input_disabled" : ""}`}
              type="text"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
              placeholder="Имя"
              required
              minLength="2"
              maxLength="30"
              pattern="^[a-zA-Zа-яёА-ЯЁ -]+$"
            />
            <span
              className={`auth__input-error ${errors.name && "auth__input-error_active"}`}
            >
              {errors.name || ""}
            </span>
          </>
        )}
        <label className="auth__label">E-mail</label>
        <input
          className={`auth__input ${isLoading ? "auth__input_disabled" : ""}`}
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Email"
          required
          pattern="^\S+@\S+\.\S+$"
        />
        <span
          className={`auth__input-error ${errors.email && "auth__input-error_active"}`}
        >
          {errors.email || ""}
        </span>
        <label className="auth__label">Пароль</label>
        <input
          className={`auth__input ${isLoading ? "auth__input_disabled" : ""}`}
          type="password"
          name="password"
          minLength="6"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <span
          className={`auth__input-error ${errors.password && "auth__input-error_active"}`}
        >
          {errors.password || ""}
        </span>
        <button
          className={`auth__submit-button links ${!isValid && "auth__submit-button_disabled"} ${registr ? "" : "auth__submit-button_margin"}`}
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
        <p className="auth__question">
          {question}
          <Link className="auth__link links" to={toLink}>
            {link}
          </Link>
        </p>
      </form>
    </section>
  );
};

export default AuthForm;
