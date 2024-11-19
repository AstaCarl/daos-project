import { useFetch } from "../hooks/use-fetch";
import Anchor from "./atoms/Anchor";
import Icon from "./atoms/Icon";
import { Input } from "./atoms/Input";
import Paragraf from "./atoms/Paragraf";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";

type FormProps = {};

export function RegisterForm({}: FormProps) {
  // Define the state variables for the form fields.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [type, setType] = useState('password');
  // const { login } = useAuthStore();

  const handleToggle = () => {
    if (type==='password'){
       setType('text')
    } else {
       setType('password')
    }
 }

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Prepare the register data
      const registerData = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      };
  
      // Call the useFetch function to send the post request
      const response = await useFetch("/user", "POST", {
        "Content-Type": "application/json",
      }, registerData);
  
      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        console.log("register successful:", data);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("register failed:", errorData.message);
        alert("register failed: " + errorData.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during register:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form
      className="flex flex-col gap-6 pt-6 w-full"
      onSubmit={handleSubmit}
      action=""
    >
      <div className="space-y-4">
        <div className="flex w-full gap-5">
          <Input
            type="text"
            onChange={handleNameChange}
            value={name}
            inputName="name"
            id="name"
            inputPlaceholder="Fornavn"
          />
          <Input
            type="text"
            onChange={handleLastnameChange}
            value={lastname}
            inputName="lastname"
            id="lastname"
            inputPlaceholder="Efternavn"
          />
        </div>
        <Input
          type="email"
          onChange={handleEmailChange}
          value={email}
          inputName="email"
          id="email"
          inputPlaceholder="E-mail"
        />
        <Input
          type={type}
          onChange={handlePasswordChange}
          value={password}
          inputName="password"
          id="password"
          inputPlaceholder="Adgangskode"
        />
        <span className="flex justify-around items-center">
          <div onClick={handleToggle} className="absolute cursor-pointer -mt-[80px] right-[27px]">
          <Icon variant="showPassword" />
          </div>
        </span>
      </div>
      <Paragraf variant="body-small" paragrafText="Har du allerede en profil? ">
        <Anchor href="/login" anchorText="Log ind her" variant="default" />
      </Paragraf>
      <PrimaryButton type="submit" buttonText="Opret profil" variant="primary" />
    </form>
  );
}
