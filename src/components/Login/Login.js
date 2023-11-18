import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

import React, { useState, useEffect, useRef } from "react";

function Login({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isValidForm, setIsValidForm] = useState(false);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  function validateForm() {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Use refs to access the input elements
    if (!emailInput.current.validity.valid) {
      newErrors.email = emailInput.current.validationMessage;
      isValid = false;
    }

    if (!passwordInput.current.validity.valid) {
      newErrors.password = passwordInput.current.validationMessage;
      isValid = false;
    }

    setErrors(newErrors);
    setIsValidForm(isValid);

    return isValid;
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({ password, email });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="login">
      <section className="login__container">
        <Link className="login__logoContainer" to="/">
          <img className="login__logo link" src={logo} alt="Логотип дипломного проекта" />
        </Link>
        <form className="login__form" onSubmit ={handleLoginSubmit}>
          <h2 className="login__title">Рады видеть!</h2>
          <fieldset className="login__inputs">
            <label className="login__label">
              <p className="login__description">E-mail</p>
              <input type="email" id="sign-in-email-input" name="card-name" className={`login__input ${errors.email && "login__input_active"}`}
                minLength="2" maxLength="30" required onChange={handleEmailChange} value={'' || email} ref={emailInput} />
              <p className="login__input-error login__input-error_active">{errors.email}</p>
            </label>
            <label className="login__label">
              <p className="login__description">Пароль</p>
              <input type="password" id="sign-in-password-input" name="url" className={`login__input ${errors.password && "login__input_active"}`}
              minLength="2" maxLength="30" required onChange={handlePasswordChange} value={'' || password} ref={passwordInput} />
              <p className={`login__input-error ${errors.password && "login__input-error_active"}`} >{errors.password}</p>
            </label>
            <button type="submit" className="login__submit-send" disabled={!isValidForm}>Войти</button>
            <p className="login__message">
            <span className="login__ask">Ещё не зарегистрированы?</span>
            <Link to="/sign-up" className="login__link link">Регистрация</Link>
            {/* <span className="login__link link">Регистрация</span> */}
            </p>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
export default Login
