import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { useContext, useEffect, useState } from "react";

const Profile = ({
  signOut,
  handleUserUpdate,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
	const [isDisabled, setIsDisabled] = useState(true);
  const [isSimilarValues, setIsSimilarValues] = useState(true);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSimilarValues) {
      handleUserUpdate({
        name: name,
        email: email,
      });
      resetForm();
    }
    setIsDisabled(true);
  };

  useEffect(() => {
    let name = true;
    let email = true;
    if (values.name) {
      name = values.name === currentUser.name;
    }
    if (values.email) {
      email = values.email === currentUser.email;
    }
    setIsSimilarValues(name && email);
  }, [values.name, values.email]);

  useEffect(() => {
    if (!isLoading) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser, isLoading]);

  useEffect(() => {
    if (values.name) {
      setName(values.name);
    }
    if (values.email) {
      setEmail(values.email);
    }
  }, [values.name, values.email]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
    }
  }, [currentUser, resetForm]);

  const handleEditButton = () => {
    setIsDisabled(!isDisabled);
  };

  const profileSubmitButtonClassName = `profile__submit-button links ${
    isDisabled ? "profile__submit-button_disabled" : ""
  } ${
    !isValid || isLoading || isSimilarValues
      ? "profile__submit-button_inactive"
      : ""
  }`;

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__block">
          <p className="profile__label">Имя</p>
          <input
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            type="text"
            name="name"
            value={`${values.name ? values.name : name}`}
            onChange={handleChange}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
            pattern="^[a-zA-Zа-яёА-ЯЁ -]+$"
          />
        </div>
        <span
          className={`auth__input-error ${
            errors.name && "auth__input-error_active"
          }`}
        >
          {errors.name || ""}
        </span>
        <div className="profile__line"></div>
        <div className="profile__block">
          <p className="profile__label">E-mail</p>
          <input
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            type="email"
            name="email"
            value={`${values.email ? values.email : email}`}
            onChange={handleChange}
            placeholder="Email"
            required
            pattern="^\S+@\S+\.\S+$"
          />
        </div>
        <span
          className={`auth__input-error auth__input-error_email ${
            errors.email && "auth__input-error_active"
          }`}
        >
          {errors.email || ""}
        </span>
        <>
          <button
            className={profileSubmitButtonClassName}
            type="submit"
            disabled={!isValid || isLoading || isSimilarValues ? true : false}
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={handleEditButton}
            className="profile__button profile__button_edit links"
          >
            {isDisabled ? "Редактировать" : "Отменить"}
          </button>
          <button
            type="button"
            onClick={signOut}
            className="profile__button profile__button_signout links"
          >
            Выйти из аккаунта
          </button>
        </>
      </form>
    </section>
  );
};

export default Profile;
