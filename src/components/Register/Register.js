import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

import React, { useState, useEffect, useRef } from "react";

function Register({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ name: null, email: null, password: null });
  const [isValidForm, setIsValidForm] = useState(false);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const nameInput = useRef(null);

  useEffect(() => {
    validateForm();
  }, [name, email, password]);

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

    if (!nameInput.current.validity.valid) {
      newErrors.name = nameInput.current.validationMessage;
      isValid = false;
    }

    setErrors(newErrors);
    setIsValidForm(isValid);

    return isValid;
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({ name, password, email });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  return (
    <main className="register">
      <section className="register__container">
        <Link className="register__logoContainer" to="/">
          <img className="register__logo link" src={logo} alt="Логотип дипломного проекта" />
        </Link>

        <form className="register__form" onSubmit={handleRegisterSubmit}>
          <h1 className="register__title">Добро пожаловать!</h1>
          <fieldset className="register__inputs">
            <label className="register__label">
              <p className="register__description">Имя</p>
              <input type="text" name="url" className={`register__input ${errors.name && "register__input_active"}`}
                minLength="2" maxLength="30" required onChange={handleNameChange} value={'' || name} ref={nameInput} placeholder="Имя" />
              <p className={`register__input-error ${errors.name && "register__input-error_active"}`} >{errors.name}</p>
            </label>
            <label className="register__label">
              <p className="register__description">E-mail</p>
              <input type="email" name="card-name" className={`register__input ${errors.email && "register__input_active"}`}
                minLength="2" maxLength="30" required onChange={handleEmailChange} value={'' || email} ref={emailInput} placeholder="E-mail" />
              <p className={`register__input-error ${errors.email && "register__input-error_active"}`}>{errors.email}</p>
            </label>
            <label className="register__label">
              <p className="register__description">Пароль</p>
              <input type="password" name="url" className={`register__input ${errors.password && "register__input_active"}`}
                minLength="2" maxLength="30" required onChange={handlePasswordChange} value={'' || password} ref={passwordInput} placeholder="password" />
              <p className={`register__input-error ${errors.password && "register__input-error_active"}`} >{errors.password}</p>
            </label>
            <button type="submit" className="register__submit-send link" disabled={!isValidForm}>Зарегистрироваться</button>
            <p className="register__message">
              <span className="register__ask">Уже зарегистрированы?</span>
              <Link to="/signin" className="register__link link">Войти</Link>
              {/* <span className="register__link link">Войти</span> */}
            </p>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
export default Register
