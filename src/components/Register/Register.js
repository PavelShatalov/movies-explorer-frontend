import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Preloder from '../Preloader/Preloader.js';
import React, { useState, useEffect, useRef } from "react";

function Register({ onSubmit, loginError }) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [errors, setErrors] = useState({ name: null, email: null, password: null });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const nameInput = useRef(null);

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

  useEffect(() => {
    setLoading(true);
    validateNameForm();
    setLoading(false);
  }, [name,nameInput]);


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
;
    setIsValidForm(isValid);
  }

  function validateNameForm() {
    let isValid = true;
    let nameError = "";
    if (nameInput.current && !nameInput.current.validity.valid) {
      nameError = nameInput.current.validationMessage;
      isValid = false;
    }
    setNameError(nameError);

    setIsValidForm(isValid);
  }


  // function validateForm() {
  //   let isValid = true;
  //   const newErrors = { email: "", password: "" };

  //   // Use refs to access the input elements
  //   if (!emailInput.current.validity.valid) {
  //     newErrors.email = emailInput.current.validationMessage;
  //     isValid = false;
  //   }

  //   if (!passwordInput.current.validity.valid) {
  //     newErrors.password = passwordInput.current.validationMessage;
  //     isValid = false;
  //   }

  //   if (!nameInput.current.validity.valid) {
  //     newErrors.name = nameInput.current.validationMessage;
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   setIsValidForm(isValid);

  //   return isValid;
  // }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit({ name, password, email });
    setLoading(false);
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
      {loading ? (
        <Preloder />
      ) : (
        <>
          <section className="register__container">
            <Link className="register__logoContainer" to="/">
              <img className="register__logo link" src={logo} alt="Логотип дипломного проекта" />
            </Link>

            <form className="register__form" onSubmit={handleRegisterSubmit}>
              <h1 className="register__title">Добро пожаловать!</h1>
              <fieldset className="register__inputs">
                <label className="register__label">
                  <p className="register__description">Имя</p>
                  <input type="text" name="url" className={`register__input ${nameError && "register__input_active"}`}
                    minLength="2" maxLength="30" required onChange={handleNameChange} value={'' || name} ref={nameInput} placeholder="Имя" />
                  <p className={`register__input-error ${nameError && "register__input-error_active"}`} >{nameError}</p>
                </label>
                <label className="register__label">
                  <p className="register__description">E-mail</p>
                  <input type="email" name="card-name" className={`register__input ${emailError && "register__input_active"}`}
                    minLength="2" maxLength="30" required onChange={handleEmailChange} value={'' || email} ref={emailInput} placeholder="E-mail" />
                  <p className={`register__input-error ${emailError && "register__input-error_active"}`}>{emailError}</p>
                </label>
                <label className="register__label">
                  <p className="register__description">Пароль</p>
                  <input type="password" name="url" className={`register__input ${passwordError && "register__input_active"}`}
                    minLength="2" maxLength="30" required onChange={handlePasswordChange} value={'' || password} ref={passwordInput} placeholder="password" />
                  <p className={`register__input-error ${passwordError && "register__input-error_active"}`} >{passwordError}</p>
                </label>
                <button type="submit" className="register__submit-send link" disabled={!isValidForm}>Зарегистрироваться</button>
                <p className="register__message">
                  <span className="register__ask">Уже зарегистрированы?</span>
                  <Link to="/signin" className="register__link link">Войти</Link>
                </p>
              </fieldset>
            </form>
          </section>
        </>
      )}
    </main>
  )
}
export default Register
