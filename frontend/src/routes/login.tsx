import { Title } from "../components/atoms/Title";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <>
      <main className="padding">
        <Title title="Log ind" />
        <LoginForm />
      </main>
    </>
  );
}

export default Login;
