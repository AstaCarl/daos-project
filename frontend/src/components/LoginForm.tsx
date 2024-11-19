import { Input } from "./atoms/Input";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";
import { post } from "../hooks/api";
import Anchor from "./atoms/Anchor";
import Paragraf from "./atoms/Paragraf";
import Icon from "./atoms/Icon";
import useAuthStore from "../hooks/store/auth-store.ts";

type Props = {};

export default function LoginForm({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState("password");
  // const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { login } = useAuthStore();

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

  // Define the event handler for the form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    //    Make a POST request to the /user endpoint with the form data. The function post is imported from the utils/api module.
    try {
      const response = await post("/auth/login", { email, password });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        login();
        console.log("Login function called");
      }
      console.log("Redirect function called");
    } catch (error) {
      console.error("Error login user:", error);
    }
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
          />
          <span className="flex justify-around items-center">
            <div
              onClick={handleToggle}
              className="absolute cursor-pointer -mt-[80px] right-[27px]"
            >
              <Icon variant="showPassword" />
            </div>
          </span>
        </div>
        <Paragraf variant="body-small" paragrafText="Har du ikke en bruger? ">
          <Anchor
            href="/register"
            anchorText="Opret bruger"
            variant="default"
          />
          <Anchor href="/profile" anchorText="profil" variant="default" />
        </Paragraf>
        <PrimaryButton type="submit" buttonText="Log ind" />
      </form>
    </>
  );
}
