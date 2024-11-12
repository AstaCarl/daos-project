import { post } from "../utils/api";
import { Input } from "./atoms/Input";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";

type FormProps = {};

export function RegisterForm({}: FormProps) {
    // Define the state variables for the form fields.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  // Define the event handlers for the form fields.
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log("Email changed to:", event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  // Define the event handler for the form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    
//    Make a POST request to the /user endpoint with the form data. The function post is imported from the utils/api module.
    try {
      const response = await post("/user", { name, lastname, email, password });
      console.log("User registered successfully!", response);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="">
      <Input
        onChange={handleNameChange}
        value={name}
        inputName="name"
        id="name"
        inputPlaceholder="Fornavn"
      />
      <Input
        onChange={handleLastnameChange}
        value={lastname}
        inputName="lastname"
        id="lastname"
        inputPlaceholder="Efternavn"
      />
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
  );
}