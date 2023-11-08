import AuthForm from "../AuthForm/AuthForm";

const Register = ({ handleSignUp, isLoading }) => {
  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      quiestion="Уже зарегистрированы?"
      link="Войти"
      toLink="/signin"
      registr={true}
      onSubmit={handleSignUp}
			isLoading={isLoading}
    />
  );
};

export default Register;
