import AuthForm from "../AuthForm/AuthForm";

const Login = ({ handleSignIn, isLoading }) => {
  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      quiestion="Ещё не зарегистрированы?"
      link="Регистрация"
      toLink="/signup"
      registr={false}
      onSubmit={handleSignIn}
			isLoading={isLoading}
    />
  );
};

export default Login;
