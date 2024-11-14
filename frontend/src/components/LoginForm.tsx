import { Input } from "./atoms/Input";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";
import { post } from "../utils/api";
import Anchor from "./atoms/Anchor";
import Paragraf from "./atoms/Paragraf";

type Props = {};

export default function LoginForm({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log("Email changed to:", event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    console.log("Password changed to:", event.target.value);
  };

  // Define the event handler for the form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    //    Make a POST request to the /user endpoint with the form data. The function post is imported from the utils/api module.
    try {
      const response = await post("/auth/login", { email, password });
      const data = await response.json();
      console.log("User logged in successfully!", response);
      console.log("data-object", data);
    } catch (error) {
      console.error("Error login user:", error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 pt-6"
        onSubmit={handleSubmit}
      >
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
            type="password"
            labelText="Adgangskode"
            onChange={handlePasswordChange}
            value={password}
            inputName="password"
            id="password"
            inputPlaceholder="Password"
          />
        </div>
        <Paragraf variant="body-small" paragrafText="Har du ikke en bruger? ">
          <Anchor
            href="/register"
            anchorText="Opret bruger"
            variant="default"
          />
        </Paragraf>
        <PrimaryButton type="submit" buttonText="Log ind" />
      </form>
    </>
  );
}
