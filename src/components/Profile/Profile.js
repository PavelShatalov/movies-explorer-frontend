import "./Profile.css";
import { Link } from "react-router-dom";
import Preloder from '../Preloader/Preloader.js';
import React, { useState, useEffect, useRef } from "react";

// function Profile({ handleUserUpdate, handleSignOut, currentUser}) {
//   useEffect(() => {
//     setLoading(false);
//   }, []);
//   const [loading, setLoading] = useState(true);
//   const [name, setName] = useState(currentUser.name);
//   const [email, setEmail] = useState(currentUser.email);
//   const [isValidForm, setIsValidForm] = useState(false);

//   const emailInput = useRef(null);
//   const nameInput = useRef(null);

//   function validateEmail(email) {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   }

//   useEffect(() => {
//     setLoading(true);
//     globalValidate();
//     setLoading(false);
//   }, [email, name,]); 

//   useEffect(() => {
//     globalValidate();
//   }, [currentUser]);

//   function globalValidate() {
//     let isValid = true; 
//     if(email === currentUser.email && name === currentUser.name){
//       isValid = false;}
//     else {
//       isValid = validateEmailForm() && validateNameForm();
//     }
//     setIsValidForm(isValid);
//   }
//   function validateEmailForm() {
//     let isValid = true;
//     if (emailInput.current && !emailInput.current.validity.valid) {
//       isValid = false;
//     }
//     if(!validateEmail(email)){
//       isValid = false;
//     }
  
//     return isValid;
//   }

//   function validateNameForm() {
//     let isValid = true;
//     if (nameInput.current && !nameInput.current.validity.valid) {
//       isValid = false;
//     }
  
//    return isValid;
//   }

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     handleUserUpdate({ name, email });
//   };

//   const handlNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   return (
//     <main className="profile">
//       {loading ? (
//         <Preloder />
//       ) : (
//         <>
//           <section className="profile__container">
//             <form className="profile__form" onSubmit={handleLoginSubmit}>
//               <h1 className="profile__title">Привет, {currentUser.name}</h1>
//               <fieldset className="profile__inputs">
//                 <label className="profile__label profile__label_line">
//                   <p className="profile__description">Имя</p>
//                   <input type="text" name="url" className={`profile__input`} ref={nameInput}
//                     minLength="2" maxLength="30" required onChange={handlNameChange} value={'' || name} placeholder="Имя" />
//                 </label>
//                 <label className="profile__label">
//                   <p className="profile__description">E-mail</p>
//                   <input type="email" name="card-name" className={`profile__input`} ref={emailInput}
//                     minLength="2" maxLength="30" required onChange={handleEmailChange} value={'' || email} placeholder="E-mail" />
//                 </label>
//                 <button type="submit" className="profile__submit-send link" disabled = {!isValidForm}>Редактировать</button>
//                 <p className="profile__message">
//                   <Link to="/signin" className="profile__sign-out link" onClick={handleSignOut}>Выйти из аккаунта</Link>
//                 </p>
//               </fieldset>
//             </form>
//           </section>
//         </>
//       )}
//     </main>
//   )
// }
// export default Profile
function Profile({ handleUserUpdate, handleSignOut, currentUser }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isValidForm, setIsValidForm] = useState(false);

  const emailInput = useRef(null);
  const nameInput = useRef(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    globalValidate();
  }, [email, name, currentUser]);

  function globalValidate() {
    let isValid = true;
    if (email === currentUser.email && name === currentUser.name) {
      isValid = false;
    } else {
      isValid = validateEmailForm() && validateNameForm();
    }
    setIsValidForm(isValid);
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validateEmailForm() {
    let isValid = true;
    if (emailInput.current && !emailInput.current.validity.valid) {
      isValid = false;
    }
    if (!validateEmail(email)) {
      isValid = false;
    }

    return isValid;
  }

  function validateNameForm() {
    let isValid = true;
    if (nameInput.current && !nameInput.current.validity.valid) {
      isValid = false;
    }

    return isValid;
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (isValidForm) {
      handleUserUpdate({ name, email });
    }
  };

  const handlNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className="profile">
      {loading ? (
        <Preloder />
      ) : (
        <>
          <section className="profile__container">
            <form className="profile__form" onSubmit={handleLoginSubmit}>
              <h1 className="profile__title">Привет, {currentUser.name}</h1>
              <fieldset className="profile__inputs">
                <label className="profile__label profile__label_line">
                  <p className="profile__description">Имя</p>
                  <input
                    type="text"
                    name="url"
                    className={`profile__input`}
                    ref={nameInput}
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handlNameChange}
                    value={'' || name}
                    placeholder="Имя"
                  />
                </label>
                <label className="profile__label">
                  <p className="profile__description">E-mail</p>
                  <input
                    type="email"
                    name="card-name"
                    className={`profile__input`}
                    ref={emailInput}
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleEmailChange}
                    value={'' || email}
                    placeholder="E-mail"
                  />
                </label>
                <button
                  type="submit"
                  className={`profile__submit-send link ${!isValidForm ? 'profile__submit-send_disabled' : ''}`}
                  disabled={!isValidForm}
                >
                  Редактировать
                </button>
                <p className="profile__message">
                  <Link to="/signin" className="profile__sign-out link" onClick={handleSignOut}>
                    Выйти из аккаунта
                  </Link>
                </p>
              </fieldset>
            </form>
          </section>
        </>
      )}
    </main>
  );
}

export default Profile;