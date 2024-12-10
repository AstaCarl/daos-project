import { Title } from "../components/atoms/Title";
import { RegisterForm } from "../components/forms/RegisterForm";

function Register() {
  return (
    <>
      <main className="padding">
        <Title variant="default" title="Opret profil" />
        <RegisterForm />
      </main>
    </>
  );
}

export default Register;
