import { Title } from "../components/atoms/Title";
import LoginForm from "../components/LoginForm";
// import useAuthStore from "../hooks/store/auth-store";

function Login() {
  // const isLoggedIn = useAuthStore((state) => state.accessToken);
  return (
    <>
      {/* {isLoggedIn && <p>Du er alleredne logget ind</p>} */}
      {/* {!isLoggedIn && <p>Du er ikke logget ind</p>} */}
      <Title title="Log ind" />
      <LoginForm />
    </>
  );
}

export default Login;
