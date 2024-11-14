import { Title } from "../components/atoms/Title";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

function Login() {
  return (
    <>
      <Header />
      <Title title="Login" />
      <LoginForm />
    </>
  );
}

export default Login;
