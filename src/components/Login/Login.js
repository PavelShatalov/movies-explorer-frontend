import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Preloder from '../Preloader/Preloader.js';

import React, { useState, useEffect, useRef } from "react";

function Login({ onSubmit, loginError }) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  

  useEffect(() => {
    setLoading(true);
    validateEmailForm();
    setLoading(false);
  }, [email, emailInput,]); 

  useEffect(() => {
    setLoading(true);
   validatePasswordForm();
    setLoading(false);
  }, [password,passwordInput]); 

  function validateEmailForm() {
    let isValid = true;
    let emailError = "";
    if (emailInput.current && !emailInput.current.validity.valid) {
      emailError = emailInput.current.validationMessage;
      isValid = false;
    }
    if(!validateEmail(email)){
      emailError = 'Введите корректный email';
      isValid = false;
    }
    setEmailError(emailError);
    
    setIsValidForm(isValid);
  }
  function validatePasswordForm() {
    let isValid = true;
    let passwordError = "";
    if (passwordInput.current && !passwordInput.current.validity.valid) {
      passwordError = passwordInput.current.validationMessage;
      isValid = false;
    }
    setPasswordError(passwordError);
   
    setIsValidForm(isValid);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit({ password, email });
    setLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="login">
      {loading ? (
        <Preloder />
      ) : (
        <>
          <section className="login__container">
            <Link className="login__logoContainer" to="/">
              <img className="login__logo link" src={logo} alt="Логотип дипломного проекта" />
            </Link>
            <form className="login__form" onSubmit={handleLoginSubmit}>
              <h1 className="login__title">Рады видеть!</h1>
              <fieldset className="login__inputs">
                <label className="login__label">
                  <p className="login__description">E-mail</p>
                  <input type="email" id="sign-in-email-input" name="card-name" className={`login__input ${emailError && "login__input_active"}`}
                    minLength="2" maxLength="30" required onChange={handleEmailChange} value={'' || email} ref={emailInput} placeholder="email" />
                  <p className="login__input-error login__input-error_active">{emailError}</p>
                </label>
                <label className="login__label">
                  <p className="login__description">Пароль</p>
                  <input type="password" id="sign-in-password-input" name="url" className={`login__input ${passwordError && "login__input_active"}`}
                    minLength="2" maxLength="30" required onChange={handlePasswordChange} value={'' || password} ref={passwordInput} placeholder="password" />
                  <p className={`login__input-error ${passwordError && "login__input-error_active"}`} >{passwordError}</p>
                </label>

                <button type="submit" className="login__submit-send link" disabled={!isValidForm}>Войти</button>
                <p className="login__message">
                  <span className="login__ask">Ещё не зарегистрированы?</span>
                  <Link to="/signup" className="login__link link">Регистрация</Link>
                </p>
              </fieldset>
            </form>
          </section>
        </>
      )}
    </main>
  )
}
export default Login
