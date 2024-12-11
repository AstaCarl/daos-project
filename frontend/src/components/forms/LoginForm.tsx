import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button.tsx";
import { useState } from "react";
import { useFetch } from "../../hooks/use-fetch.ts";
import Anchor from "../atoms/Anchor";
import Paragraf from "../atoms/Paragraf";
import Icon from "../atoms/Icon";
import useAuthStore from "../../hooks/store/auth-store.ts";
import { useNavigate } from "react-router-dom";

export default function LoginForm({}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState("password");
  const [errors, setErrors] = useState<string[]>([]);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

      // Prepare the login data
      const loginData = {
        email: email,
        password: password,
      };

      // Call the useFetch function to send the login request
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData)
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        const user = data.user;
        const token = data.access_token;
        login(user, token);
        navigate("/profile");
      } else if (response.status === 401) {
          setErrors(["Ugyldig email eller adgangskode."]);
      };
  
  };

  return (
    <>
      <form className="flex flex-col gap-6 pt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <Input
            type="email"
            labelText="E-mail"
            onChange={handleEmailChange}
            value={email}
            inputName="email"
            id="email"
            inputPlaceholder="Email"
          />
          <Input
            type={type}
            labelText="Adgangskode"
            onChange={handlePasswordChange}
            value={password}
            inputName="password"
            id="password"
            inputPlaceholder="Password"
            errorMessage={errors[0]}
          />
            <span
              onClick={handleToggle}
              className="cursor-pointer absolute items-center top-[35.5%] right-[30px]"
            >
              <Icon variant="showPassword" />
            </span>
        </div>
        <Paragraf variant="body-small" paragrafText="Har du ikke en bruger? ">
          <Anchor
            href="/register"
            anchorText="Opret bruger"
            variant="default"
          />
        </Paragraf>
        <Button type="submit" buttonText="Log ind" variant="primary" />
      </form>
    </>
  );
}
