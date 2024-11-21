import { Title } from "../components/atoms/Title";
import { RegisterForm } from "../components/RegisterForm";

function Register() {
  return (
    <>
      <main className="padding">
        <Title title="Opret profil" />
        <RegisterForm />
      </main>
    </>
  );
}

export default Register;
