import { Title } from "../components/atoms/Title";
import LoginForm from "../components/forms/LoginForm";

// login page, that renders a form for logging

function Login() {
  return (
    <>
      <main className="padding">
        <Title variant="default" title="Log ind" />
        <LoginForm />
      </main>
    </>
  );
}

export default Login;
