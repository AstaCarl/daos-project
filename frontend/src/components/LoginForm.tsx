import { Input } from "./atoms/Input";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";
import { post } from "../utils/api";

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
      <form onSubmit={handleSubmit} action="">
        <Input
          onChange={handleEmailChange}
          value={email}
          inputName="email"
          id="email"
          inputPlaceholder="Email"
        />
        <Input
          onChange={handlePasswordChange}
          value={password}
          inputName="password"
          id="password"
          inputPlaceholder="Password"
        />
        <PrimaryButton type="submit" buttonText="Submit" />
      </form>
    </>
  );
}
