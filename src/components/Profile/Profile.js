import "./Profile.css";
import { Link } from "react-router-dom";

import React, { useState } from "react";

function Profile({ handleUserUpdate, handleSignOut, apiname, apiemail  }) {
  const [name, setName] = useState(apiname);
  const [email, setEmail] = useState(apiemail);
 
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleUserUpdate({ name, email });
  };

  const handlNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className="profile">
      <section className="profile__container">
        <form className="profile__form" onSubmit ={handleLoginSubmit}>
          <h2 className="profile__title">Привет, {apiname}</h2>
          <fieldset className="profile__inputs">
            <label className="profile__label profile__label_line">
              <p className="profile__description">Имя</p>
              <input type="text" name="url" className={`profile__input`}
              minLength="2" maxLength="30" required onChange={handlNameChange} value={'' || name} />
            </label>
            <label className="profile__label">
              <p className="profile__description">E-mail</p>
              <input type="email" name="card-name" className={`profile__input`}
                minLength="2" maxLength="30" required onChange={handleEmailChange} value={'' || email} />
            </label>
            <button type="submit" className="profile__submit-send link">Редактировать</button>
            <p className="profile__message">
              <Link to ="/sign-in" className="profile__sign-out link" onClick={handleSignOut}>Выйти из аккаунта</Link>
            </p>
          </fieldset>
        </form>
        
      </section>
    </main>
  )
}
export default Profile
